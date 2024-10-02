"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

import { nexiosInstance } from "@/src/config/axios.instance";

export const loginUser = async (userInfo: {
  email: string;
  password: string;
}) => {
  try {
    const { data }: any = await nexiosInstance.post(
      "/auth/login-user",
      userInfo,
    );

    if (data.success) {
      cookies().set("accessToken", data?.data?.accessToken);
      cookies().set("refreshToken", data?.data?.refreshToken);
    }

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};

export const logoutUser = () => {
  cookies().delete("accessToken");
  cookies().delete("refreshToken");
};

export const getCurrentUser = async () => {
  const accessToken = cookies().get("accessToken")?.value;

  let decodedToken = null;

  if (!!accessToken) {
    decodedToken = await jwtDecode(accessToken);
  }

  return decodedToken;
};
