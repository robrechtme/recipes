// eslint-disable-next-line import/no-unresolved
import { parse } from "csv-parse/sync";
import { SuccessResult } from "open-graph-scraper";

import scrape from "./ogScraper";

export type Recipe = SuccessResult["result"] & { url: string };

export async function getRecipes() {
  const rawData = await fetch(process.env.RECIPES_URL!).then((b) => b.text());

  const recipes: string[][] = parse(rawData, { delimiter: "," });
  const data = await Promise.all(
    recipes.map(async (row: string[]) => {
      try {
        const url = row[0];
        const data = await scrape(url);
        return { ...data, url } as Recipe;
      } catch {}
    })
  );
  return data.filter((d) => d) as Recipe[];
}
