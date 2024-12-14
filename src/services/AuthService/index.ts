"use server";

import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

import axiosInstance from "@/src/config/axios.instance";
import nexiosInstance from "@/src/config/nexios.instance";

export const loginUser = async (userInfo: {
  email: string;
  password: string;
}) => {
  try {
    const { data }: any = await nexiosInstance.post(
      "/auth/login-user",
      userInfo
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

  if (accessToken) {
    decodedToken = await jwtDecode(accessToken);
  }

  return decodedToken;
};

export const reGenerateNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    if (!refreshToken) {
      throw new Error("No refresh token found");
    }

    const res = await fetch(
      `https://cook-storia-culinary-backend-project.vercel.app/api/v1/auth/refresh-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${refreshToken}`,
        },
      }
    );

    if (!res.ok) {
      throw new Error("Failed to refresh access token");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to generate accessToken");
  }
};

export const getNewAccessToken = async () => {
  try {
    const refreshToken = cookies().get("refreshToken")?.value;

    const res = await axiosInstance({
      url: "/auth/refresh-token",
      method: "POST",
      withCredentials: true,
      headers: {
        cookie: `refreshToken=${refreshToken}`,
      },
    });

    return res.data;
  } catch (error) {
    throw new Error("Failed to get new access token");
  }
};

export const getAllUser = async () => {
  try {
    const { data } = await nexiosInstance.get("/auth/user");

    return data;
  } catch (error: any) {
    throw new Error(error);
  }
};
