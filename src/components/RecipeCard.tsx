import { Recipe } from "@core/types";
import { translateTime } from "@util/string";

import { RecipeImage } from "./RecipeImage/RecipeImage";

type Props = {
  recipe: Recipe;
};

export const RecipeCard = ({ recipe }: Props) => (
  <a
    href={`/r/${recipe.slug}`}
    className="flex flex-col bg-white shadow-lg shadow-primary-600 hover:shadow-xl transition-all rounded-lg overflow-hidden"
  >
    <RecipeImage
      slug={recipe.slug}
      className="aspect-video object-cover bg-neutral-200"
    />
    <div className="mx-4 my-2">
      <p className="text-secondary-500 text-sm">{recipe.author?.name}</p>
      <p className="font-bold text-secondary-900">{recipe.name}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {recipe.totalTime && (
          <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 rounded-full text-xs">
            {translateTime(recipe.totalTime)}
          </span>
        )}
        {recipe.recipeCuisine && (
          <span className="px-2 py-0.5 bg-neutral-100 text-neutral-800 rounded-full text-xs">
            {recipe.recipeCuisine}
          </span>
        )}
        {recipe.keywords?.split(",").map((keyword, index) => (
          <span
            key={index}
            className="px-2 py-0.5 bg-neutral-100 text-neutral-800 rounded-full text-xs"
          >
            {keyword.trim()}
          </span>
        ))}
      </div>
      <p className="my-2 text-secondary-900 text-sm line-clamp-3">
        {recipe.description}
      </p>
    </div>
  </a>
);
