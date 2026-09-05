import { Icon } from "@raycast/api";

/** Icons offered in the command form. Keys are `Icon` enum members. */
export const ICON_CHOICES = [
  "Wand",
  "Pencil",
  "Check",
  "Eraser",
  "Text",
  "Paragraph",
  "ShortParagraph",
  "BulletPoints",
  "LightBulb",
  "Stars",
  "Bolt",
  "Message",
  "Envelope",
  "Globe",
  "Code",
  "Book",
  "Hashtag",
  "QuoteBlock",
  "Bird",
  "Emoji",
] as const;

export function iconFor(name: string): Icon {
  return (Icon as Record<string, Icon>)[name] ?? Icon.Wand;
}
