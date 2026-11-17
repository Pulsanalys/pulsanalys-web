import type { CollectionEntry } from "astro:content";

export type ContentItem =
  | { kind: "product"; entry: CollectionEntry<"products"> }
  | { kind: "course"; entry: CollectionEntry<"courses"> }
  | { kind: "page"; entry: CollectionEntry<"pages"> };
