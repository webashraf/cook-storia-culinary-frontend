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

export const getSociety = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/society`);

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

    if (data?.success) {
      toast.success("Society connected!");
    } else toast.error("Society not connected!");

    return data;
  } catch (error: any) {
    toast.error(error?.message);
  }
};
