import { RecipeImage } from "./RecipeImage";

import { Recipe } from "@core/types";
import { translateTime } from "@util/string";

type Props = {
  recipe: Recipe;
};

export const RecipeCard = ({ recipe }: Props) => (
  <article
    className="flex flex-col bg-white shadow-lg shadow-primary-600 hover:shadow-xl transition-all rounded-lg overflow-hidden"
    role="listitem"
  >
    <a href={`/r/${recipe.slug}`} className="flex flex-col h-full">
      <RecipeImage
        slug={recipe.slug}
        className="aspect-video object-cover bg-neutral-200"
      />
      <div className="mx-4 my-2 flex-1 flex flex-col">
        <footer className="text-secondary-500 text-sm mb-1">
          {recipe.author?.name && (
            <address className="not-italic">Door {recipe.author.name}</address>
          )}
        </footer>
        <h2 className="font-bold text-secondary-900 mb-2">{recipe.name}</h2>
        <div className="mt-2 flex flex-wrap gap-2">
          {recipe.totalTime && (
            <time
              className="px-2 py-0.5 bg-neutral-100 text-neutral-800 rounded-full text-xs"
              dateTime={recipe.totalTime}
            >
              {translateTime(recipe.totalTime)}
            </time>
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
  </article>
);
