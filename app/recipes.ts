import path from "path";
import fs from "fs/promises";
import scrape from "~/lib/scraper/scraper";
import { SuccessResult } from "open-graph-scraper";

export type Recipe = SuccessResult["result"];

// relative to the server output not the source!
const postsPath = path.join(__dirname, "../..", "content", "recipes.txt");

export async function getRecipes() {
  const file = await fs.readFile(postsPath);
  const data = await Promise.all(
    file
      .toString()
      .trim()
      .split("\n")
      .map(async (url) => {
        try {
          const data = await scrape(url);
          return data;
        } catch {}
      })
  );
  return data.filter((d) => d);
}
