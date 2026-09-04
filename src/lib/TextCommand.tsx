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
async function readInput(): Promise<string> {
  try {
    const selected = await getSelectedText();
    if (selected.trim()) return selected;
  } catch {
    // fall through to clipboard
  }
  const clip = await Clipboard.readText();
  if (clip?.trim()) return clip;
  throw new Error("Select some text (or copy it) and run the command again.");
}

export function TextCommand({ id }: { id: CommandId }) {
  const prefs = getPreferenceValues<CommandPrefs>();
  const instruction = prefs.prompt?.trim() || PROMPTS[id];
  const [original, setOriginal] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const input = await readInput();
        if (cancelled) return;
        setOriginal(input);
        let acc = "";
        for await (const chunk of transform(prefs.provider, instruction, input)) {
          if (cancelled) return;
          acc += chunk;
          setResult(acc);
        }
        setResult(acc.trim());
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

  const markdown = error ? `**Error**\n\n${error}` : result || (loading ? "_Thinking…_" : "");

  return (
    <Detail
      isLoading={loading}
      markdown={markdown}
      actions={
        !loading && result ? (
          <ActionPanel>
            <Action.Paste title="Replace Selection" content={result} />
            <Action.CopyToClipboard title="Copy Result" content={result} shortcut={{ modifiers: ["cmd"], key: "enter" }} />
            <Action.CopyToClipboard title="Copy Original" content={original} shortcut={{ modifiers: ["cmd", "shift"], key: "o" }} />
          </ActionPanel>
        ) : undefined
      }
    />
  );
}
