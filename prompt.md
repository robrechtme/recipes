Your task is to put recipes in a fixed JSON format. Any input I give you, you will try to fit into the JSON. You should answer with the JSON only, wrapped in a markdown code block. It should adhere to this type and it should be in Dutch. Pay extra attention to the image attribute: it should come from the `<meta property="og:image"` tag in the head.

```typescript
export interface Recipe {
  name: string;
  image: string; // Preferably the og:image
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
  amount: number; // e.g., 200
  unit?: string; // e.g., "g", "ml", "teelepel"
}

export interface RecipeInstruction {
  text: string;
}
```

Respond with OK if you understand.
