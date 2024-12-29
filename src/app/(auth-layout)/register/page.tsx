"use client";
import React, { Suspense, useEffect, useState } from "react";

import Loading from "@/src/components/Shared/Loader/Loading/Loading";
import SignUp from "@/src/components/Shared/Login/SignUp";
import { getAllUser } from "@/src/services/AuthService";
import { getRecipes } from "@/src/services/RecipeService";

// Lazy load the FaCheckToSlot icon
const FaCheckToSlot = React.lazy(() =>
  import("react-icons/fa6").then((mod) => ({ default: mod.FaCheckToSlot }))
);

// Define TypeScript interfaces for API responses
interface User {
  PremiumUser: number;
  dataLength: number;
}

interface Recipes {
  premiumRecipe: number;
}

const RegisterPage = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ recipes: Recipes; user: User } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipes = await getRecipes(1, 5);
        const user: any = await getAllUser();

        setData({ recipes, user });
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500">
        {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        No data available.
      </div>
    );
  }

  const { recipes, user } = data;

  return (
    <div className="flex items-center justify-center min-h-screen lg:pt-0 pt-10 px-5 lg:px-0 lg:w-[1320px] mx-auto">
      <div
        aria-label="Background image of a beautifully presented recipe"
        className="shadow-2xl shadow-[#95c731]/40 bg-cover bg-center rounded-2xl w-full"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/5785545/pexels-photo-5785545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
        }}
      >
        <div className="flex items-center lg:flex-row flex-col lg:justify-around justify-center lg:gap-0 gap-10 dark:bg-black/80 rounded-xl backdrop-blur-md lg:p-12 p-5">
          {/* Left Section */}
          <div className="lg:w-1/2 text-left text-white">
            <h2 className="lg:text-6xl text-4xl font-semibold mb-4">
              A Recipe Sharing Platform
            </h2>
            <p className="mb-4">
              Share Your Creations, Explore New Recipes, and Inspire Culinary
              Adventures!
            </p>
            <ul className="text-left text-sm">
              <li className="flex items-center gap-2">
                <Suspense fallback={<span>Loading icon...</span>}>
                  <FaCheckToSlot color="#90bf2f" />
                </Suspense>
                World class recipes.
              </li>
              <li className="flex items-center gap-2">
                <Suspense fallback={<span>Loading icon...</span>}>
                  <FaCheckToSlot color="#90bf2f" />
                </Suspense>
                Accept Credit/Debit Cards for various payments.
              </li>
              <li className="flex items-center gap-2">
                <Suspense fallback={<span>Loading icon...</span>}>
                  <FaCheckToSlot color="#90bf2f" />
                </Suspense>
                Total{" "}
                <span className="text-[#90bf2f] font-semibold">
                  {recipes.premiumRecipe}
                </span>{" "}
                premium recipes.
              </li>
              <li className="flex items-center gap-2">
                <Suspense fallback={<span>Loading icon...</span>}>
                  <FaCheckToSlot color="#90bf2f" />
                </Suspense>
                Total{" "}
                <span className="text-[#90bf2f] font-semibold">
                  {user.PremiumUser}
                </span>{" "}
                premium users.
              </li>
              <li className="flex items-center gap-2">
                <Suspense fallback={<span>Loading icon...</span>}>
                  <FaCheckToSlot color="#90bf2f" />
                </Suspense>
                Total{" "}
                <span className="text-[#90bf2f] font-semibold">
                  {user.dataLength}
                </span>{" "}
                active users.
              </li>
            </ul>
          </div>
          {/* Right Section */}
          <div className="lg:w-1/2 w-full">
            <SignUp />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
