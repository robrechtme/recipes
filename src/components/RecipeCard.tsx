import type { Recipe } from "@core/types";
import { translateTime } from "@util/string";
import { RecipeImage } from "./RecipeImage";

type Props = {
  recipe: Recipe;
};

const ClockIcon = ({ className }: { className: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

export const RecipeCard = ({ recipe }: Props) => (
  <article role="listitem">
    <a href={`/r/${recipe.slug}`} className="group flex flex-col">
      <div className="relative">
        <RecipeImage
          slug={recipe.slug}
          className="aspect-video w-full rounded-2xl object-cover bg-photo"
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
        />
        {recipe.totalTime && (
          <time
            className="absolute right-2 top-2 flex items-center gap-1 rounded-full bg-ink/60 px-2 py-1 text-xs text-white backdrop-blur-sm"
            dateTime={recipe.totalTime}
          >
            <ClockIcon className="h-3.5 w-3.5" />
            {translateTime(recipe.totalTime)}
          </time>
        )}
      </div>
      <h2 className="mt-3 font-bold text-ink">{recipe.name}</h2>
      {recipe.author?.name && (
        <address className="mt-1 text-sm text-muted not-italic">
          via <span className="font-semibold text-accent">{recipe.author.name}</span>
        </address>
      )}
    </a>
  </article>
);
