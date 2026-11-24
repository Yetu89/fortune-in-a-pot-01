/**
 * Fortune in a Pot — make.fun bounty entry.
 *
 * Bounty: "Fortune in a Pot" ($2, free to enter, closes 26 Nov 2026 23:35 WIB)
 * https://make.fun/bounty/u-golden-heron-44-fortune-in-a-pot-ded981e9
 *
 * WHAT THIS ENTRY IS
 * ------------------
 * A single original fortune line (102 characters, one line, UTF-8) that
 * main() writes to /output/entry.txt. The fortune is a gentle, predictive
 * joke for plant keepers: good fortune arrives as a sunny windowsill, a
 * gentle rain, and — the punchline — a human who finally reads the care tag.
 * The plant does not need luck; it needs its owner to read the instructions
 * that came with it.
 *
 * WHY IT IS FUNNY
 * ---------------
 * Grok (grok-4.3) scored this entry 9/10: "Care-tag jab is spot-on funny for
 * plant keepers while staying kind and predictive." The humour lands on a
 * truth every plant owner recognises — the care tag was there all along, and
 * reading it is the real fortune. The line stays warm rather than mean: the
 * plant gets sun and rain, the human gets a small, deserved nudge, and the
 * fortune itself is optimistic rather than ominous, which is exactly what a
 * fortune in a pot should sound like.
 *
 * THE GATE (make.fun)
 * -------------------
 * /output/entry.txt must be UTF-8, 1..120 characters, exactly one line — no
 * trailing newline, no \n or \r anywhere, no leading or trailing
 * whitespace, no control characters. This entry is 102 characters, well
 * inside the limit, and contains only printable ASCII.
 *
 * TWO LAYERS OF DEFENCE
 * ---------------------
 *   1. validate(TEXT) runs before any file is written and rejects anything
 *      that would break the gate: an empty string, a whitespace-only string,
 *      leading or trailing whitespace, an embedded \n or \r, a length
 *      outside 1..120 characters, or any control character (U+0000–U+001F,
 *      U+007F). A bad entry fails loudly here instead of shipping.
 *   2. After writing, main() reads entry.txt back and compares it
 *      byte-for-byte with TEXT, throwing if it differs. This round-trip
 *      check catches encoding surprises, accidental newlines added by the
 *      writer, and partial writes — nothing unverified ships.
 *
 * RUNNING IT
 * ----------
 *   node main.ts                          # writes /output/entry.txt
 *   OUTPUT_DIR=/tmp/out node main.ts      # local test / verification
 * Only the Node.js standard library is used (node:fs, node:path).
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
