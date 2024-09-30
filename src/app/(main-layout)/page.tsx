import { recipes } from "@/src/constent/recipe.fakeData";
import PostCard from "./components/PostCard/PostCard";
import Stories from "./components/Stories/Stories";
import UserCard from "./components/UserCard/UserCard";

export default function Home() {
  return (
    <section className=" flex ">
      <div className="w-[70%] mx-auto">
        <Stories />
        <div className="gri grid-cols-2 gap-5 space-y-5">
          {recipes.map((recipe) => (
            <PostCard key={recipe.title} recipe={recipe} />
          ))}
        </div>
      </div>
     
    </section>
  );
}
