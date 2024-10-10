"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { toast } from "sonner";

import { nexiosInstance } from "@/src/config/axios.instance";
import { getCurrentUser } from "@/src/services/AuthService";
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
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [refetching, setRefetching] = useState(false);

  useEffect(() => {
    const fetchAndSetComments = async () => {
      setLoading(true);
      try {
        const loggedInUser = await getCurrentUser();

        setCurrentUser(loggedInUser);

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
      userId: currentUser?.id,
      upVote: 1,
    };

    try {
      const { data }: any = await nexiosInstance.post(
        "/user-opinion/create",
        opinions
      );

      if (data?.success) {
        setRefetching(!refetching);
        toast.success("UpVoted");
      }

      setCommentsData(await fetchComments(postId));
    } catch (err: any) {
      toast.error("Error", err?.message);
    }
  };

  const handleDislike = async () => {
    const opinions: IOpinions = {
      postId,
      userId: currentUser?.id,
      downVote: 1,
    };

    try {
      const { data }: any = await nexiosInstance.post(
        "/user-opinion/create",
        opinions
      );

      if (data?.success) {
        setRefetching(!refetching);
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
        userId: currentUser.id,
        comments: data.comment,
      };

      try {
        const { data }: any = await nexiosInstance.post(
          "/user-opinion/create",
          opinions
        );

        reset();
        setCommentsData(await fetchComments(postId));
        if (!data.success) {
          toast.error("Failed to comment");
        } else {
          setRefetching(!refetching);
          toast.success("Comment created successfully");
        }
      } catch (err) {
        // console.error("Error submitting comment:", err);
      }
    }
  };

  // Calculate the average rating
  const calculateAverageRating = () => {
    if (!commentsData || !commentsData.data || commentsData.data.length === 0) {
      return 0;
    }

    const totalRatings = commentsData.data.reduce(
      (total: number, comment: any) => total + (comment?.rate || 0),
      0
    );

    const ratingsCount = commentsData.data.filter(
      (comment: any) => comment?.rate
    ).length;

    return ratingsCount > 0 ? (totalRatings / ratingsCount).toFixed(1) : 0;
  };

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

        <Button className="p-1" disabled={loading} type="submit">
          <IoPaperPlaneOutline size={20} />
        </Button>
      </form>
      <PostModal postId={postId} userId={currentUser?.id} />
      <div />
      <div className="flex items-center gap-3 w-full">
        <div className="flex justify-between bg-default-40 gap-2 py-2 rounded-xl w-[100px]">
          <Button
            className="text-sm flex w-[50%] gap-1"
            disabled={loading}
            isIconOnly={true}
            size="sm"
            onPress={handleLike}
          >
            <AiOutlineLike size={18} />
            <span className="text-[12px]">
              {commentsData?.data?.reduce(
                (total: number, comment: any) => total + (recipe?.upVote || 0),
                0
              )}
            </span>
          </Button>

          <Button
            className="text-sm flex w-[50%] gap-1"
            disabled={loading}
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
          <Button fullWidth size="sm" variant="faded">
            <Link className="text-white/70" href={`/recipe-feed/${postId}`}>
              View Full Recipe
            </Link>
          </Button>
        ) : (
          <div>
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
                  <Button fullWidth size="sm" variant="faded">
                    <Link
                      className="text-white/70"
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
