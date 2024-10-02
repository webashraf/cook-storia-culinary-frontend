import { Avatar } from "@nextui-org/avatar";

const ProfileHeader = () => {
  return (
    <div className="bg-default-100  p-4 border-b border-gray-300 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar
            isBordered
            className="w-20 h-20 text-large"
            radius="sm"
            src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
          />

          <div className="ml-6">
            <h1 className="text-2xl font-bold dark:text-white">Ali Ashraf</h1>
            <div className="flex space-x-4 text-gray-500 dark:text-gray-400 mt-2">
              <span>
                <strong className="font-bold text-black dark:text-white">
                  50
                </strong>{" "}
                posts
              </span>
              <span>
                <strong className="font-bold text-black dark:text-white">
                  300
                </strong>{" "}
                followers
              </span>
              <span>
                <strong className="font-bold text-black dark:text-white">
                  150
                </strong>{" "}
                following
              </span>
            </div>
          </div>
        </div>
        <button className="border border-gray-300 dark:border-gray-600 px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileHeader;
