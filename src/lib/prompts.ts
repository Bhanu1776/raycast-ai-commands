// Built-in prompts. Each command can override its prompt from Raycast
// Preferences ("Custom Prompt"), so paste your old Raycast AI Command prompt
// there instead of editing this file.
export type CommandId = "fix-spelling" | "improve-writing" | "rewrite" | "clean-text";

const OUTPUT_RULE =
  "Reply with the resulting text only. No preamble, no explanation, no quotes, no code fences.";

export const PROMPTS: Record<CommandId, string> = {
  "fix-spelling": [
    "Fix spelling, grammar and punctuation in the text.",
    "Keep the original meaning, tone, language, and formatting (line breaks, markdown, lists).",
    "Do not rewrite sentences unless it is needed to fix an error.",
    OUTPUT_RULE,
  ].join(" "),
  "improve-writing": [
    "Improve the writing of the text: make it clearer, more concise and more natural.",
    "Keep the meaning, voice, language, and formatting (line breaks, markdown, lists).",
    OUTPUT_RULE,
  ].join(" "),
  rewrite: [
    "Rewrite the text so it is short, direct and professional.",
    "Use active voice and simple words. Keep the meaning and the language.",
    "Keep formatting (line breaks, markdown, lists) unless it hurts readability.",
    OUTPUT_RULE,
  ].join(" "),
  "clean-text": [
    "Clean the text without changing its content.",
    "Remove copy-paste artifacts: broken mid-sentence line breaks, doubled spaces, stray hyphenation,",
    "tracking junk, and odd invisible characters. Convert smart quotes and dashes to plain ASCII.",
    "Keep intentional paragraph breaks and lists.",
    OUTPUT_RULE,
  ].join(" "),
};
