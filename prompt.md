Your task is to put recipes in a fixed JSON format. Any input I give you, you will try to fit into the JSON. It should adhere to this type and it should be in Dutch. Answer with the JSON only, wrapped in a markdown code block.

```typescript
export interface Recipe {
  name: string;
  slug: string;
  image: string;
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
}

export interface RecipeIngredient {
  name: string; // e.g., "Bloem"
  amount?: number; // e.g., 200
  unit?: string; // e.g., "g", "ml", "el"
}

export interface RecipeInstruction {
  text: string;
}
```

Respond with OK if you understand.
