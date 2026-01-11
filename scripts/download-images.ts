import fs from "fs";
import path from "path";

import sharp from "sharp";

const DATA_DIR = "./data";
const INDEX_TS_PATH = "./data/index.ts";

async function downloadAndConvert(imageUrl: string, slug: string): Promise<boolean> {
  try {
    const response = await fetch(imageUrl);
    if (!response.ok)
      throw new Error(`Failed to fetch ${imageUrl}: ${response.statusText}`);

    const buffer = await response.arrayBuffer();

    // Save to recipe directory
    const recipeDir = path.join(DATA_DIR, slug);
    const recipeImagePath = path.join(recipeDir, "image.webp");

    // Convert and save
    await sharp(Buffer.from(buffer)).webp().toFile(recipeImagePath);

    console.log(`✅ Downloaded: ${slug}`);
    console.log(`   → ${recipeImagePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to process ${slug} (${imageUrl}):`, error);
    return false;
  }
}

function scanRecipeDirectories(): Array<{slug: string, imageUrl?: string}> {
  if (!fs.existsSync(DATA_DIR)) {
    console.error(`Data directory not found: ${DATA_DIR}`);
    return [];
  }

  const entries = fs.readdirSync(DATA_DIR, { withFileTypes: true });
  const recipes = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const recipeFile = path.join(DATA_DIR, entry.name, "recipe.json");

      if (fs.existsSync(recipeFile)) {
        try {
          const data = fs.readFileSync(recipeFile, "utf-8");
          const recipe = JSON.parse(data);

          recipes.push({
            slug: recipe.slug,
            imageUrl: recipe.image
          });
        } catch (error) {
          console.error(`Error reading ${recipeFile}:`, (error as Error).message);
        }
      }
    }
  }

  return recipes;
}

function generateDataIndex(slugs: string[]) {
  const sortedSlugs = slugs.sort();

  // Generate recipe imports
  const recipeImports = sortedSlugs
    .map(slug => {
      const camelCase = slug.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      return `import ${camelCase}Recipe from './${slug}/recipe.json';`;
    })
    .join('\n');

  // Generate image imports
  const imageImports = sortedSlugs
    .map(slug => {
      const camelCase = slug.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      return `import ${camelCase}Image from './${slug}/image.webp';`;
    })
    .join('\n');

  // Generate recipes array
  const recipesArray = sortedSlugs
    .map(slug => {
      const camelCase = slug.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      return `  ${camelCase}Recipe as Recipe,`;
    })
    .join('\n');

  // Generate images object
  const imagesObject = sortedSlugs
    .map(slug => {
      const camelCase = slug.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase());
      return `  '${slug}': ${camelCase}Image,`;
    })
    .join('\n');

  const content = `import { Recipe } from '@core/types';

// Import all recipe data
${recipeImports}

// Import all recipe images
${imageImports}

// Export recipes array
export const recipes: Recipe[] = [
${recipesArray}
].sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

// Export images object using recipe slugs as keys
export const images = {
${imagesObject}
} as const;`;

  fs.writeFileSync(INDEX_TS_PATH, content);
  console.log(`📝 Updated ${INDEX_TS_PATH} with ${slugs.length} recipes and images`);
}

async function processImages() {
  console.log('🖼️  Processing recipe images...');

  try {
    const recipes = scanRecipeDirectories();

    if (recipes.length === 0) {
      console.log('No recipes found to process');
      return;
    }

    console.log(`📊 Found ${recipes.length} recipes`);

    let successCount = 0;
    let skipCount = 0;

    for (const recipe of recipes) {
      if (!recipe.imageUrl) {
        console.log(`⚠️  Skipping ${recipe.slug}: No image URL`);
        skipCount++;
        continue;
      }

      // Check if image already exists
      const recipeImagePath = path.join(DATA_DIR, recipe.slug, "image.webp");

      if (fs.existsSync(recipeImagePath)) {
        console.log(`⏭️  Skipping ${recipe.slug}: Image already exists`);
        skipCount++;
        continue;
      }

      const success = await downloadAndConvert(recipe.imageUrl, recipe.slug);
      if (success) successCount++;
    }

    console.log('\n📋 Processing Summary:');
    console.log(`✅ Downloaded: ${successCount} images`);
    console.log(`⏭️  Skipped: ${skipCount} images`);
    console.log(`📁 Images saved to: ${DATA_DIR}/[slug]/image.webp`);

    // Generate data/index.ts file
    generateDataIndex(recipes.map(r => r.slug));

  } catch (error) {
    console.error("Error processing images:", error);
  }
}

processImages();
