"use client";

import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { toast } from "sonner";

import nexiosInstance from "@/src/config/nexios.instance";
import { useUser } from "@/src/context/user.provider";
import { fetchComments } from "@/src/services/RecipeService";
import { IOpinions } from "@/src/types";

import PostShare from "./PostShare";

interface IProps {
  postId: string;
  isPremium: boolean;
}
const VotingViewRecipe = ({ postId, isPremium }: IProps) => {
  const [commentsData, setCommentsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [refetching, setRefetching] = useState(false);
  const { user: currentUser } = useUser();
  const [isDisabledUpVote, setIsDisabledUpVote] = useState(false);
  const [isDisabledDownVote, setIsDisabledDownVote] = useState(false);

  useEffect(() => {
    const fetchAndSetComments = async () => {
      setLoading(true);
      try {
        const fetchedComments = await fetchComments(postId);

        setCommentsData(fetchedComments);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetComments();
  }, [postId, refetching]);

  const handleLike = async () => {
    const opinions: IOpinions = {
      postId,
      userId: currentUser?.id as string,
      upVote: 1,
    };

    try {
      const { data }: any = await nexiosInstance.post(
        "/user-opinion/create",
        opinions
      );

      if (data?.success) {
        const updatedComments = await fetchComments(postId);

        setCommentsData(updatedComments);
        setIsDisabledDownVote(false);
        setIsDisabledUpVote(true);

        toast.success("UpVoted");
      }
    } catch (err: any) {
      toast.error("Error", err?.message);
    }
  };

  const handleDislike = async () => {
    const opinions: IOpinions = {
      postId,
      userId: currentUser?.id as string,
      downVote: 1,
    };

    try {
      const { data }: any = await nexiosInstance.post(
        "/user-opinion/create",
        opinions
      );

      if (data?.success) {
        setRefetching(!refetching);
        setIsDisabledUpVote(false);
        setIsDisabledDownVote(true);
        toast.success("downVoted");
      }
      setCommentsData(await fetchComments(postId));
    } catch (err: any) {
      toast.error("Error", err?.message);
    }
  };

  if (!currentUser) {
    return (
      <div className="mt-5">
        <Link href="/login">Login</Link> to see for info
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center gap-3 w-full">
        <div className="flex justify-between bg-default-40 gap-2 py-2 rounded-xl w-[110px]">
          <Button
            className={`text-sm flex w-[50%] gap-1 transition ease-in-out duration-300 transform hover:scale-110  ${
              isDisabledUpVote ||
              commentsData?.data?.find(
                (comment: any) =>
                  comment?.userId?._id === currentUser?.id &&
                  comment?.upVote === 1
              )
                ? "bg-[#7ba724]"
                : ""
            }`}
            disabled={
              loading ||
              isDisabledUpVote ||
              commentsData?.data?.find(
                (comment: any) =>
                  comment?.userId?._id === currentUser?.id &&
                  comment?.upVote === 1
              )
                ? true
                : false
            }
            isIconOnly={true}
            size="sm"
            onPress={handleLike}
          >
            <AiOutlineLike size={18} />
            <span className="text-[12px]">
              {commentsData?.data?.reduce(
                (total: number, comment: any) => total + (comment?.upVote || 0),
                0
              )}
            </span>
          </Button>

          <Button
            className={`text-sm flex w-[50%] gap-1 transition ease-in-out duration-300 transform hover:scale-110 ${
              loading ||
              isDisabledDownVote ||
              (commentsData?.data?.find(
                (comment: any) =>
                  comment?.userId?._id === currentUser?.id &&
                  comment?.downVote === 1
              ) &&
                "pointer-events-none")
            }`}
            color={
              isDisabledDownVote ||
              commentsData?.data?.find(
                (comment: any) =>
                  comment?.userId?._id === currentUser?.id &&
                  comment?.downVote === 1
              )
                ? "danger"
                : "default"
            }
            disabled={
              loading ||
              isDisabledDownVote ||
              (commentsData?.data?.find(
                (comment: any) =>
                  comment?.userId?._id === currentUser?.id &&
                  comment?.downVote === 1
              ) &&
                true)
            }
            isIconOnly={true}
            size="sm"
            onPress={handleDislike}
          >
            <AiOutlineDislike size={18} />
            <span className="text-[12px]">
              {commentsData?.data?.reduce(
                (total: number, comment: any) =>
                  total + (comment?.downVote || 0),
                0
              )}
            </span>
          </Button>
        </div>

        {currentUser?.isPremium ? (
          <Link
            className="text-default-900/70 w-full"
            href={`/recipe-feed/${postId}`}
          >
            <Button
              fullWidth
              className="flex transition ease-in-out duration-300 transform "
              size="sm"
              variant="faded"
            >
              View Full Recipe
            </Button>
          </Link>
        ) : (
          <div className="w-full">
            {currentUser && currentUser?.role ? (
              <>
                {isPremium ? (
                  <Link
                    className="text-white/90 font-medium tracking-wide uppercase w-full"
                    href="/user/membership"
                  >
                    <Button
                      fullWidth
                      className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white font-bold border border-yellow-500 hover:from-yellow-500 hover:to-yellow-700 rounded-lg shadow-md hover:shadow-xl shadow-yellow-400/50 hover:scale-105 transform transition-all duration-300 ease-in-out"
                      color="warning"
                      size="sm"
                      variant="faded"
                    >
                      Get Membership
                    </Button>
                  </Link>
                ) : (
                  <Link
                    className="text-default-900/70 w-full"
                    href={`/recipe-feed/${postId}`}
                  >
                    <Button
                      fullWidth
                      className="flex transition ease-in-out duration-300 transform"
                      size="sm"
                      variant="faded"
                    >
                      View Full Recipe
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              <Button fullWidth size="sm" variant="faded">
                <Link className="text-white/70" href={`/login`}>
                  Login to view recipe
                </Link>
              </Button>
            )}
          </div>
        )}
        <PostShare id={postId} />
      </div>
    </div>
  );
};

export default VotingViewRecipe;
