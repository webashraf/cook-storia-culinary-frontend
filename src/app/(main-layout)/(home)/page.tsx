import { CreateRecipeModal } from "@/src/components/society/CreateRecipeModal";

import ReelStories from "../_components/Stories/ReelStories";

export default function Home() {
  return (
    <>
      <div className=" w-full rounded-md lg:mb-8 mb-5 lg:px-0 px-5 ">
        <div className="w-full dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden">
          {/* Create Post Section */}
          <div className="flex items-center lg:p-4 p-2">
            <CreateRecipeModal />
          </div>
        </div>
      </div>

      <ReelStories />
    </>
  );
}
