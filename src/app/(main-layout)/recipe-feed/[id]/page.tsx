"use client";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { User } from "@nextui-org/user";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import nexiosInstance from "@/src/config/nexios.instance";
import { useUser } from "@/src/context/user.provider";

const RecipeDetailsPage = ({ params }: { params: { id: string } }) => {
  const [rating, setRating] = useState(0);
  const { user } = useUser();
  const [recipe, setRecipe] = useState<any>({});
  const [userComments, setUserComments] = useState<any>({});

  // Catch Rating value
  const handleRating = async (rate: number) => {
    try {
      const { data }: any = await nexiosInstance.post("/user-opinion/create", {
        postId: params.id,
        userId: user?.id,
        rate,
      });

      if (data?.success) {
        setRating(rate);
        toast.success("Rating successful");
      }
    } catch (err: any) {
      toast.error("Error", err?.message);
    }
  };

  useEffect(() => {
    const recipeFetch = async () => {
      try {
        const { data }: any = await nexiosInstance.get(
          `/recipe?_id=${params.id}`,
          {
            cache: "no-store",
          }
        );
        const { data: comments }: any = await nexiosInstance.get(
          `/user-opinion/${params.id}`,
          { cache: "no-store" }
        );

        if (comments?.success) {
          setUserComments(comments?.data[0]);
          const myRatings = comments?.data?.find(
            (comment: any) => comment?.userId?._id === user?.id
          );

          setRating(myRatings?.rate);
        }

        if (data?.success) {
          setRecipe(data?.data[0]);
        }
      } catch (error: any) {
        console.log("Error fetching recipe", error);
      }
    };

    recipeFetch();
  }, [params?.id, user, rating]);

  return (
    <div className="bg-gradient-to-b min-h-screen lg:p-6 text-default-900 w-full">
      <div className="mx-auto bg-default-100 rounded-xl shadow-2xl overflow-hidden">
        {/* Image Section */}
        <div className="relative">
          <Image
            isBlurred
            isZoomed
            alt="Chicken Alfredo"
            className="w-full h-96 object-cover rounded-t-xl"
            src={`${recipe?.imageUrl}`}
            width={"100%"}
          />
          <h1 className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white text-4xl font-extrabold p-6 z-20 backdrop-blur-lg">
            {recipe?.title}
          </h1>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          <div>
            <User
              avatarProps={{
                src: `${user?.photo}`,
              }}
              description={<p className="text-default-500">Date: 10-5-2024</p>}
              name="Junior Garcia"
            />
          </div>
          {/* Short Description */}
          <p className="text-default-800 text-lg leading-relaxed tracking-wide">
            A creamy and delicious Italian pasta dish made with tender chicken,
            fettuccine, and rich Alfredo sauce.
          </p>
          {/* Rating Section */}
          <div className="flex items-center gap-0">
            <h2>Give ratings: &nbsp;</h2>
            {Array.from({ length: 5 }, (_, index) => index + 1).map(
              (rating, i) => (
                <Button
                  key={rating + i}
                  isIconOnly
                  className="rounded-none text-xl"
                  onClick={() => handleRating(rating)}
                >
                  ⭐
                </Button>
              )
            )}
            <p className="ml-2 text-xl">{rating} 🌟</p>
          </div>
          {/* Nutrition Facts */}
          {/* Nutrition Facts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-default-200/50 p-4 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold text-default-800">
                Nutrition Facts
              </h2>
              <ul className="list-disc list-inside space-y-1 mt-2 text-default-600">
                {recipe?.nutritionFacts ? (
                  <>
                    <li>Calories: {recipe?.nutritionFacts.calories} kcal</li>
                    <li>Protein: {recipe?.nutritionFacts.protein}g</li>
                    <li>Fat: {recipe?.nutritionFacts.fat}g</li>
                    <li>
                      Carbohydrates: {recipe?.nutritionFacts.carbohydrates}g
                    </li>
                  </>
                ) : (
                  <li>Loading nutrition facts...</li>
                )}
              </ul>
            </div>

            <div className="bg-default-200/50 p-4 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold text-default-800">
                Dietary Restrictions
              </h2>
              <ul className="list-disc list-inside space-y-1 mt-2 text-default-600">
                {recipe?.dietaryRestrictions?.length > 0 ? (
                  recipe?.dietaryRestrictions.map(
                    (restriction: string, i: number) => (
                      <li key={i}>{restriction}</li>
                    )
                  )
                ) : (
                  <li>No restrictions listed.</li>
                )}
              </ul>
            </div>
          </div>

          {/* Ingredients */}
          <div className="bg-default-200/50 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-default-800 mb-4">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-default-600 space-y-2">
              {recipe?.ingredients?.length > 0 ? (
                recipe?.ingredients.map((ingredient: string, i: number) => (
                  <li key={i}>{ingredient}</li>
                ))
              ) : (
                <li>Loading ingredients...</li>
              )}
            </ul>
          </div>

          {/* Instructions */}
          <div className="bg-default-200/50 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-default-800 mb-4">
              Instructions
            </h2>
            <p className="text-default-600 leading-relaxed whitespace-pre-wrap">
              {recipe?.instructions || "Loading instructions..."}
            </p>
          </div>

          {/* Cooking and Prep Info */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-default-200/50 p-4 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold text-default-800">
                Preparation Time
              </h2>
              <p className="text-default-600 mt-2">
                {recipe?.preparationTime} minutes
              </p>
            </div>
            <div className="bg-default-200/50 p-4 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold text-default-800">
                Cooking Time
              </h2>
              <p className="text-default-600 mt-2">
                {recipe?.cookingTime} minutes
              </p>
            </div>
          </div>

          {/* Servings */}
          <div className="bg-default-200/50 p-4 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-default-800">
              Servings
            </h2>
            <p className="text-default-600 mt-2">
              Serves {recipe?.servings || "..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailsPage;
