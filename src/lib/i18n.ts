export type Lang = "sv" | "en";

export function langOf(locale: string | undefined): Lang {
  return locale === "en" ? "en" : "sv";
}

/** Pages that exist in both languages. Swedish path → English path. */
export const PAGE_PAIRS: Record<string, string> = {
  "/": "/en/",
  "/produkter/": "/en/products/",
  "/personprofil/": "/en/personal-profile/",
  "/teamprofil/": "/en/team-profile/",
  "/rekryteringsprofil/": "/en/recruitment-profile/",
  "/360-profil/": "/en/360-profile/",
  "/konsulttjanster/": "/en/consulting-services/",
  "/kurser/": "/en/courses/",
  "/grundutbildning-disc/": "/en/basic-disc-training/",
  "/fordjupning-disc/": "/en/advanced-disc-training/",
  "/ledarskapsutbildning/": "/en/leadership-training/",
  "/utbildningar-och-forelasningar/": "/en/courses-and-lectures/",
  "/grundutbildning/": "/en/basic-disc-training/dates/",
  "/fordjupningskurser/": "/en/advanced-disc-training/dates/",
  "/webbinarier/": "/en/webinars/",
  "/event/": "/en/events/",
  "/vad-ar-pulsanalys/": "/en/what-is-pulsanalys/",
  "/vad-ar-disc/": "/en/what-is-disc/",
  "/om-oss/": "/en/about-us/",
  "/kontakta-oss/": "/en/contact-us/",
  "/omdomen/": "/en/reviews/",
  "/distributor/": "/en/become-a-distributor/",
  "/konsulter/": "/en/consultants/",
  "/skaffa-abonnemang/": "/en/get-a-subscription/",
  "/faq/": "/en/faq/",
  "/integritetspolicy/": "/en/privacy-policy/",
  "/blogg/": "/en/blog/",
};

const EN_TO_SV = Object.fromEntries(Object.entries(PAGE_PAIRS).map(([sv, en]) => [en, sv]));

/** The same page in the other language, or that language's home page. */
export function counterpart(path: string): { sv: string; en: string } {
  if (path.startsWith("/en/")) return { en: path, sv: EN_TO_SV[path] ?? "/" };
  return { sv: path, en: PAGE_PAIRS[path] ?? "/en/" };
}

/** A path in the given language for a Swedish base path. */
export function href(lang: Lang, svPath: string): string {
  return lang === "en" ? PAGE_PAIRS[svPath] ?? "/en/" : svPath;
}

const MONTHS = {
  sv: ["januari", "februari", "mars", "april", "maj", "juni", "juli", "augusti", "september", "oktober", "november", "december"],
  en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
};

/** "25 november 2026", "26–27 november 2026" or "30 juni – 1 juli 2026". */
export function dateRange(start: Date, end: Date, lang: Lang = "sv"): string {
  const m = MONTHS[lang];
  const [d1, m1, y1] = [start.getUTCDate(), start.getUTCMonth(), start.getUTCFullYear()];
  const [d2, m2, y2] = [end.getUTCDate(), end.getUTCMonth(), end.getUTCFullYear()];
  if (start.getTime() === end.getTime()) return `${d1} ${m[m1]} ${y1}`;
  if (m1 === m2 && y1 === y2) return `${d1}–${d2} ${m[m1]} ${y1}`;
  if (y1 === y2) return `${d1} ${m[m1]} – ${d2} ${m[m2]} ${y1}`;
  return `${d1} ${m[m1]} ${y1} – ${d2} ${m[m2]} ${y2}`;
}

const SHORT = {
  sv: ["jan", "feb", "mars", "apr", "maj", "juni", "juli", "aug", "sep", "okt", "nov", "dec"],
  en: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
};

/** The date split for a date tile: "26–27" over "nov 2026". */
export function dateParts(start: Date, end: Date, lang: Lang = "sv"): { day: string; month: string } {
  const m = SHORT[lang];
  const [d1, m1] = [start.getUTCDate(), start.getUTCMonth()];
  const [d2, m2, y2] = [end.getUTCDate(), end.getUTCMonth(), end.getUTCFullYear()];
  const day = start.getTime() === end.getTime() ? `${d1}` : `${d1}–${d2}`;
  const month = m1 === m2 ? `${m[m1]} ${y2}` : `${m[m1]}–${m[m2]} ${y2}`;
  return { day, month };
}

