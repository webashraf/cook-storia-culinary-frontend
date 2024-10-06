import { nexiosInstance } from "@/src/config/axios.instance";

import PostCard from "./_components/PostCard/PostCard";
import Stories from "./_components/Stories/Stories";


export default async function Home() {
  const { data } = await nexiosInstance.get("/recipe", {
    cache: "no-store",
  });
  let recipes: any = [];

  if (data && typeof data === "object" && "data" in data) {
    recipes = data.data;
  }

  return (
    <section className="flex">
      <div className="w-[90%] mx-auto">
        <Stories />
        <div className="flex gap-5 items-center flex-wrap justify-center">
          {recipes?.map((recipe: any) => (
            <div key={recipe._id} className="w-[48%]">
              <PostCard recipe={recipe} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
