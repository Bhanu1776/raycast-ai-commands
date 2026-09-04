import { Action, ActionPanel, Clipboard, Detail, getPreferenceValues, getSelectedText, showToast, Toast } from "@raycast/api";
import { useEffect, useState } from "react";
import { transform, type Provider } from "./ai";
import { PROMPTS, type CommandId } from "./prompts";

interface CommandPrefs {
  provider: Provider;
  prompt?: string;
}

// Selected text first (like Raycast AI did); clipboard as a fallback so the
// command still works in apps where Raycast cannot read the selection.
async function readInput(): Promise<{ text: string; source: "selection" | "clipboard" }> {
  let why = "empty selection";
  try {
    const selected = await getSelectedText();
    if (selected.trim()) return { text: selected, source: "selection" };
  } catch (e) {
    why = e instanceof Error ? e.message : String(e);
    console.error("getSelectedText failed:", why);
  }
  const clip = await Clipboard.readText();
  if (clip?.trim()) {
    // Loud on purpose: a silent fallback rewrote the wrong text once already.
    await showToast({ style: Toast.Style.Animated, title: "No selection, using clipboard", message: why });
    return { text: clip, source: "clipboard" };
  }
  throw new Error(`Could not read the selection (${why}) and the clipboard is empty.`);
}

// Templated prompts end with "Improved text:"; some models echo that trailer back.
function stripTrailer(s: string): string {
  return s.replace(/\n*\s*Improved text:\s*$/i, "").trim();
}

export function TextCommand({ id }: { id: CommandId }) {
  const prefs = getPreferenceValues<CommandPrefs>();
  const instruction = prefs.prompt?.trim() || PROMPTS[id];
  const [original, setOriginal] = useState("");
  const [source, setSource] = useState<"selection" | "clipboard" | null>(null);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const { text: input, source: from } = await readInput();
        if (cancelled) return;
        setOriginal(input);
        setSource(from);
        let acc = "";
        for await (const chunk of transform(prefs.provider, instruction, input)) {
          if (cancelled) return;
          acc += chunk;
          setResult(acc);
        }
        setResult(stripTrailer(acc));
      } catch (e) {
        const message = e instanceof Error ? e.message : String(e);
        setError(message);
        await showToast({ style: Toast.Style.Failure, title: "AI Text failed", message });
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const banner = source === "clipboard" ? "> ⚠️ No selection found. This is your **clipboard** text.\n\n" : "";
  const markdown = error ? `**Error**\n\n${error}` : banner + (result || (loading ? "_Thinking…_" : ""));

  return (
    <Detail
      isLoading={loading}
      markdown={markdown}
      actions={
        !loading && result ? (
          <ActionPanel>
            <Action.Paste title="Replace Selection" content={result} />
            <Action.CopyToClipboard title="Copy Result" content={result} />
            <Action.CopyToClipboard title="Copy Original" content={original} shortcut={{ modifiers: ["cmd", "shift"], key: "o" }} />
          </ActionPanel>
        ) : undefined
      }
    />
  );
}
