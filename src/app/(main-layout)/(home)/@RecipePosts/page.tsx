"use client";
/* eslint-disable @next/next/no-async-client-component */

import { Pagination } from "@nextui-org/pagination";
import { useEffect, useState } from "react";

import { getRecipes } from "@/src/services/RecipeService";

import PostCard from "../../_components/PostCard/PostCard";

const RecipePosts = () => {
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);

  const limit = 4;

  const fetchRecipes = async () => {
    setIsLoading(true);
    try {
      const recipeData = await getRecipes(limit, page);

      if (recipeData?.success) {
        setRecipes(recipeData.data);
        setPageNumber(recipeData.dataLength);
      }
    } catch (error) {
      console.error("Error fetching recipes", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [page]);

  return (
    <div className="flex flex-col justify-center">
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="loader">Loading...</div>
        </div>
      ) : (
        <div className="flex gap-5 items-center flex-wrap justify-center">
          {recipes?.map((recipe: any) => (
            <div key={recipe?._id} className="lg:w-[48%]">
              <PostCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}

      <Pagination
        isCompact
        showControls
        className="mx-auto mt-5"
        initialPage={1}
        isDisabled={isLoading}
        total={Math.ceil(pageNumber / limit)}
        onChange={(val) => setPage(val)}
      />
    </div>
  );
};

export default RecipePosts;
