import { CreateRecipeModal } from "@/src/components/society/CreateRecipeModal";

import ReelStories from "../_components/Stories/ReelStories";

export default function Home() {
  return (
    <>
      <div className="dark:bg-neutral-900 flex justify-center items-center w-full rounded-md mb-10">
        <div className="w-full  rounded-lg shadow-md overflow-hidden">
          {/* Create Post Section */}
          <div className="p-4">
            <div className="flex items-center">
              <CreateRecipeModal />
            </div>

            <div className="flex justify-between">
              <button disabled className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15.75 8.25v-3a3 3 0 00-3-3h-3a3 3 0 00-3 3v3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M9 8.25a6.75 6.75 0 1113.5 0v8.5A6.75 6.75 0 019 16.75v-8.5z"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Photo/Video
              </button>
              <button disabled className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.75 7.5v9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14.25 7.5v9"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Live Video
              </button>
              <button disabled className="flex items-center text-gray-600">
                <svg
                  className="w-5 h-5 mr-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Create Event
              </button>
            </div>
          </div>
        </div>
      </div>

      <ReelStories />
    </>
  );
}
