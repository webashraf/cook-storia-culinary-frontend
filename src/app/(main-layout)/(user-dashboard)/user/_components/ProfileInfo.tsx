// src/components/userInfo.js

import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
const ProfileInfo = () => {
  return (
    <div className=" p-4 pl-0 pb-0 border-b border-gray-300 dark:border-gray-700">
      <p className="text-gray-600 dark:text-gray-300 mb-5">
        Turning Ingredients into Culinary Art
      </p>

      <div className="w-full flex ">
        <Link href="/">
          <Button radius="none">Edit Profile</Button>
        </Link>
        <Link href="/user/membership">
          <Button radius="none">Membership</Button>
        </Link>
        <Link href="/user/add-recipe">
          <Button radius="none">Add Recipe</Button>
        </Link>
        <Link href="/user/change-password">
          <Button radius="none">Change Password</Button>
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