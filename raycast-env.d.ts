/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** OpenAI API Key - Used by commands set to OpenAI. */
  "openaiApiKey"?: string,
  /** OpenAI Model - Model id for OpenAI commands. */
  "openaiModel": string,
  /** Anthropic API Key - Used by commands set to Claude. */
  "anthropicApiKey"?: string,
  /** Anthropic Model - Model id for Claude commands. */
  "anthropicModel": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `fix-spelling` command */
  export type FixSpelling = ExtensionPreferences & {
  /** Provider - undefined */
  "provider": "openai" | "anthropic",
  /** Custom Prompt - Leave empty to use the built-in prompt. */
  "prompt"?: string
}
  /** Preferences accessible in the `improve-writing` command */
  export type ImproveWriting = ExtensionPreferences & {
  /** Provider - undefined */
  "provider": "openai" | "anthropic",
  /** Custom Prompt - Leave empty to use the built-in prompt. */
  "prompt"?: string
}
  /** Preferences accessible in the `rewrite` command */
  export type Rewrite = ExtensionPreferences & {
  /** Provider - undefined */
  "provider": "openai" | "anthropic",
  /** Custom Prompt - Leave empty to use the built-in prompt. */
  "prompt"?: string
}
  /** Preferences accessible in the `clean-text` command */
  export type CleanText = ExtensionPreferences & {
  /** Provider - undefined */
  "provider": "openai" | "anthropic",
  /** Custom Prompt - Leave empty to use the built-in prompt. */
  "prompt"?: string
}
}

declare namespace Arguments {
  /** Arguments passed to the `fix-spelling` command */
  export type FixSpelling = {}
  /** Arguments passed to the `improve-writing` command */
  export type ImproveWriting = {}
  /** Arguments passed to the `rewrite` command */
  export type Rewrite = {}
  /** Arguments passed to the `clean-text` command */
  export type CleanText = {}
}

