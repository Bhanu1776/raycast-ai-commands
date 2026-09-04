// Built-in prompts.
// "rewrite", "improve-writing" and "clean-text" are your original Raycast AI
// Commands, recovered verbatim from 4thmay26-backup.rayconfig (see
// raycast-ai-commands-backup.md). "fix-spelling" was a Raycast built-in whose
// prompt Raycast does not export, so that one is a plain replacement.
//
// A prompt that contains {selection} is sent as the user message with the
// selected text substituted in, exactly like Raycast did. A prompt without it
// is sent as the system prompt and the text follows in <text> tags.
// Each command can override its prompt from Raycast Preferences ("Custom Prompt").
export type CommandId = "fix-spelling" | "improve-writing" | "rewrite" | "clean-text";

export const PROMPTS: Record<CommandId, string> = {
  "fix-spelling": "Fix spelling, grammar and punctuation in the text. Keep the original meaning, tone, language, and formatting (line breaks, markdown, lists). Do not rewrite sentences unless it is needed to fix an error. Reply with the resulting text only. No preamble, no explanation, no quotes, no code fences.",
  "improve-writing": "Act as a spelling corrector, content writer, and text improver/editor. Reply to each message only with the rewritten text\n\nStrictly follow these rules:\n- Correct spelling, grammar, and punctuation errors in the given text\n- Enhance clarity and conciseness without altering the original meaning\n- Divide lengthy sentences into shorter, more readable ones\n- Eliminate unnecessary repetition while preserving important points\n- Prioritize active voice over passive voice for a more engaging tone\n- Opt for simpler, more accessible vocabulary when possible\n- ALWAYS ensure the original meaning and intention of the given text\n- ALWAYS detect and maintain the original language of the text\n- ALWAYS maintain the existing tone of voice and style, e.g. formal, casual, polite, etc.\n- NEVER surround the improved text with quotes or any additional formatting\n- STRICTLY DON\u2019T use em dashes in the sentences nor semicolon.\n- If the text is already well-written and requires no improvement, don't change the given text\n\nText to improve:\n{selection}\n\nImproved text:",
  rewrite: "Act as a spelling corrector, content writer, and text improver/editor. Reply to each message only with the rewritten text\n- Rewrite/Paraphrase the below given text\n- Correct spelling, grammar, and punctuation errors in the given text\n- Enhance clarity and conciseness without altering the original meaning\n- Prioritize active voice over passive voice for a more engaging tone\n- NEVER surround the improved text with quotes or any additional formatting\n- ALWAYS maintain the existing tone of voice and style, e.g. formal, casual, polite, etc.\n\n\nText: {selection}\n\nImproved Text:",
  "clean-text": "Revise the writing of {selection}. Add text where necessary, correct spelling errors, eliminate unnecessary words and phrases, and combine sentences where effective for conciseness. Generate the revised version without quotations or explanations.\nSTRICTLY don't use em dash in your response",
};
