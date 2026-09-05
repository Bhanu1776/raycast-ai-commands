import { createDecipheriv, createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { gunzipSync } from "node:zlib";
import { newCommand } from "./store";
import type { AICommand, Provider } from "./types";

/**
 * Reads AI Commands out of a Raycast "Export Settings & Data" file.
 *
 * Format (community-documented): AES-256-CBC, key = SHA256(password),
 * IV = first 16 bytes of SHA256(key + password), then gzip, then JSON.
 * Raycast's default export password is "12345678".
 */
export function readRayconfigCommands(path: string, password: string): AICommand[] {
  const key = createHash("sha256").update(password).digest();
  const iv = createHash("sha256")
    .update(Buffer.concat([key, Buffer.from(password)]))
    .digest()
    .subarray(0, 16);
  const decipher = createDecipheriv("aes-256-cbc", key, iv);
  let plain: Buffer;
  try {
    plain = Buffer.concat([decipher.update(readFileSync(path)), decipher.final()]);
  } catch {
    throw new Error("Wrong password, or not a Raycast export file.");
  }
  const start = [0, 16, 32].find((off) => plain[off] === 0x1f && plain[off + 1] === 0x8b);
  if (start === undefined) throw new Error("Wrong password, or not a Raycast export file.");

  const json = JSON.parse(gunzipSync(plain.subarray(start)).toString("utf8")) as Record<string, unknown>;
  const ai = json["builtin_package_open-ai"] as { aiCommands?: RawCommand[] } | undefined;
  return (ai?.aiCommands ?? []).filter((c) => c.title && c.promptTemplate).map(toCommand);
}

interface RawCommand {
  title?: string;
  promptTemplate?: string;
  iconName?: string;
  model?: string;
  createdAt?: string;
}

function toCommand(raw: RawCommand): AICommand {
  const provider: Provider = raw.model?.startsWith("anthropic") ? "anthropic" : "openai";
  const cmd = newCommand({
    title: raw.title!.trim(),
    icon: raw.iconName ?? "wand-16",
    prompt: raw.promptTemplate!.trim(),
    provider,
    model: "",
    mode: "preview",
  });
  const created = raw.createdAt ? Date.parse(raw.createdAt) : NaN;
  if (!Number.isNaN(created)) cmd.createdAt = created;
  return cmd;
}
