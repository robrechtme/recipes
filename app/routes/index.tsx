import { useLoaderData } from "remix";
import RecipeCard from "~/components/RecipeCard";
import { getRecipes, Recipe } from "~/recipes";

export const loader = () => {
  return getRecipes();
};

export default function Index() {
  const recipes = useLoaderData<Recipe[]>();
  return (
    <div className="bg-primary-500">
      <div className="container mx-auto my-16">
        <h1 className="text-center text-secondary-900 font-extrabold text-4xl mb-2">
          Tweede kookboek van Robrecht
        </h1>
        <h2 className="text-center">
          Een collectie van lekkere recepten, deze keer niet van mezelf
        </h2>
        <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
          {recipes.map((recipe) => (
            <RecipeCard recipe={recipe} key={recipe.ogUrl} />
          ))}
        </div>
      </div>
    </div>
  );
}
