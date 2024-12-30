import { CreateRecipeModal } from "@/src/components/society/CreateRecipeModal";

import ReelStories from "../_components/Stories/ReelStories";

export default function Home() {
  return (
    <>
      <div className=" w-full rounded-md mb-10 lg:px-0 px-5 ">
        <div className="w-full dark:bg-neutral-900 rounded-lg shadow-md overflow-hidden">
          {/* Create Post Section */}
          <div className="p-4">
            <div className="flex items-center">
              <CreateRecipeModal />
            </div>
          </div>
        </div>
      </div>

      <ReelStories />
    </>
  );
}
