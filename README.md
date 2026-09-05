# AI Commands · Bring Your Own Key

Run AI on whatever text you have selected, with your own OpenAI or Anthropic key.
Select text anywhere, hit a hotkey, review the result, press Enter to replace.
No Raycast Pro needed.

## Commands

| Command | What it does |
| --- | --- |
| **Search AI Commands** | Browse, run, edit, duplicate and delete your commands |
| **Create AI Command** | Write a new command: title, prompt, provider, model, and what to do when done |
| **Fix Spelling and Grammar** | Preset, ready for a hotkey |
| **Improve Writing** | Preset, ready for a hotkey |
| **Rewrite** | Preset, ready for a hotkey |
| **Clean Text** | Preset, ready for a hotkey |

Eight presets ship with the extension. Edit them, delete them, or reset them.

## Setup

1. Open the extension preferences (`⌘ ,` on any command).
2. Paste your OpenAI key, your Anthropic key, or both.
3. Set a default model for each provider. Every command can override it.

## Writing a prompt

Put `{selection}` where the selected text should go:

```
Fix spelling and grammar. Reply with the corrected text only.

Text:
{selection}
```

Without `{selection}`, the prompt is sent as instructions and the text follows it.

## Hotkeys

The four preset commands can get a hotkey directly in Raycast settings.
For any other command: open **Search AI Commands**, pick the command, choose
**Create Quicklink for Hotkey**, then assign a hotkey to that quicklink.

## When done

Each command chooses what happens after the model replies:

- **Show result, paste on Enter**: streams into a window. Enter replaces the selection, `⌘ Enter` copies.
- **Paste over selection right away**: no window, the text is replaced as soon as it is ready.
- **Copy to clipboard**: for apps where pasting is awkward.

## Privacy

Your keys are stored by Raycast on your Mac. The selected text is sent only to
the provider you picked for that command. Nothing else leaves your machine.

If Raycast cannot read the selection in an app, the extension falls back to the
clipboard and says so in the result window.
