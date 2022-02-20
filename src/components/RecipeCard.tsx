/* eslint-disable @next/next/no-img-element */
import { Recipe } from "@lib/recipes";
import { capitalize, hostNameFromUrl } from "@util/string";

type Props = {
  recipe: Recipe;
};

const getTitle = (recipe: Recipe) => {
  let title = recipe.ogTitle ?? "";
  if (title.includes(" - ")) {
    title = title.substring(0, title.indexOf(" - "));
  }
  if (title.includes(" | ")) {
    title = title.substring(0, title.indexOf(" | "));
  }
  if (title.toUpperCase() === title) {
    title = capitalize(title.toLocaleLowerCase());
  }
  return title;
};

const getSiteName = (recipe: Recipe) => {
  if (recipe.ogSiteName) {
    return recipe.ogSiteName;
  }
  if (recipe.ogUrl) {
    return hostNameFromUrl(recipe.ogUrl);
  }
};

const getImage = (recipe: Recipe) => {
  if (recipe.ogImageURL) {
    return recipe.ogImage as string;
  }
  if (recipe.ogImage) {
    // @ts-ignore types incorrect
    return recipe.ogImage.url as string;
  }
  return "https://via.placeholder.com/1600x900?text=geen+afbeelding";
};

const RecipeCard = ({ recipe }: Props) => (
  <a
    href={recipe.url}
    target="_blank"
    className="flex flex-col bg-white shadow-lg shadow-primary-600 hover:shadow-xl transition-all rounded-lg overflow-hidden"
    rel="noreferrer"
  >
    <img
      src={getImage(recipe)}
      className="aspect-video object-cover"
      loading="lazy"
      alt={getTitle(recipe)}
    />
    <div className="mx-4 my-2">
      <p className="text-secondary-500 text-sm">{getSiteName(recipe)}</p>
      <p className="font-bold text-secondary-900">{getTitle(recipe)}</p>
      <p className="my-2 text-secondary-900 text-sm line-clamp-3">
        {recipe.ogDescription}
      </p>
    </div>
  </a>
);

export default RecipeCard;
