"use client";

import PostCard from "@/src/app/(main-layout)/_components/PostCard/PostCard";
import { nexiosInstance } from "@/src/config/axios.instance";

const ProfilePosts = async () => {
  try {
    const { data }: any = await nexiosInstance.get("/recipe", {
      cache: "no-store",
    });

    let recipes: any[] = [];

    if (data && typeof data === "object" && "data" in data) {
      recipes = data.data;
    }

    return (
      <div className="p-4">
        <div className="grid grid-cols-1 gap-4">
          {recipes.length > 0 ? (
            recipes.map((post: any) => (
              <PostCard key={post.title} recipe={post} />
            ))
          ) : (
            <p>No recipes found.</p> // Message for no recipes
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching recipes:", error);

    return <p>Error loading recipes. Please try again later.</p>; // Error message
  }
};

export default ProfilePosts;
