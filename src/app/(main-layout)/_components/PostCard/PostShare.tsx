"use client";
import { Button } from "@nextui-org/button";
import { useState } from "react";
import { IoIosShareAlt } from "react-icons/io";

const PostShare = ({ id }: { id: string }) => {
  console.log("Post Id", id);

  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Share URL and Title
  const shareUrl = `https://cook-storia-culinary-frontend.vercel.app/recipe-feed/${id}`;
  const shareTitle = "Check out this amazing post!";

  // Facebook Share Link
  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    shareUrl
  )}`;

  // Twitter Share Link
  const twitterShareUrl = `https://x.com/intent/tweet?url=${encodeURIComponent(
    shareUrl
  )}&text=${encodeURIComponent(shareTitle)}`;

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <Button className="" onClick={toggleDropdown}>
        <IoIosShareAlt size={22} />
      </Button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          aria-labelledby="menu-button"
          aria-orientation="vertical"
          className="absolute right-0 bottom-full z-10 mb-2 w-48 origin-bottom-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
        >
          <div className="py-1" role="none">
            {/* Facebook Share */}
            <a
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              href={facebookShareUrl}
              rel="noopener noreferrer"
              role="menuitem"
              target="_blank"
            >
              Share on Facebook
            </a>

            {/* Twitter Share */}
            <a
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              href={twitterShareUrl}
              rel="noopener noreferrer"
              role="menuitem"
              target="_blank"
            >
              Share on Twitter
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostShare;
