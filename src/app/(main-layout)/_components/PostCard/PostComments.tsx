"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { toast } from "sonner";

import nexiosInstance from "@/src/config/nexios.instance";
import { useUser } from "@/src/context/user.provider";
import { fetchComments } from "@/src/services/RecipeService";

import PostModal from "./postModal";

export interface IOpinions {
  _id?: string;
  postId: string;
  userId: string;
  comments?: string;
  rate?: number;
  upVote?: number;
  downVote?: number;
  createdAt?: string;
}

interface IProps {
  postId: string;
  userId: string;
  isPremium: boolean;
  isProUser: boolean;
  recipe: any;
}

const PostComments = ({
  postId,
  userId,
  isPremium,
  isProUser,
  recipe,
}: IProps) => {
  const [commentsData, setCommentsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
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

  const onSubmit = async (data: any) => {
    if (data.comment.trim()) {
      const opinions: IOpinions = {
        postId,
        userId: currentUser?.id as string,
        comments: data.comment,
      };

      try {
        const { data }: any = await nexiosInstance.post(
          "/user-opinion/create",
          opinions
        );

        if (data.success) {
          reset();
          const updatedComments = await fetchComments(postId);

          setCommentsData(updatedComments);
          toast.success("Comment created successfully");
        } else {
          toast.error("Failed to comment");
        }
      } catch (err) {
        console.error("Error submitting comment:", err);
      }
    }
  };

  const calculateAverageRating = () => {
    if (
      !commentsData ||
      !commentsData?.data ||
      commentsData?.data.length === 0
    ) {
      return 0;
    }

    const totalRatings = commentsData?.data.reduce(
      (total: number, comment: any) => total + (comment?.rate || 0),
      0
    );

    const ratingsCount = commentsData?.data.filter(
      (comment: any) => comment?.rate
    ).length;

    return ratingsCount > 0 ? (totalRatings / ratingsCount).toFixed(1) : 0;
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
      <p className="text-[12px] mt-1">
        Average Rating: {calculateAverageRating()} ⭐
      </p>
      <form
        className="flex w-full gap-2 pt-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          className="w-[100%]"
          placeholder="Drop your comment"
          type="text"
          width={"100%"}
          {...register("comment", { required: true })}
        />

        <Button
          className="p-1 flex transition ease-in-out duration-300 transform hover:scale-110"
          color="primary"
          disabled={loading}
          type="submit"
        >
          <IoPaperPlaneOutline size={20} />
        </Button>
      </form>
      <PostModal
        commentsData={commentsData}
        postId={postId}
        setCommentsData={setCommentsData}
        userId={currentUser?.id}
      />
      <div />
      <div className="flex items-center gap-3 w-full">
        <div className="flex justify-between bg-default-40 gap-2 py-2 rounded-xl w-[100px]">
          <Button
            className="text-sm flex w-[50%] gap-1 transition ease-in-out duration-300 transform hover:scale-110"
            color={
              isDisabledUpVote ||
              commentsData?.data?.find(
                (comment: any) =>
                  comment?.userId?._id === currentUser?.id &&
                  comment?.upVote === 1
              )
                ? "primary"
                : "default"
            }
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
          <Button
            fullWidth
            className="flex transition ease-in-out duration-300 transform "
            size="sm"
            variant="faded"
          >
            <Link
              className="text-default-900/70 "
              href={`/recipe-feed/${postId}`}
            >
              View Full Recipe
            </Link>
          </Button>
        ) : (
          <div className="w-full">
            {currentUser && currentUser?.role ? (
              <>
                {isPremium ? (
                  <Button
                    fullWidth
                    className="bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 text-white font-bold border border-yellow-500 hover:from-yellow-500 hover:to-yellow-700 rounded-lg shadow-md hover:shadow-xl shadow-yellow-400/50 hover:scale-105 transform transition-all duration-300 ease-in-out"
                    color="warning"
                    size="sm"
                    variant="faded"
                  >
                    <Link
                      className="text-white/90 font-medium tracking-wide uppercase"
                      href="/user/membership"
                    >
                      Get Membership
                    </Link>
                  </Button>
                ) : (
                  <Button
                    fullWidth
                    className="flex transition ease-in-out duration-300 transform"
                    size="sm"
                    variant="faded"
                  >
                    <Link
                      className="text-default-900/70 "
                      href={`/recipe-feed/${postId}`}
                    >
                      View Full Recipe
                    </Link>
                  </Button>
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
      </div>
    </div>
  );
};

export default PostComments;
