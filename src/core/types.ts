export interface Recipe {
  name: string;
  slug: string;
  image?: string; // original image URL (used by scripts:download-images); the rendered asset is the local webp keyed by slug
  source?: string; // original URL
  description?: string;
  author?: { name: string };
  datePublished?: string;
  recipeCategory?: string;
  recipeCuisine?: string;
  keywords?: string;
  recipeYield: number; // Number of servings as a number
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  recipeIngredient: RecipeIngredient[]; // Structured ingredient list
  recipeInstructions: RecipeInstruction[];
  adaptations?: string[]; // Changes made vs the original source recipe
}

export interface RecipeIngredient {
  name: string; // e.g., "Bloem"
  amount?: number; // e.g., 200
  unit?: string; // e.g., "g", "ml", "el"
  note?: string; // e.g., "alternatief: 5 verse paprika's"
}

export interface RecipeInstruction {
  text: string;
}
