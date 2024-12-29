// src/components/userInfo.js

import Link from "next/link";
const ProfileInfo = () => {
  return (
    <div className=" p-4 pl-0 pb-0 border-b border-gray-300 dark:border-gray-700">
      <p className="text-gray-600 dark:text-gray-300 mb-5">
        Turning Ingredients into Culinary Art
      </p>

      <div className="w-full flex flex-wrap">
        <Link href="/user/update-user-info">
          <span className="px-2 py-1 dark:bg-neutral-600 border-r-1 border-neutral-500">
            Edit Profile
          </span>
        </Link>
        <Link href="/user/membership">
          <span className="px-2 py-1 dark:bg-neutral-600 border-r-1 border-neutral-500">
            Membership
          </span>
        </Link>
        <Link href="/user/add-recipe">
          <span className="px-2 py-1 dark:bg-neutral-600 border-r-1 border-neutral-500">
            Add Recipe
          </span>
        </Link>
        <Link href="/user/update-recipe">
          <span className="px-2 py-1 dark:bg-neutral-600 border-r-1 border-neutral-500">
            Update Recipe
          </span>
        </Link>
        <Link href="/user/change-password">
          <span className="px-2 py-1 dark:bg-neutral-600">Change Password</span>
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
