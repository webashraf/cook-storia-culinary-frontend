"use client";

import PostCard from "@/src/app/(main-layout)/_components/PostCard/PostCard";
import { nexiosInstance } from "@/src/config/axios.instance";
import { useEffect, useState } from "react";

const ProfilePosts = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data }: any = await nexiosInstance.get("/recipe", {
          cache: "no-store",
        });

        if (data && typeof data === "object" && "data" in data) {
          setRecipes(data.data);
        } else {
          setRecipes([]);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, []); // Empty dependency array to run only once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4">
        {recipes.length > 0 ? (
          recipes.map((post: any) => (
            <PostCard key={post.title} recipe={post} />
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePosts;
