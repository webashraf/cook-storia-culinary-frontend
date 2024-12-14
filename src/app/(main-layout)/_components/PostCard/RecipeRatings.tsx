"use client";
import { useEffect, useState } from "react";

import { fetchComments } from "@/src/services/RecipeService";

const RecipeRatings = ({ recipeId }: any) => {
  const [averageRating, setAverageRating] = useState<number | string>(0);

  useEffect(() => {
    const calculateAverageRating = async () => {
      const comments: any = await fetchComments(recipeId);

      if (!comments || !comments?.data || comments?.data.length === 0) {
        setAverageRating(0);

        return;
      }

      const totalRatings = comments?.data.reduce(
        (total: number, comment: any) => total + (comment?.rate || 0),
        0
      );

      const ratingsCount = comments?.data.filter(
        (comment: any) => comment?.rate
      ).length;

      const average =
        ratingsCount > 0 ? (totalRatings / ratingsCount).toFixed(1) : 0;

      setAverageRating(average);
    };

    calculateAverageRating();
  }, [RecipeRatings]);

  return (
    <div>
      <p className="text-[12px] mt-1 text-[#fcd53f]"> {averageRating} ⭐</p>
    </div>
  );
};

export default RecipeRatings;
