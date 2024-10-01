// src/components/ProfileInfo.js

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";

const ProfileInfo = () => {
  return (
    <div className=" p-4 border-b border-gray-300 dark:border-gray-700">
      <p className="text-gray-600 dark:text-gray-300">
        Turning Ingredients into Culinary Art
      </p>
      <p className="text-blue-500 dark:text-blue-300 mt-2">www.example.com</p>
      <div className="w-full flex ">
        <Link href="/">
          <Button radius="none">Edit Profile</Button>
        </Link>
        <Link href="/">
          <Button radius="none">Followers</Button>
        </Link>
        <Link href="/">
          <Button radius="none">Following</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileInfo;
