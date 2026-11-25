// The Tired Dark Lord — a 100-word villain monologue for make.fun.
// Entry point: node main.ts
// Writes exactly one text, deterministically, to /output/entry.txt.
// Runs on Node 22+ with no dependencies. No clocks, no randomness,
// no network, no environment reads beyond the optional output override.

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

// Lord Varric, keeper of the Greymere causeway toll: forty years of
// ledgers, one abandoned hero's sword, and a gate that sticks.
// The weariness lives in the pauses and the deflections, never in a
// plain statement of it. The sting lands in the last line.
// (Dashes are attached to the preceding word so the word count stays true.)
const LINES = [
  "I am Lord Varric of the Black Toll— yes, yes, the banners, the horns—",
  "and I stand at the Greymere causeway, counting coins into a purse.",
  "Forty years of ledgers. Forty years of farmers haggling over three copper",
  "pennies while the river eats the road beneath us. You came to slay me?",
  "Bring a chair. The hero left his sword in my hall and married the",
  "miller's daughter. I kept the sword. I keep everything. The toll is two",
  "coppers now. Pay it, or— ah. The gate. It sticks. Kick it twice, like",
  "you mean it.",
];

const MONOLOGUE = LINES.join(" ");

const MAX_CHARS = 600;
const MIN_WORDS = 90;
const MAX_WORDS = 96;

function countWords(text) {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function fail(message) {
  throw new Error(`entry gate failed: ${message}`);
}

function checkEntry(text) {
  const chars = [...text].length;
  if (chars < 1) fail("empty entry");
  if (chars > MAX_CHARS) fail(`${chars} chars exceeds ${MAX_CHARS}`);
  if (text.trim().length === 0) fail("entry is whitespace-only");
  const words = countWords(text);
  if (words < MIN_WORDS || words > MAX_WORDS) {
    fail(`word count ${words} outside ${MIN_WORDS}-${MAX_WORDS}`);
  }
  return { chars, words };
}

function writeEntry() {
  const { chars, words } = checkEntry(MONOLOGUE);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
  const outPath = resolve(outDir, "entry.txt");
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, MONOLOGUE, "utf8");
  console.log(`wrote ${outPath}: ${chars} chars, ${words} words`);
}

writeEntry();
