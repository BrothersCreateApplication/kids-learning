import fs from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";

const root = path.resolve(import.meta.dirname, "..");
const source = await fs.readFile(path.join(root, "app.js"), "utf8");
const dataSource = source.slice(0, source.indexOf("const COPY ="));
const context = {};
vm.createContext(context);
vm.runInContext(
  `${dataSource}
  globalThis.lessonData = { LETTERS, NUMBER_WORDS, ANIMALS, VI_LETTER_NAMES, EN_LETTER_NAMES };`,
  context,
);

const outputPath = path.join(root, "tools", "lesson-data.json");
await fs.writeFile(
  outputPath,
  JSON.stringify(context.lessonData, null, 2),
  "utf8",
);
console.log(`Wrote lesson data to ${outputPath}`);
