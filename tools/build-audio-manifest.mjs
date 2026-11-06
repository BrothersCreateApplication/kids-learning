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
  globalThis.lessonData = { LETTERS, NUMBER_WORDS, ANIMALS, VEHICLES, VI_LETTER_NAMES, EN_LETTER_NAMES };`,
  context,
);

const { LETTERS, NUMBER_WORDS, ANIMALS, VEHICLES, VI_LETTER_NAMES, EN_LETTER_NAMES } =
  context.lessonData;

const clips = [];

for (const item of LETTERS) {
  const key = item.letter.toLowerCase();
  clips.push({
    path: `assets/audio/letters/${key}-vi.mp3`,
    text: `Chữ ${VI_LETTER_NAMES[item.letter]}.`,
    voice: "vi-VN-HoaiMyNeural",
  });
  clips.push({
    path: `assets/audio/letters/${key}-en.mp3`,
    text: `${EN_LETTER_NAMES[item.letter].charAt(0).toUpperCase()}${EN_LETTER_NAMES[item.letter].slice(1)}.`,
    voice: "en-GB-SoniaNeural",
  });
}

for (const language of ["vi", "en"]) {
  NUMBER_WORDS[language].forEach((word, number) => {
    clips.push({
      path: `assets/audio/numbers/${number}-${language}.mp3`,
      text:
        language === "vi"
          ? `Số ${word}.`
          : `${word.charAt(0).toUpperCase()}${word.slice(1)}.`,
      voice: language === "vi" ? "vi-VN-HoaiMyNeural" : "en-GB-SoniaNeural",
    });
  });
}

for (const animal of ANIMALS) {
  clips.push({
    path: `assets/audio/animals/${animal.id}-vi.mp3`,
    text: `${animal.vi.charAt(0).toUpperCase()}${animal.vi.slice(1)}.`,
    voice: "vi-VN-HoaiMyNeural",
  });
  clips.push({
    path: `assets/audio/animals/${animal.id}-en.mp3`,
    text: `${animal.en.charAt(0).toUpperCase()}${animal.en.slice(1)}.`,
    voice: "en-GB-SoniaNeural",
  });
}

for (const vehicle of VEHICLES) {
  clips.push({
    path: `assets/audio/vehicles/${vehicle.id}-vi.mp3`,
    text: `${vehicle.vi.charAt(0).toUpperCase()}${vehicle.vi.slice(1)}.`,
    voice: "vi-VN-HoaiMyNeural",
  });
  clips.push({
    path: `assets/audio/vehicles/${vehicle.id}-en.mp3`,
    text: `${vehicle.en.charAt(0).toUpperCase()}${vehicle.en.slice(1)}.`,
    voice: "en-GB-SoniaNeural",
  });
}

const manifestPath = path.join(root, "tools", "audio-manifest.json");
await fs.writeFile(manifestPath, JSON.stringify(clips, null, 2), "utf8");
console.log(`Wrote ${clips.length} clips to ${manifestPath}`);
