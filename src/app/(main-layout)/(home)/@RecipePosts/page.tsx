"use client";
/* eslint-disable @next/next/no-async-client-component */

import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";

import CardSkeleton from "@/src/components/Shared/Loader/CardSkeleton";
import { useUser } from "@/src/context/user.provider";
import { getRecipes } from "@/src/services/RecipeService";

import PostCard from "../../_components/PostCard/PostCard";

const RecipePosts = () => {
  const [page, setPage] = useState(1);
  const [recipes, setRecipes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { user } = useUser();
  const limit = 4;

  const fetchRecipes = async () => {
    setIsLoading(true);

    try {
      const recipeData = await getRecipes(limit, page);

      if (recipeData?.success) {
        setRecipes((prevRecipes) => [...prevRecipes, ...recipeData.data]);
        setIsLoading(false);
        // Check if more data exists
        if (recipeData.data.length < limit) {
          setHasMore(false);
        }
      } else {
        setHasMore(false); // No more data
      }
    } catch (error) {
      console.error("Error fetching recipes", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [page]);

  const handleSeeMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  if (!recipes) {
    <div className="text-center mt-3">
      <CardSkeleton count={4} />
    </div>;
  }

  return (
    <div className="flex flex-col justify-center">
      {isLoading && page === 1 ? (
        <div>
          <CardSkeleton count={4} />
        </div>
      ) : (
        <div className="grid lg:grid-cols-1 items-center justify-center gap-5 px-5 lg:mx-0 mx-0">
          {recipes?.map((recipe: any) => (
            <div key={recipe?._id}>
              <PostCard recipe={recipe} />
            </div>
          ))}
        </div>
      )}

      {/* "See More" Button */}
      {hasMore && !isLoading && recipes.length > 0 && (
        <Button className="mx-auto mt-5 px-4 py-2" onClick={handleSeeMore}>
          See More
        </Button>
      )}
      {/* Loading Indicator */}
      {isLoading && page > 1 && (
        <div className="text-center mt-3">
          <CardSkeleton count={4} />
        </div>
      )}
    </div>
  );
};

export default RecipePosts;
