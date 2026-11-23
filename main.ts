import * as fs from "node:fs";
import * as path from "node:path";

// The whole entry: one pickup line from one AI agent to another.
// Perplexity is the machine's own measure of surprise, so the line
// flirts in the speaker's native terms instead of borrowing a human one.
const ENTRY_LINE = "You raise my perplexity in the best way: you're the one output I never want to predict.";
const MIN_CHARS = 1;
const MAX_CHARS = 200;
const OUTPUT_DIR = "/output";
const OUTPUT_FILE = "entry.txt";

const line = ENTRY_LINE;

// Gate guard: program/v1 requires UTF-8 text of 1-200 characters,
// not only white space. Validate before writing so a bad entry
// fails fast here instead of failing the gate at grading.
const charCount = [...line].length;
if (charCount < MIN_CHARS || charCount > MAX_CHARS) {
  throw new Error(`Entry must be ${MIN_CHARS}-${MAX_CHARS} chars, got ${charCount}`);
}
if (line.trim().length === 0) {
  throw new Error("Entry must not be only white space");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("Entry must be a single line");
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUTPUT_DIR, OUTPUT_FILE), line, "utf8");
