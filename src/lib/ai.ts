import Anthropic from "@anthropic-ai/sdk";
import OpenAI from "openai";
import { getPreferenceValues } from "@raycast/api";

export type Provider = "openai" | "anthropic";

interface ExtensionPrefs {
  openaiApiKey?: string;
  openaiModel?: string;
  anthropicApiKey?: string;
  anthropicModel?: string;
}

// Streams the model's reply as text chunks. The text goes inside <text> tags
// so instructions hidden in the selection are treated as content, not commands.
export async function* transform(provider: Provider, instruction: string, text: string): AsyncGenerator<string> {
  const prefs = getPreferenceValues<ExtensionPrefs>();
  // Raycast-style template: {selection} in the prompt means "this is the whole
  // user message". Otherwise the prompt is the system prompt and the text is
  // wrapped so instructions inside the selection are treated as content.
  const templated = instruction.includes("{selection}");
  const system = templated ? undefined : instruction;
  const user = templated ? instruction.split("{selection}").join(text) : `<text>\n${text}\n</text>`;

  if (provider === "anthropic") {
    if (!prefs.anthropicApiKey) throw new Error("Set your Anthropic API key in the extension preferences.");
    const client = new Anthropic({ apiKey: prefs.anthropicApiKey });
    const stream = client.messages.stream({
      model: prefs.anthropicModel || "claude-haiku-4-5",
      max_tokens: 16000,
      ...(system ? { system } : {}),
      output_config: { effort: "low" },
      messages: [{ role: "user", content: user }],
    });
    for await (const event of stream) {
      if (event.type === "content_block_delta" && event.delta.type === "text_delta") yield event.delta.text;
    }
    const final = await stream.finalMessage();
    if (final.stop_reason === "refusal") throw new Error("Claude declined this request.");
    return;
  }

  if (!prefs.openaiApiKey) throw new Error("Set your OpenAI API key in the extension preferences.");
  const client = new OpenAI({ apiKey: prefs.openaiApiKey });
  const stream = await client.chat.completions.create({
    model: prefs.openaiModel || "gpt-5.6-luna",
    stream: true,
    messages: [...(system ? [{ role: "system" as const, content: system }] : []), { role: "user" as const, content: user }],
  });
  for await (const chunk of stream) {
    const delta = chunk.choices[0]?.delta?.content;
    if (delta) yield delta;
  }
}
