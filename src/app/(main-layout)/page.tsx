import { nexiosInstance } from "@/src/config/axios.instance";
import PostCard from "./components/PostCard/PostCard";
import Stories from "./components/Stories/Stories";

export default async function Home() {
  const { data } = await nexiosInstance.get("/recipe");
  let recipes: any = [];
  if (data && typeof data === "object" && "data" in data) {
    recipes = data.data;
  }
  console.log(recipes.length);
  return (
    <section className="flex">
      <div className="lg:w-[70%] mx-auto">
        <Stories />
        <div className="gri grid-cols-2 gap-5 space-y-5">
          {recipes?.map((recipe: any) => (
            <PostCard key={recipe.title} recipe={recipe} />
          ))}
        </div>
      </div>
    </section>
  );
}
