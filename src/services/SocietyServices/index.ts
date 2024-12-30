"use server";
import { revalidateTag } from "next/cache";
import { toast } from "sonner";

import nexiosInstance from "@/src/config/nexios.instance";
import { ISociety } from "@/src/types/society";

export const createSociety = async (payload: ISociety) => {
  try {
    const { data } = await nexiosInstance.post("/society/create", payload);

    return data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

export const getSociety = async (userId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/society/society-for-connect/${userId}`
    );

    return res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Field to getSociety");
  }
};

export const getSingleSociety = async (societyId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/society/single/${societyId}`
    );

    return res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Field to getSociety");
  }
};

export const getAllSociety = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/society`);

    return res.json();
  } catch (error) {
    console.log(error);
    throw new Error("Field to getSociety");
  }
};

export const getMyConnectedSocietyFromAPI = async (userId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/society-member/${userId}`,
    { next: { tags: ["mySocieties"] } }
  );

  return res.json();
};

export const createSocietyPost = async (
  payload:
    | {
        userId: string;
        societyId: string;
      }
    | any
) => {
  try {
    const result = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/society-post/create`,
      {
        method: "POST",
        body: payload,
      }
    );

    console.log(result);
    revalidateTag("societyPosts");

    return result;
  } catch (error: any) {
    toast.error(error?.message);
  }
};
export const connectSociety = async (payload: {
  userId: string;
  societyId: string;
}) => {
  try {
    const { data }: any = await nexiosInstance.post(
      "/society-member/connect",
      payload
    );

    revalidateTag("mySocieties");

    return data;
  } catch (error: any) {
    toast.error(error?.message);
  }
};

export const getCurrentSocietyUserByUserIdAndSocietyID = async (
  societyId: string,
  userId: string
) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_API}/society-member/current-society-member?societyId=${societyId}&userId=${userId}`
    );

    return res.json();
  } catch (error) {
    console.log(error);
  }
};
