"use client";

import { Avatar } from "@nextui-org/avatar";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import nexiosInstance from "@/src/config/axios.instance";
import { useUser } from "@/src/context/user.provider";

const ProfileHeader = () => {
  const { user } = useUser();
  // const [loading, setLoading] = useState(true);
  const [totalRecipes, setTotalRecipes] = useState<number>(0);
  const [myFollowers, setMyFollower] = useState<number>(0);
  const [myFollows, setMyFollows] = useState<number>(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetching user recipes
        const { data: recipeData }: any = await nexiosInstance.get(
          `/recipe?user=${user?.id}`
        );

        if (recipeData?.success) {
          setTotalRecipes(recipeData?.data?.length || 0);
        }

        // Fetching followers count
        const { data: followersData }: any = await nexiosInstance.get(
          `/social/follow/${user?.id}`
        );
        const { data: followersDataForFollow }: any =
          await nexiosInstance.get(`/social/follow`);

        if (followersData?.success) {
          setMyFollower(followersData?.data?.followers?.length || 0);
          let totalFollows = 0;

          // Check if data exists and is an array
          if (
            followersDataForFollow?.data &&
            Array.isArray(followersDataForFollow.data)
          ) {
            followersDataForFollow?.data?.forEach((followersObject: any) => {
              if (Array.isArray(followersObject.followers)) {
                const countInArray = followersObject.followers.filter(
                  (item: any) => item._id === user?.id
                ).length;

                totalFollows += countInArray;
              }
            });
          }

          setMyFollows(totalFollows);
        } else {
          setMyFollower(0);
        }

        // setLoading(false);
      } catch (error: any) {
        toast.error("Error fetching data:", error);
        // setLoading(false);
      }
    };

    if (user) {
      fetchUserData();
    }
  }, [user]);

  return (
    <div className="bg-default-100 p-4 border-b border-gray-300 dark:border-gray-700">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Avatar
            isBordered
            className="w-20 h-20 text-large"
            radius="sm"
            src={`${user?.photo}`}
          />

          <div className="ml-6">
            <div className="flex  items-center gap-2">
              <h1 className="text-2xl font-bold dark:text-white">
                {user?.name}
                {user?.isPremium ? (
                  <span className="ml-2 text-warning inline-block text-[12px] md:text-[14px] font-bold  px-1 shadow-md rounded-sm">
                    Pro
                  </span>
                ) : (
                  <span className="text-sm text-default-400">
                    {user?.role == "user" ? "Basic User" : user?.role}
                  </span>
                )}
              </h1>{" "}
            </div>
            <div className="flex space-x-4 text-gray-500 dark:text-gray-400 mt-2">
              <span>
                <strong className="font-bold text-black dark:text-white">
                  {totalRecipes}
                </strong>{" "}
                posts
              </span>
              <span>
                <strong className="font-bold text-black dark:text-white">
                  {myFollowers}
                </strong>{" "}
                followers
              </span>
              <span>
                <strong className="font-bold text-black dark:text-white">
                  {myFollows}
                </strong>{" "}
                following
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
