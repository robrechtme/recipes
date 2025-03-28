// eslint-disable-next-line import/no-unresolved
import { parse } from "csv-parse/sync";

import { Recipe } from "./types";

export async function getRecipes() {
  const rawData = await fetch(process.env.RECIPES_URL!).then((b) => b.text());

  const recipes: string[][] = parse(rawData, { delimiter: "," });
  const data = await Promise.all(
    recipes.map(async (row: string[]) => {
      try {
        const string = row[1];

        const data = JSON.parse(string) as Recipe;
        return data;
      } catch {}
    })
  );
  return data.filter((d) => d) as Recipe[];
}
