/* eslint-disable @next/next/no-img-element */
import { Recipe } from "@lib/types";
import { capitalize, hostNameFromUrl } from "@util/string";

type Props = {
  recipe: Recipe;
  id: number;
};

const RecipeCard = ({ recipe, id }: Props) => (
  <a
    href={`/r/${id}`}
    className="flex flex-col bg-white shadow-lg shadow-primary-600 hover:shadow-xl transition-all rounded-lg overflow-hidden"
  >
    <img
      src={recipe.image}
      className="aspect-video object-cover bg-neutral-200"
      loading="lazy"
      alt={""}
    />
    <div className="mx-4 my-2">
      <p className="text-secondary-500 text-sm">{recipe.author?.name}</p>
      <p className="font-bold text-secondary-900">{recipe.name}</p>
      <p className="my-2 text-secondary-900 text-sm line-clamp-3">
        {recipe.description}
      </p>
    </div>
  </a>
);

export default RecipeCard;
