"use server";
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
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/society/society-for-connect/${userId}`
  );

  return res.json();
};

export const getMyConnectedSocietyFromAPI = async (userId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_API}/society-member/${userId}`
  );

  return res.json();
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

    return data;
  } catch (error: any) {
    toast.error(error?.message);
  }
};
