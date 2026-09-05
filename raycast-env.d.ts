/// <reference types="@raycast/api">

/* 🚧 🚧 🚧
 * This file is auto-generated from the extension's manifest.
 * Do not modify manually. Instead, update the `package.json` file.
 * 🚧 🚧 🚧 */

/* eslint-disable @typescript-eslint/ban-types */

type ExtensionPreferences = {
  /** OpenAI API Key - Used by commands set to OpenAI. Stored locally by Raycast. */
  "openaiApiKey"?: string,
  /** Default OpenAI Model - Used when a command leaves its model empty. */
  "openaiModel": string,
  /** Anthropic API Key - Used by commands set to Claude. Stored locally by Raycast. */
  "anthropicApiKey"?: string,
  /** Default Anthropic Model - Used when a command leaves its model empty. */
  "anthropicModel": string,
  /** Result View - Show new or changed words in bold in the result window. Pasting always uses the plain text. */
  "highlightChanges": boolean
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search-commands` command */
  export type SearchCommands = ExtensionPreferences & {}
  /** Preferences accessible in the `create-command` command */
  export type CreateCommand = ExtensionPreferences & {}
  /** Preferences accessible in the `fix-spelling` command */
  export type FixSpelling = ExtensionPreferences & {}
  /** Preferences accessible in the `improve-writing` command */
  export type ImproveWriting = ExtensionPreferences & {}
  /** Preferences accessible in the `rewrite` command */
  export type Rewrite = ExtensionPreferences & {}
  /** Preferences accessible in the `clean-text` command */
  export type CleanText = ExtensionPreferences & {}
  /** Preferences accessible in the `make-shorter` command */
  export type MakeShorter = ExtensionPreferences & {}
  /** Preferences accessible in the `make-longer` command */
  export type MakeLonger = ExtensionPreferences & {}
  /** Preferences accessible in the `summarize` command */
  export type Summarize = ExtensionPreferences & {}
  /** Preferences accessible in the `explain` command */
  export type Explain = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-commands` command */
  export type SearchCommands = {}
  /** Arguments passed to the `create-command` command */
  export type CreateCommand = {}
  /** Arguments passed to the `fix-spelling` command */
  export type FixSpelling = {}
  /** Arguments passed to the `improve-writing` command */
  export type ImproveWriting = {}
  /** Arguments passed to the `rewrite` command */
  export type Rewrite = {}
  /** Arguments passed to the `clean-text` command */
  export type CleanText = {}
  /** Arguments passed to the `make-shorter` command */
  export type MakeShorter = {}
  /** Arguments passed to the `make-longer` command */
  export type MakeLonger = {}
  /** Arguments passed to the `summarize` command */
  export type Summarize = {}
  /** Arguments passed to the `explain` command */
  export type Explain = {}
}

