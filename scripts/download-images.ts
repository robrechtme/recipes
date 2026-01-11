import fs from "fs";
import path from "path";

import sharp from "sharp";

const INPUT_JSON = "./data/recipes.json"; // JSON file with image URLs
const OUTPUT_DIR = "./data/images";
const IMAGES_TS_PATH = "./data/images.ts";

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function downloadAndConvert(imageUrl: string, fileName: number) {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok)
      throw new Error(`Failed to fetch ${imageUrl}: ${response.statusText}`);

    const buffer = await response.arrayBuffer();
    const outputFilePath = path.join(OUTPUT_DIR, `${fileName}.webp`);
    await sharp(Buffer.from(buffer)).webp().toFile(outputFilePath);
    console.log(`Saved: ${outputFilePath}`);
  } catch (error) {
    console.error(`Failed to process ${imageUrl}:`, error);
  }
}

function updateImagesTs(slugs: string[]) {
  const exports = slugs
    .map(slug => `export { default as '${slug}' } from './images/${slug}.webp'`)
    .join('\n');

  fs.writeFileSync(IMAGES_TS_PATH, exports + '\n');
  console.log(`Updated ${IMAGES_TS_PATH} with ${slugs.length} exports`);
}

async function processImages() {
  try {
    const data = fs.readFileSync(INPUT_JSON, "utf-8");
    const images = JSON.parse(data);
    if (!Array.isArray(images)) throw new Error("Invalid JSON format");

    await Promise.all(
      images.map((img) => downloadAndConvert(img.image, img.slug))
    );

    // Update images.ts with all slugs
    const slugs = images.map(img => img.slug);
    updateImagesTs(slugs);
  } catch (error) {
    console.error("Error processing images:", error);
  }
}

processImages();
