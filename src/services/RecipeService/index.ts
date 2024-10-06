"use server";

import { toast } from "sonner";

import { nexiosInstance } from "@/src/config/axios.instance";

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
