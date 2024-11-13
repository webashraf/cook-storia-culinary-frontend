"use client";

import ReelStories from "./ReelStories";
export default function Stories() {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };

  return (
    <div className="mb-5">
      <ReelStories />
    </div>
  );
}
