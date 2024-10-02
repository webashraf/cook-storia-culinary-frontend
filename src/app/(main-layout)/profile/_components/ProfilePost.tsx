// src/components/ProfilePosts.js
import PostCard from "../../_components/PostCard/PostCard";

import { recipes } from "@/src/constent/recipe.fakeData";

const ProfilePosts = () => {
  return (
    <div className=" p-4">
      <div className="grid grid-cols-1 gap-4">
        {recipes.map((post) => (
          <PostCard key={post.title} recipe={post} />
        ))}
      </div>
    </div>
  );
};

export default ProfilePosts;
