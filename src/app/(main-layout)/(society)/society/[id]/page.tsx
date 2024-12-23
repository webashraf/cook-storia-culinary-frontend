"use client";

import CreateSocietyPost from "../_components/_singleSociety/CreateSocietyPost";
import SocietyHeader from "../_components/_singleSociety/SocietyHeader";
import SocietyPostList from "../_components/_singleSociety/SocietyPosts";

export default function GroupPage({ params }) {
  return (
    <div className="min-h-screen dark:bg-neutral-900 text-white">
      {/* Header Section */}
      <SocietyHeader />

      {/* Main Content */}
      <div className="container mx-auto mt-8 px-4">
        {/* Society Info */}
        <div className="flex justify-between">
          <div className="w-full">
            <h1 className="text-2xl font-bold hover:underline capitalize">
              Society Name
            </h1>
            <p className="text-gray-400">Society privacy · 1 member</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 border-b border-gray-600">
          <ul className="flex space-x-4 text-gray-400">
            <li className="pb-2 border-b-2 border-transparent hover:text-white hover:border-white">
              About
            </li>
            <li className="pb-2 border-b-2 border-transparent hover:text-white hover:border-white">
              Posts
            </li>
            <li className="pb-2 border-b-2 border-transparent hover:text-white hover:border-white">
              Members
            </li>
            <li className="pb-2 border-b-2 border-transparent hover:text-white hover:border-white">
              Events
            </li>
          </ul>
        </div>

        {/* Main Section */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          {/* Left Section */}
          <div className="flex-1">
            {/* Create Post */}
            <CreateSocietyPost  />

            {/* Display Posts */}
            <SocietyPostList posts={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}
