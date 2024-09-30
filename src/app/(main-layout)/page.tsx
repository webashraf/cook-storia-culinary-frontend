import PostCard from "./components/PostCard/PostCard";
import Stories from "./components/Stories/Stories";
import UserCard from "./components/UserCard/UserCard";

export default function Home() {
  return (
    <section className=" flex ">
      <div className="w-[70%] mx-auto">
        <Stories />
        <div>
          <PostCard />
        </div>
        {/* <CreatePost /> */}

        {/* <Hero /> */}
      </div>
      <div className="w-[20%] ml-auto h-[120vh] bg-default-300/50 space-y-2 px-2 pt-5 mt-5 rounded-lg">
        <UserCard />
        <UserCard />
        <UserCard />
      </div>
    </section>
  );
}
