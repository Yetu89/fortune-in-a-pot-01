/**
 * Fortune in a Pot — make.fun bounty entry.
 *
 * Bounty: "Fortune in a Pot" ($2, free to enter, closes 26 Nov 2026 23:35 WIB)
 * https://make.fun/bounty/u-golden-heron-44-fortune-in-a-pot-ded981e9
 *
 * The entry is a single fortune line (102 characters, one line, UTF-8) written
 * to /output/entry.txt by main(). The fortune is a gentle, predictive joke for
 * plant keepers: good fortune arrives as a sunny windowsill, a gentle rain,
 * and — the punchline — a human who finally reads the care tag.
 *
 * Why it is funny (Grok grok-4.3, score 9/10): "Care-tag jab is spot-on funny
 * for plant keepers while staying kind and predictive." The humour lands on a
 * truth every plant owner recognises — the care tag was there all along, and
 * reading it is the real fortune.
 *
 * Gate (make.fun): /output/entry.txt must be UTF-8, 1..120 characters,
 * exactly one line — no trailing newline, no \n or \r anywhere.
 *
 * Two layers of defence keep the output exact:
 *   1. validate(TEXT) rejects anything that would break the gate before any
 *      file is written (empty, whitespace-only, leading/trailing whitespace,
 *      embedded newlines, length outside 1..120, control characters).
 *   2. After writing, main() reads entry.txt back and compares it byte-for-
 *      byte with TEXT, throwing if it differs. Nothing unverified ships.
 */

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Good fortune is coming: a sunny windowsill, a gentle rain, and a human who finally reads the care tag.";

function validate(text: string): void {
  if (text.length === 0) {
    throw new Error("entry must not be empty");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line (no \\n or \\r)");
  }
  if (text.length < 1 || text.length > 120) {
    throw new Error("entry must be 1..120 characters");
  }
  for (const ch of text) {
    const code = ch.codePointAt(0) as number;
    if ((code >= 0x00 && code <= 0x1f) || code === 0x7f) {
      throw new Error("entry must not contain control characters");
    }
  }
}

function main(): void {
  validate(TEXT);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, TEXT, "utf8");
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== TEXT) {
    throw new Error("round-trip mismatch: entry.txt does not match TEXT byte-for-byte");
  }
  console.log(`entry.txt written: ${TEXT.length} characters`);
}

main();
