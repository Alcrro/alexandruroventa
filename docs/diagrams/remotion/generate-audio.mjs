// Run: OPENAI_API_KEY=sk-... node generate-audio.mjs
// Or: create a .env file with OPENAI_API_KEY=sk-... and just run: node generate-audio.mjs
// Saves public/narration.mp3 (~14s) timed to match the ProjectsFlow composition.

import OpenAI from "openai";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// load .env if present
const envPath = path.join(__dirname, ".env");
if (fs.existsSync(envPath)) {
  for (const line of fs.readFileSync(envPath, "utf-8").split("\n")) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
}

const apiKey = process.env.OPENAI_API_KEY;
if (!apiKey) {
  console.error("Error: OPENAI_API_KEY is not set.");
  process.exit(1);
}

const client = new OpenAI({ apiKey });

// ~15 seconds of speech at speed 1.0 — matches the 450-frame composition at 30fps
const narration = `
ProjectsPage fetches data server-side and passes it to ProjectsGrid.
ProjectsGrid is a client component: it renders filter buttons and animates cards with Framer Motion stagger.
Selecting a filter re-renders only matching cards via AnimatePresence.
Clicking a card navigates to ProjectDetail at slash projects slash slug.
`.trim();

console.log("Generating narration with OpenAI TTS...");

const response = await client.audio.speech.create({
  model: "tts-1-hd",
  voice: "nova",   // options: alloy · echo · fable · onyx · nova · shimmer
  input: narration,
  speed: 1.0,
});

const outDir = path.join(__dirname, "public");
fs.mkdirSync(outDir, { recursive: true });
const outPath = path.join(outDir, "narration.mp3");

const buffer = Buffer.from(await response.arrayBuffer());
fs.writeFileSync(outPath, buffer);

console.log(`✓ Audio saved to ${outPath}`);
console.log("  Tip: check the duration and adjust durationInFrames in Root.tsx if needed (fps=30).");
