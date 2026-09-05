# AI Commands · Bring Your Own Key

Run AI on whatever text you have selected, with your own OpenAI or Anthropic key.
Select text anywhere, hit a hotkey, review the result, press Enter to replace.
No Raycast Pro needed.

## Commands

| Command | What it does |
| --- | --- |
| **Search AI Commands** | Browse, run, edit, duplicate, import and delete your commands |
| **Create AI Command** | Write a new command: title, prompt, provider, model, and what to do when done |
| **Fix Spelling and Grammar** | Preset, in root search, ready for a hotkey |
| **Improve Writing** | Preset |
| **Rewrite** | Preset |
| **Clean Text** | Preset |
| **Make Shorter** | Preset |
| **Make Longer** | Preset |
| **Summarize** | Preset |
| **Explain This** | Preset |

Presets can be edited, deleted, or reset from **Search AI Commands**.

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

## Hotkeys and root search

Presets are regular commands: give them a hotkey in Raycast settings.
For a command you created or imported, open **Search AI Commands**, pick it,
and choose **Create Quicklink for Hotkey**. The quicklink shows up in root
search under the command's name and can take a global hotkey too.

## Coming from Raycast AI?

Your old AI Commands can be imported in one go. In Raycast go to
Settings → Extensions → Raycast → **Export Settings & Data**. Then in
**Search AI Commands** press `⌘ I`, pick the `.rayconfig` file and enter the
export password (Raycast's default is `12345678`). Titles, prompts, icons and
provider come across. `{selection}`, `{clipboard}` and `{argument default="…"}`
placeholders keep working.

## When done

Each command chooses what happens after the model replies:

- **Show result, paste on Enter**: streams into a window. New or changed words are shown in bold so you can see what the model did. Enter replaces the selection with the plain text, `⌘ Enter` copies it. `⌘ ⇧ H` hides the highlights; the preference "Highlight what changed" turns them off for good.
- **Paste over selection right away**: no window, the text is replaced as soon as it is ready.
- **Copy to clipboard**: for apps where pasting is awkward.

## Privacy

Your keys are stored by Raycast on your Mac. The selected text is sent only to
the provider you picked for that command. Nothing else leaves your machine.

If Raycast cannot read the selection in an app, the extension falls back to the
clipboard and says so in the result window.
