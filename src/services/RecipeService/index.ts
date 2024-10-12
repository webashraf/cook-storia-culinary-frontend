"use server";

import { toast } from "sonner";

import nexiosInstance from "@/src/config/axios.instance";

export const getRecipes = async (limit: number, page: number) => {
  const res = await fetch(
    `https://cook-storia-culinary-backend-project.vercel.app/api/v1/recipe?isDeleted=false&status=publish&limit=${limit}&page=${page}`,
    {
      next: {
        tags: ["recipes"],
      },
    }
  );

  return res.json();
};

export const fetchComments = async (postId: string) => {
  try {
    const data = await nexiosInstance.get(`/user-opinion/${postId}`, {
      next: { tags: ["comments"] },
    });

    return data.data;
  } catch (err) {
    throw new Error(`Error fetching comments`);
  }
};

export const getAllRecipeBySearchAndFilter = async () => {
  try {
    const { data }: any = await nexiosInstance.get(`/recipe`);

    if (data?.success) {
      return data;
    } else {
      toast.error(`Error fetching recipe`);
    }
  } catch (err) {
    toast.error(`Error fetching recipe`);
  }
};
