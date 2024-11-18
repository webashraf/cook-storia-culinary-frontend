"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Card, CardFooter, CardHeader } from "@nextui-org/card";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import nexiosInstance from "@/src/config/nexios.instance";

export default function UserCard({ user, logedInUser }: any) {
  const [followOfUser, setFollowOfUser] = useState<any[]>([]);
  const [isFollowedUser, setIsFollowedUser] = useState(false);
  const [refetching, setRefetching] = useState(false);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const { data }: any = await nexiosInstance.get(
          `/social/follow/${user?._id}`,
          {
            cache: "no-store",
          }
        );

        if (data.success) {
          setFollowOfUser(data?.data?.followers || []);
        }
      } catch (error) {
        throw new Error("Failed to retrive followers");
      }
    };

    fetchFollowers();
  }, [user._id, refetching]);

  const isFollowed = followOfUser.some(
    (follow: any) => follow?._id === logedInUser?.id
  );

  const followUser = async (userId: string) => {
    try {
      const followOptions = {
        userId,
        followers: logedInUser?.id,
      };
      const { data }: any = await nexiosInstance.post(
        "/social/follow",
        followOptions
      );

      setIsFollowedUser(true);
      if (data?.success) {
        setRefetching(!refetching);
        toast.success("Followed");
        setFollowOfUser((prev) => {
          const newFollowers = data.data || [];

          return Array.isArray(newFollowers)
            ? newFollowers
            : [...prev, logedInUser];
        });
      }
    } catch (error) {
      setIsFollowedUser(false);
      toast.error("Failed to follow user");
    }
  };

  const unfollowUser = async (userId: string) => {
    try {
      const followOptions = {
        followedUserId: logedInUser?.id,
      };
      const { data }: any = await nexiosInstance.post(
        `/social/unfollow/${userId}`,
        followOptions
      );

      setIsFollowedUser(false);
      if (data.success) {
        setRefetching(!refetching);
        toast.success("Successfully unfollow");
        setFollowOfUser((prev) =>
          prev.filter((fUser: any) => fUser.userId !== logedInUser?.id)
        );
      }
    } catch (error) {
      setIsFollowedUser(true);
      toast.error("Failed to unfollow user");
    }
  };

  return (
    <Card className="max-w-[340px]">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar
            isBordered
            radius="full"
            size="md"
            src={user?.profilePicture}
          />
          <div className="flex flex-col gap-1 items-start justify-center">
            <h4 className="text-small font-semibold leading-none text-default-600">
              {user?.username}
            </h4>
          </div>
        </div>
        {isFollowed || isFollowedUser ? (
          <Button
            // color="primary"
            className="bg-[#739a25]"
            radius="full"
            size="sm"
            variant="bordered"
            onClick={() => {
              unfollowUser(user._id);
            }}
          >
            Unfollow
          </Button>
        ) : (
          <Button
            // color="primary"
            className="bg-[#739a25]"
            radius="full"
            size="sm"
            variant="solid"
            onClick={() => {
              followUser(user._id);
            }}
          >
            Follow
          </Button>
        )}
      </CardHeader>

      <CardFooter className="gap-3">
        <div className="flex gap-3">
          <p className="font-semibold text-default-400 text-small">
            {followOfUser.length}
          </p>
          <p className="text-default-400 text-small">Followers</p>
        </div>
      </CardFooter>
    </Card>
  );
}
