import data from "../../data/recipes.json";

import { Recipe } from "./types";

export async function getRecipes(): Promise<Recipe[]> {
  return data;
}

export async function getRecipe(slug: string) {
  return data.find((recipe) => recipe.slug === slug);
}

export function searchRecipes(recipes: Recipe[], query: string): Recipe[] {
  if (!query.trim()) return recipes;

  const searchTerm = query.toLowerCase().trim();

  return recipes.filter((recipe) => {
    // Primary: Recipe name (highest priority)
    if (recipe.name.toLowerCase().includes(searchTerm)) return true;

    // Secondary: Keywords (split and check each)
    if (recipe.keywords?.toLowerCase().includes(searchTerm)) return true;

    // Tertiary: Description
    if (recipe.description?.toLowerCase().includes(searchTerm)) return true;

    // Quaternary: Cuisine and category
    if (recipe.recipeCuisine?.toLowerCase().includes(searchTerm)) return true;
    if (recipe.recipeCategory?.toLowerCase().includes(searchTerm)) return true;

    // Quinary: Author name
    if (recipe.author?.name?.toLowerCase().includes(searchTerm)) return true;

    return false;
  });
}
