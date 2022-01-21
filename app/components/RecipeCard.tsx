import React from "react";
import { Recipe } from "~/recipes";

type Props = {
  recipe: Recipe;
};

function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

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
    const url = recipe.ogUrl;
    var hostname;
    if (url.indexOf("//") > -1) {
      hostname = url.split("/")[2];
    } else {
      hostname = url.split("/")[0];
    }
    hostname = hostname.split(":")[0];
    hostname = hostname.split("?")[0];
    return hostname;
  }
};

const getImage = (recipe: Recipe) => {
  if (recipe.ogImageURL) {
    return recipe.ogImage;
  }
  if (recipe.ogImage) {
    // @ts-ignore
    return recipe.ogImage.url as string;
  }
  return "https://via.placeholder.com/1600x900?text=geen+afbeelding";
};

const RecipeCard = ({ recipe }: Props) => {
  return (
    <a
      href={recipe.ogUrl}
      target="_blank"
      className="flex flex-col bg-white shadow-lg hover:shadow-xl transition-all rounded-lg overflow-hidden"
    >
      <img src={getImage(recipe)} className="aspect-video object-cover" />
      <div className="mx-4 my-2">
        <p className="text-secondary-500 text-sm">{getSiteName(recipe)}</p>
        <p className="font-bold text-secondary-900">{getTitle(recipe)}</p>
        <p className="my-2 text-secondary-900 text-sm line-clamp-3">
          {recipe.ogDescription}
        </p>
      </div>
    </a>
  );
};

export default RecipeCard;
