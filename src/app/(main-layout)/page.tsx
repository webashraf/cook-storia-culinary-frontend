import PostCard from "./_components/PostCard/PostCard";
import Stories from "./_components/Stories/Stories";

import { nexiosInstance } from "@/src/config/axios.instance";

export default async function Home() {
  const { data } = await nexiosInstance.get("/recipe");
  let recipes: any = [];

  if (data && typeof data === "object" && "data" in data) {
    recipes = data.data;
  }
  //console.log(recipes.length);

  return (
    <section className="flex">
      <div className="w-[80%] mx-auto">
        <Stories />
        <div className="grid grid-cols-2 gap-5 space-y-">
          {recipes?.map((recipe: any) => (
            <PostCard key={recipe.title} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
}
