"use client";

import { Avatar } from "@nextui-org/avatar";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import nexiosInstance from "@/src/config/nexios.instance";
import { useUser } from "@/src/context/user.provider";
import { IUser } from "@/src/types";

import FollowersModal from "./Followers";

type userId =
  | {
      id: string;
    }
  | any;
const ProfileHeader = ({ userId }: userId) => {
  const { user: currentUser } = useUser();
  let user = userId || currentUser;

  const [totalRecipes, setTotalRecipes] = useState<number>(0);
  const [myFollows, setMyFollows] = useState<number>(0);
  const [myFollowers, setMyFollower] = useState<number>(0);
  const [allFollows, setAllFollows] = useState<any>(null);
  const [allFollowers, setSetAllFollowers] = useState<any>(null);
  const [singleUser, setSingleUser] = useState<IUser | any>({});

  console.log("Single User State : ", singleUser);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch single user data
        const { data: singleUser }: any = await nexiosInstance.get(
          `/auth/user/${userId.id}`
        );

        console.log("SINGLE USER :", userId.id, singleUser);
        if (singleUser?.success) {
          setSingleUser(singleUser.data);
        }
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

        const { data: followersDataForFollow }: any = await nexiosInstance.get(
          `/social/follow`
        );

        if (followersData?.success) {
          setSetAllFollowers(followersData);
          setMyFollower(followersData?.data?.followers?.length || 0);
          let totalFollows = 0;

          // Check if data exists and is an array
          if (
            followersDataForFollow?.data &&
            Array.isArray(followersDataForFollow.data)
          ) {
            followersDataForFollow?.data?.forEach((followersObject: any) => {
              if (Array.isArray(followersObject.followers)) {
                const currentUserFollows = followersObject.followers.filter(
                  (item: any) => item._id === user?.id
                );

                totalFollows += currentUserFollows.length;
              }
            });

            let totalFollowsArray: any[] = [];

            followersDataForFollow?.data?.map((followersObject: any) => {
              if (Array.isArray(followersObject.followers)) {
                const currentUserFollows = followersObject.followers.filter(
                  (item: any) => item._id === user?.id && followersObject
                );

                totalFollowsArray = [
                  // ...totalFollowsArray,
                  ...currentUserFollows,
                ]; // Spread and add to the total array
              }
            });

            setAllFollows(totalFollowsArray);
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
            src={`${user?.photo || singleUser?.profilePicture}`}
          />

          <div className="ml-6">
            <div className="flex  items-center gap-2">
              <h1 className="text-2xl font-bold dark:text-white">
                {user?.name || singleUser?.username}
                {user?.isPremium ? (
                  <span className="ml-2 text-warning inline-block text-[12px] md:text-[14px] font-bold  px-1 shadow-md rounded-sm">
                    Pro
                  </span>
                ) : (
                  <span className="text-sm text-default-400">
                    {(user?.role || singleUser?.role) == "user"
                      ? "Basic User"
                      : user?.role || singleUser?.role}
                  </span>
                )}
              </h1>{" "}
            </div>
            <div className="flex space-x-4 text-gray-500 dark:text-gray-400 mt-2">
              <span>
                <strong className="font-bold text-black dark:text-white">
                  {totalRecipes}
                </strong>{" "}
                Total Recipe
              </span>
              <span>
                <FollowersModal allFollowers={allFollowers} />
              </span>
              <span>
                <strong className="font-bold text-black dark:text-white">
                  {myFollows}
                </strong>{" "}
                following
                {/* <FollowModal /> */}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
