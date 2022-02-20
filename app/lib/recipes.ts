import scrape from "./scraper/scraper";
import { SuccessResult } from "open-graph-scraper";
import { parse } from "csv-parse/sync";

export type Recipe = SuccessResult["result"];

export async function getRecipes() {
  const rawData = await fetch(process.env.RECIPES_URL).then((b) => b.text());

  const recipes = parse(rawData, { delimiter: "," });
  const data = await Promise.all(
    recipes.map(async (row: string[]) => {
      try {
        const url = row[0];
        const data = await scrape(url);
        return { ...data, url };
      } catch {}
    })
  );
  return data.filter((d) => d);
}
