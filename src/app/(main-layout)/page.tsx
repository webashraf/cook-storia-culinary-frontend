import PostCard from "./_components/PostCard/PostCard";
import Stories from "./_components/Stories/Stories";

import { nexiosInstance } from "@/src/config/axios.instance";

export default async function Home() {
  const { data } = await nexiosInstance.get("/recipe", {
    cache: "no-store",
  });
  let recipes: any = [];

  if (data && typeof data === "object" && "data" in data) {
    recipes = data.data;
  }
  //console.log(recipes.length);

  console.log("recipes", recipes);

  return (
    <section className="flex">
      <div className="w-[90%] mx-auto">
        <Stories />
        <div className="flex gap-5 items-center justify-center">
          {recipes?.map((recipe: any) => (
            <PostCard key={recipe.title} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
}