export const UI = {
  sv: {
    skip: "Hoppa till innehållet",
    home: "PulsAnalys – till startsidan",
    menu: "Meny",
    mainNav: "Huvudmeny",
    login: "Logga in",
    otherLang: { label: "English", lang: "en" },
    nav: [
      ["/produkter/", "Produkter"],
      ["/kurser/", "Kurser"],
      ["/utbildningar-och-forelasningar/", "Anmäl dig"],
      ["/konsulttjanster/", "Konsulttjänster"],
      ["/om-oss/", "Om oss"],
      ["/kontakta-oss/", "Kontakt"],
    ],
    footer: {
      contact: "Kontakt",
      support: "kundsupport",
      site: "Webbplatsen",
      company: "PulsAnalys",
      orgNr: "Org.nr",
      siteLinks: [
        ["/produkter/", "Produkter"],
        ["/kurser/", "Kurser"],
        ["/utbildningar-och-forelasningar/", "Anmäl dig"],
        ["/skaffa-abonnemang/", "Skaffa abonnemang"],
        ["/omdomen/", "Omdömen"],
        ["/distributor/", "Bli distributör"],
      ],
      companyLinks: [
        ["/om-oss/", "Om oss"],
        ["/kontakta-oss/", "Kontakta oss"],
        ["/vad-ar-disc/", "Vad är DISC?"],
        ["/faq/", "Vanliga frågor"],
        ["/blogg/", "Blogg"],
        ["/integritetspolicy/", "Integritetspolicy"],
      ],
    },
    cta: { heading: "Vill du veta mer?", text: "Kontakta oss så berättar vi hur PulsAnalys kan hjälpa er.", phone: "Ring oss", email: "Mejla oss" },
    dates: {
      empty: "Det finns inga inbokade datum just nu. Kontakta oss så berättar vi när nästa tillfälle blir.",
      time: "kl.",
    },
    quoteLang: "",
    page: {
      products: "Produkter", courses: "Kurser", calendar: "Utbildningar och föreläsningar", blog: "Blogg",
      usedFor: "Används till", onPage: "På den här sidan", moreProfiles: "Fler profiler",
      learnTool: "Lär dig verktyget – Grundutbildning DISC", letUs: "Låt oss göra profilerna åt er",
      seeDates: "Se datum och anmäl dig", programme: "Utbildningsprogram", upcoming: "Kommande datum", price: "Pris",
    },
  },
  en: {
    skip: "Skip to content",
    home: "PulsAnalys – home",
    menu: "Menu",
    mainNav: "Main menu",
    login: "Log in",
    otherLang: { label: "Svenska", lang: "sv" },
    nav: [
      ["/produkter/", "Products"],
      ["/kurser/", "Courses"],
      ["/utbildningar-och-forelasningar/", "Book a course"],
      ["/konsulttjanster/", "Consulting"],
      ["/om-oss/", "About us"],
      ["/kontakta-oss/", "Contact"],
    ],
    footer: {
      contact: "Contact",
      support: "customer support",
      site: "Website",
      company: "PulsAnalys",
      orgNr: "Company reg. no.",
      siteLinks: [
        ["/produkter/", "Products"],
        ["/kurser/", "Courses"],
        ["/utbildningar-och-forelasningar/", "Book a course"],
        ["/skaffa-abonnemang/", "Get a subscription"],
        ["/omdomen/", "Reviews"],
        ["/distributor/", "Become a distributor"],
      ],
      companyLinks: [
        ["/om-oss/", "About us"],
        ["/kontakta-oss/", "Contact us"],
        ["/vad-ar-disc/", "What is DISC?"],
        ["/faq/", "FAQ"],
        ["/blogg/", "Blog"],
        ["/integritetspolicy/", "Privacy policy"],
      ],
    },
    cta: { heading: "Want to know more?", text: "Get in touch and we will tell you how PulsAnalys can help your organisation.", phone: "Call us", email: "Email us" },
    dates: {
      empty: "There are no dates booked at the moment. Contact us and we will tell you when the next one is.",
      time: "",
    },
    quoteLang: "Quoted in Swedish",
    page: {
      products: "Products", courses: "Courses", calendar: "Courses and lectures", blog: "Blog",
      usedFor: "Used for", onPage: "On this page", moreProfiles: "More profiles",
      learnTool: "Learn the tool – Basic DISC Training", letUs: "Let us create the profiles for you",
      seeDates: "See dates and book", programme: "Programme", upcoming: "Upcoming dates", price: "Price",
    },
  },
} as const;

export function hasPair(path: string): boolean {
  return path in PAGE_PAIRS || path in EN_TO_SV;
}
