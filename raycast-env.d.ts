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
  "anthropicModel": string
}

/** Preferences accessible in all the extension's commands */
declare type Preferences = ExtensionPreferences

declare namespace Preferences {
  /** Preferences accessible in the `search-commands` command */
  export type SearchCommands = ExtensionPreferences & {}
  /** Preferences accessible in the `create-command` command */
  export type CreateCommand = ExtensionPreferences & {}
}

declare namespace Arguments {
  /** Arguments passed to the `search-commands` command */
  export type SearchCommands = {}
  /** Arguments passed to the `create-command` command */
  export type CreateCommand = {}
}

