"""Archive the current pulsanalys.se before the rebuild.

Fetches every URL listed in the Yoast sitemaps, stores the raw HTML, and downloads
every file under /wp-content/uploads/ that the pages reference, at original
resolution. Writes a manifest with size and SHA-256 for each file.

Usage: python tools/archive/archive.py [output_dir]
"""

import hashlib
import json
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

BASE = "https://pulsanalys.se"
UA = "PulsAnalys-archive/1.0 (+https://pulsanalys.se)"
LOC = re.compile(r"<loc>([^<]+)</loc>")
UPLOAD = re.compile(r"/wp-content/uploads/[^\s\"'<>,]+?\.(?:jpe?g|png|gif|webp|svg|pdf|docx?|woff2?)(?=[\s\"'<>),?]|$)", re.I)
# WordPress derivatives: -150x150, -scaled, and the -e1234567890 crop suffix.
DERIVATIVE = re.compile(r"(-\d+x\d+|-scaled|-e\d{10,})(?=\.\w+$)")
EXTRA_PAGES = ["/anmalan/?eventid=531", "/anmalan/?eventid=532", "/anmalan/?eventid=534",
               "/anmalan/?eventid=536", "/bokning/?eventid=531"]


def get(url: str, retries: int = 3) -> tuple[int, bytes]:
    url = urllib.parse.quote(url, safe=":/?=&%#")
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    for attempt in range(retries):
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                return r.status, r.read()
        except urllib.error.HTTPError as e:
            return e.code, e.read()
        except (urllib.error.URLError, TimeoutError):
            if attempt == retries - 1:
                return 0, b""
            time.sleep(2 * (attempt + 1))
    return 0, b""


def page_path(url: str) -> str:
    parts = urllib.parse.urlsplit(url)
    path = parts.path.strip("/") or "index"
    if parts.query:
        path += "__" + re.sub(r"[^A-Za-z0-9=]+", "_", parts.query)
    return path + ".html"


def sha256(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def main() -> None:
    out = Path(sys.argv[1] if len(sys.argv) > 1 else "archive")
    (out / "html").mkdir(parents=True, exist_ok=True)
    (out / "uploads").mkdir(parents=True, exist_ok=True)

    _, index = get(f"{BASE}/sitemap_index.xml")
    urls: list[str] = []
    for sitemap in LOC.findall(index.decode("utf-8", "replace")):
        _, body = get(sitemap)
        urls += LOC.findall(body.decode("utf-8", "replace"))
    urls += [BASE + p for p in EXTRA_PAGES]
    urls = sorted(set(urls))

    pages, uploads = [], set()
    for url in urls:
        status, body = get(url)
        target = out / "html" / page_path(url)
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(body)
        pages.append({"url": url, "status": status, "file": str(target.relative_to(out)), "bytes": len(body)})
        for found in UPLOAD.findall(body.decode("utf-8", "replace")):
            found = BASE + urllib.parse.unquote(found)
            uploads.add(found)
            uploads.add(DERIVATIVE.sub("", found))
        time.sleep(0.3)

    files = []
    for url in sorted(uploads):
        rel = urllib.parse.unquote(url.split("/wp-content/uploads/", 1)[1])
        status, body = get(url)
        if status != 200:
            files.append({"url": url, "status": status})
            continue
        target = out / "uploads" / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(body)
        files.append({"url": url, "status": status, "file": str(target.relative_to(out)),
                      "bytes": len(body), "sha256": sha256(body)})
        time.sleep(0.1)

    manifest = {"source": BASE, "fetched": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
                "pages": pages, "uploads": files}
    (out / "manifest.json").write_text(json.dumps(manifest, ensure_ascii=False, indent=2))
    ok_pages = sum(1 for p in pages if p["status"] == 200)
    ok_files = sum(1 for f in files if f["status"] == 200)
    print(f"pages: {ok_pages}/{len(pages)} ok, uploads: {ok_files}/{len(files)} ok")


if __name__ == "__main__":
    main()
