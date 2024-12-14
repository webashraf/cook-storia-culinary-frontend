"use client";
/* eslint-disable @next/next/no-async-client-component */

import { Pagination } from "@nextui-org/pagination";
import { useEffect, useState } from "react";

import CardSkeleton from "@/src/components/Shared/Loader/CardSkeleton";
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
        <div className="">
          <CardSkeleton />
        </div>
      ) : (
        <div className="grid lg:grid-cols-1 items-center justify-center gap-5 px-5 lg:mx-5 mx-0">
          {recipes?.map((recipe: any) => (
            <div key={recipe?._id} className="">
              <PostCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}

      <Pagination
        isCompact
        showControls
        className="mx-auto mt-5 "
        initialPage={1}
        isDisabled={isLoading}
        total={Math.ceil(pageNumber / limit)}
        onChange={(val) => setPage(val)}
      />
    </div>
  );
};

export default RecipePosts;
