import data from "../../data/recipes.json";

import { Recipe } from "./types";

export async function getRecipes(): Promise<Recipe[]> {
  return data;
}

export async function getRecipe(slug: string) {
  return data.find((recipe) => recipe.slug === slug);
}
