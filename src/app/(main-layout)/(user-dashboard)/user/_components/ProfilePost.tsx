"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import CardSkeleton from "@/src/components/Shared/Loader/CardSkeleton";
import nexiosInstance from "@/src/config/nexios.instance";
import { useUser } from "@/src/context/user.provider";

import PostCardProfile from "../../../_components/PostCard/PostCardProfile";

const ProfilePosts = () => {
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const { user: currentUser } = useUser();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const { data }: any = await nexiosInstance.get(
          `/recipe?user=${currentUser?.id}`
        );

        if (data.success) {
          setLoading(false);
        }
        if (data && typeof data === "object" && "data" in data) {
          setRecipes(data.data);
        } else {
          setRecipes([]);
        }
      } catch (error: any) {
        toast.error("Error fetching recipes:", error);
      }
    };

    fetchRecipes();
  }, [currentUser]);

  return (
    <div className="pt-5 w-full">
      {loading ? (
        <CardSkeleton />
      ) : (
        <div>
          <h2 className="mb-3">My Post</h2>
          <div className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            {recipes.length > 0 ? (
              recipes?.map((post: any) => (
                <PostCardProfile key={post?._id} recipe={post} />
              ))
            ) : (
              <p>No recipes found.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;
