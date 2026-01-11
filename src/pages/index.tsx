import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

import { RecipeCard } from "@components/RecipeCard";
import { SearchBar } from "@components/SearchBar";
import { SearchEmptyState } from "@components/SearchEmptyState";
import { getRecipes, searchRecipes } from "@core/recipes";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const filtered = searchRecipes(recipes, searchQuery);
      setFilteredRecipes(filtered);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, recipes]);

  return (
    <>
      <Head>
        <title>Tweede kookboek van Robrecht</title>
        <meta name="description" content="Een collectie van lekkere recepten met gedetailleerde instructies en ingrediënten. Ontdek diverse gerechten uit verschillende keukens." />
      </Head>
      <main className="container mx-auto my-16">
        <header className="text-center mb-8">
          <h1 className="text-secondary-900 font-extrabold text-4xl mb-2">
            Tweede kookboek van Robrecht
          </h1>
          <p className="text-lg text-gray-600">
            Een collectie van lekkere recepten, deze keer niet van mezelf
          </p>
        </header>

        <SearchBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
        />

        {filteredRecipes.length === 0 && searchQuery.trim() && (
          <SearchEmptyState />
        )}

        {/* Recipe Grid */}
        <section className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8" role="list">
          {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.slug} recipe={recipe} />
          ))}
        </section>
      </main>
    </>
  );
};

export default Home;
