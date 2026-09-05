/**
 * Word-level diff rendered as markdown: removed words are ~~struck~~,
 * added words are **bold**. Plain LCS, no dependency. Returns null when the
 * texts are too big to diff cheaply.
 */
export function diffMarkdown(before: string, after: string): string | null {
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

  type Op = { kind: "eq" | "del" | "ins"; text: string };
  const ops: Op[] = [];
  const push = (kind: Op["kind"], text: string) => {
    const last = ops[ops.length - 1];
    if (last && last.kind === kind) last.text += text;
    else ops.push({ kind, text });
  };
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i] === b[j]) {
      push("eq", a[i]);
      i++;
      j++;
    } else if (dp[i + 1][j] >= dp[i][j + 1]) {
      push("del", a[i]);
      i++;
    } else {
      push("ins", b[j]);
      j++;
    }
  }
  while (i < n) push("del", a[i++]);
  while (j < m) push("ins", b[j++]);

  return ops
    .map((op) => {
      if (op.kind === "eq") return op.text;
      // Keep surrounding whitespace outside the markers so ~~ and ** render.
      const lead = op.text.match(/^\s*/)?.[0] ?? "";
      const trail = op.text.match(/\s*$/)?.[0] ?? "";
      const core = op.text.trim();
      if (!core) return op.text;
      return op.kind === "del" ? `${lead}~~${core}~~${trail}` : `${lead}**${core}**${trail}`;
    })
    .join("");
}

function tokenize(s: string): string[] {
  return s.split(/(\s+)/).filter((t) => t.length > 0);
}
