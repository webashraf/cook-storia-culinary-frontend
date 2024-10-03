import { nexiosInstance } from "../config/axios.instance";

export const useGetAllRecipes = async () => {
  const { data } = await nexiosInstance.get("/recipe", {
    cache: "no-store",
  });

  if (data && typeof data === "object" && "data" in data) {
    return data.data;
  }
};
