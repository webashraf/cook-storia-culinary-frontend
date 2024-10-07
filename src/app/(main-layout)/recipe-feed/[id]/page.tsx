"use client";

import { Image } from "@nextui-org/image";
import { User } from "@nextui-org/user";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

import { nexiosInstance } from "@/src/config/axios.instance";

const Rating = dynamic(
  () => import("react-simple-star-rating").then((mod) => mod.Rating),
  { ssr: false }
);

const Page = ({ params }: { params: { id: string } }) => {
  const [rating, setRating] = useState(0);

  // Catch Rating value
  const handleRating = (rate: number) => {
    setRating(rate);
    console.log(rate);
    // Other logic such as submitting rating to backend
  };

  useEffect(() => {
    const recipeFetch = async () => {
      try {
        const { data } = await nexiosInstance.get(`/recipe?_id=${params.id}`);

        console.log("recipe data", data);
      } catch (error: any) {
        console.log("Error fetching recipe", error);
      }
    };

    recipeFetch();
  }, [params.id]); // Add params.id as a dependency

  console.log("Recipe Id", params.id);

  return (
    <div className="bg-gradient-to-b min-h-screen p-6 text-default-900 w-full">
      <div className="mx-auto bg-default-100 rounded-xl shadow-2xl overflow-hidden">
        {/* Image Section */}
        <div className="relative">
          <div className="absolute z-30 right-0 bg-black/30 top-5">
            {/* Add handleRating function */}
            <Rating ratingValue={rating} onClick={handleRating} />
          </div>
          <Image
            isBlurred
            isZoomed
            alt="Chicken Alfredo"
            className="w-full h-96 object-cover rounded-t-xl"
            src="https://img.freepik.com/free-photo/view-delicious-food-chinese-new-year-reunion-dinner_23-2151040712.jpg?t=st=1727720720~exp=1727724320~hmac=a8873c7d972ca68df3d3482eaa4c53d709c660cbfabf349c35a2737a4e34a80e&w=1380"
            width={"100%"}
          />
          <h1 className="absolute bottom-0 left-0 bg-black bg-opacity-60 text-white text-4xl font-extrabold p-6 z-20 backdrop-blur-lg">
            Chicken Alfredo
          </h1>
        </div>

        {/* Content Section */}
        <div className="p-8 space-y-6">
          <div>
            <User
              avatarProps={{
                src: "https://avatars.githubusercontent.com/u/30373425?v=4",
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
          <div className="flex items-center gap-3">
            <h2>Give ratings: &nbsp;</h2>
            {/* Add handleRating function */}
            <Rating ratingValue={rating} onClick={handleRating} />
          </div>
          {/* Nutrition Facts */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-default-200/50 p-4 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold text-default-800">
                Nutrition Facts
              </h2>
              <ul className="list-disc list-inside space-y-1 mt-2 text-default-600">
                <li>Calories: 700 kcal</li>
                <li>Protein: 35g</li>
                <li>Fat: 40g</li>
                <li>Carbohydrates: 50g</li>
              </ul>
            </div>

            <div className="bg-default-200/50 p-4 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold text-default-800">
                Dietary Restrictions
              </h2>
              <ul className="list-disc list-inside space-y-1 mt-2 text-default-600">
                <li>Gluten-free</li>
              </ul>
            </div>
          </div>
          {/* Ingredients */}
          <div className="bg-default-200/50 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-default-800 mb-4">
              Ingredients
            </h2>
            <ul className="list-disc list-inside text-default-600 space-y-2">
              <li>Fettuccine pasta</li>
              <li>Chicken breast</li>
              <li>Heavy cream</li>
              <li>Parmesan cheese</li>
              <li>Butter</li>
              <li>Garlic</li>
              <li>Black pepper</li>
            </ul>
          </div>
          {/* Instructions */}
          <div className="bg-default-200/50 p-6 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-default-800 mb-4">
              Instructions
            </h2>
            <p className="text-default-600 leading-relaxed whitespace-pre-wrap">
              1. Cook fettuccine according to package instructions.
              {"\n"}2. In a pan, cook chicken until browned.
              {"\n"}3. In another pan, melt butter and sauté garlic.
              {"\n"}4. Add cream and Parmesan to the garlic, stirring until
              thickened.
              {"\n"}5. Combine pasta, chicken, and sauce, mixing well. Serve
              with pepper.
            </p>
          </div>
          {/* Cooking and Prep Info */}
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-default-200/50 p-4 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold text-default-800">
                Preparation Time
              </h2>
              <p className="text-default-600 mt-2">15 minutes</p>
            </div>
            <div className="bg-default-200/50 p-4 rounded-lg shadow-xl">
              <h2 className="text-2xl font-semibold text-default-800">
                Cooking Time
              </h2>
              <p className="text-default-600 mt-2">25 minutes</p>
            </div>
          </div>
          {/* Servings */}
          <div className="bg-default-200/50 p-4 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold text-default-800">
              Servings
            </h2>
            <p className="text-default-600 mt-2">Serves 4</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
