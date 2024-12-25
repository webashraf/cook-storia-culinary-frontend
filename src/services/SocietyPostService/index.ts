"use server";

import nexiosInstance from "@/src/config/nexios.instance";
import { IUpvoteDownvote } from "@/src/types/society";

export const getSocietyPost = async (societyId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/society-post/${societyId}`
    );

    return res.json();
  } catch (error) {
    console.log(error);
  }
};

export const createSocietyComment = async (payload: any) => {
  try {
    const res = await nexiosInstance.post(
      `/society-post-comment/create`,
      payload
    );

    return res.data;
  } catch (error: any) {
    console.error("Error creating society comment:", error.message || error);
    throw new Error(
      error.res?.data?.message || "Failed to create society comment"
    );
  }
};

export const getSocietyPostComment = async (
  postId: string,
  pagination: string
) => {
  console.log("Pagination", pagination);
  try {
    const { data } = await nexiosInstance.get(
      `/society-post-comment/post-comments?postId=${postId}${pagination}`
    );

    return { data };
  } catch (error) {
    console.log(error);
  }
};

export const createOrUpdateUpvoteDownvote = async (
  payload: IUpvoteDownvote
) => {
  try {
    const { data } = await nexiosInstance.post(
      "/upvote-downvote/update",
      payload
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getSocietyPostVotes = async (postId: string) => {
  console.log("PostId", postId);
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/upvote-downvote/${postId}`
    );

    return res.json();
  } catch (error) {
    console.log(error);
  }
};


