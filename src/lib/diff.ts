/**
 * Marks what the model added or changed, inline, in the result text.
 * Words that are new or replaced come out **bold**; removed words are not
 * shown, so the text still reads as the final version. Plain LCS on
 * whitespace-separated tokens, no dependency.
 */
export interface Highlight {
  markdown: string;
  /** Number of added or changed words. 0 means the model returned the text unchanged. */
  changes: number;
  /** True when the reply is mostly new text (a summary, a translation): highlighting it would just bold everything. */
  rewritten: boolean;
}

export function highlightAdditions(before: string, after: string): Highlight | null {
  const a = tokenize(before);
  const b = tokenize(after);
  if (a.length * b.length > 4_000_000) return null;

  const n = a.length;
  const m = b.length;
  const dp: Uint32Array[] = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i][j] = a[i] === b[j] ? dp[i + 1][j + 1] + 1 : Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }

  // Walk the LCS table; collect the "after" tokens, remembering which are new.
  const parts: { text: string; added: boolean }[] = [];
  const push = (text: string, added: boolean) => {
    const last = parts[parts.length - 1];
    if (last && last.added === added) last.text += text;
    else parts.push({ text, added });
  };
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      push(b[j], false);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      i++; // removed from the original: not shown
    } else {
      push(b[j], true);
      j++;
    }
  }
  while (j < m) push(b[j++], true);

  let changes = 0;
  const markdown = parts
    .map((p) => {
      if (!p.added) return p.text;
      // Keep whitespace outside the markers so ** renders, and bold each
      // line separately so a highlight never spans a line break.
      return p.text
        .split(/(\n+)/)
        .map((seg) => {
          if (!seg || /^\n+$/.test(seg)) return seg;
          const lead = seg.match(/^\s*/)?.[0] ?? "";
          const trail = seg.match(/\s*$/)?.[0] ?? "";
          const core = seg.trim();
          if (!core) return seg;
          changes += core.split(/\s+/).length;
          return `${lead}**${core}**${trail}`;
        })
        .join("");
    })
    .join("");

  const words = b.filter((t) => t.trim()).length;
  const rewritten = words > 0 && changes / words > 0.6;
  return { markdown: rewritten ? after : markdown, changes, rewritten };
}

function tokenize(s: string): string[] {
  return s.split(/(\s+)/).filter((t) => t.length > 0);
}
