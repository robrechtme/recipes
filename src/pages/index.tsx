import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";

import { RecipeCard } from "@components/RecipeCard";
import { getRecipes } from "@core/recipes";
import { Recipe } from "@core/types";

export const getStaticProps: GetStaticProps = async () => {
  const recipes = await getRecipes();
  return {
    props: { recipes },
  };
};

interface Props {
  recipes: Recipe[];
}

const Home: NextPage<Props> = ({ recipes }) => {
  return (
    <>
      <Head>
        <title>Tweede kookboek van Robrecht</title>
      </Head>
      <div className="bg-primary-500">
        <div className="container mx-auto my-16">
          <h1 className="text-center text-secondary-900 font-extrabold text-4xl mb-2">
            Tweede kookboek van Robrecht
          </h1>
          <h2 className="text-center">
            Een collectie van lekkere recepten, deze keer niet van mezelf
          </h2>
          <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
            {recipes.map((recipe, i) => (
              <RecipeCard key={i} recipe={recipe} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
