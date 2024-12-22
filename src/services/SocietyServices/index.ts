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
