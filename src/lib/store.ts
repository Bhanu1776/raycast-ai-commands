import { LocalStorage } from "@raycast/api";
import { randomUUID } from "node:crypto";
import { PRESETS, presetById } from "./presets";
import type { AICommand } from "./types";

const KEY = "ai-commands.v1";

/** All commands, presets first on first run. Presets the user deleted stay deleted. */
export async function loadCommands(): Promise<AICommand[]> {
  const raw = await LocalStorage.getItem<string>(KEY);
  if (!raw) {
    await LocalStorage.setItem(KEY, JSON.stringify(PRESETS));
    return PRESETS;
  }
  return JSON.parse(raw) as AICommand[];
}

async function save(commands: AICommand[]): Promise<void> {
  await LocalStorage.setItem(KEY, JSON.stringify(commands));
}

/** Looks up a command by id. A preset that was deleted still resolves to its built-in version, so hotkeys never break. */
export async function getCommand(id: string): Promise<AICommand | undefined> {
  const all = await loadCommands();
  return all.find((c) => c.id === id) ?? presetById(id);
}

export async function upsertCommand(cmd: AICommand): Promise<void> {
  const all = await loadCommands();
  const i = all.findIndex((c) => c.id === cmd.id);
  if (i === -1) all.unshift(cmd);
  else all[i] = cmd;
  await save(all);
}

export async function deleteCommand(id: string): Promise<void> {
  await save((await loadCommands()).filter((c) => c.id !== id));
}

/** Puts a preset back to how it shipped. */
export async function resetPreset(id: string): Promise<void> {
  const original = presetById(id);
  if (!original) return;
  await upsertCommand({ ...original, updatedAt: Date.now() });
}

export function newCommand(partial: Omit<AICommand, "id" | "createdAt" | "updatedAt">): AICommand {
  const now = Date.now();
  return { ...partial, id: randomUUID(), createdAt: now, updatedAt: now };
}
