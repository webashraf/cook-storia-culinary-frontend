"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import Loading from "@/src/components/UI/Loading/Loading";
import nexiosInstance from "@/src/config/axios.instance";
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
        <Loading />
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <h2>My Post</h2>
          {recipes.length > 0 ? (
            recipes?.map((post: any) => (
              <PostCardProfile key={post?._id} recipe={post} />
            ))
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfilePosts;
