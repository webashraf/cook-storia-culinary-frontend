"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { toast } from "sonner";

import PostModal from "./postModal";

import { nexiosInstance } from "@/src/config/axios.instance";
import { getCurrentUser } from "@/src/services/AuthService";
import { fetchComments } from "@/src/services/RecipeService";

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
}

const PostComments = ({ postId, userId }: IProps) => {
  const [commentsData, setCommentsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [currentUser, setCurrentUser] = useState<any>(null);

  console.log({ currentUser });
  useEffect(() => {
    const fetchAndSetComments = async () => {
      setLoading(true);
      try {
        const loggedInUser = await getCurrentUser();

        setCurrentUser(loggedInUser);

        const fetchedComments = await fetchComments(postId);

        setCommentsData(fetchedComments);
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAndSetComments();
  }, [postId]);

  const handleLike = async () => {
    const opinions: IOpinions = {
      postId,
      userId: currentUser?.id,
      upVote: 1,
    };

    try {
      const { data } = await nexiosInstance.post(
        "/user-opinion/create",
        opinions
      );

      setCommentsData(await fetchComments(postId));
    } catch (err) {
      console.error("Error liking the post:", err);
    }
  };

  const handleDislike = async () => {
    const opinions: IOpinions = {
      postId,
      userId: currentUser?.id,
      downVote: 1,
    };

    try {
      const { data } = await nexiosInstance.post(
        "/user-opinion/create",
        opinions
      );

      setCommentsData(await fetchComments(postId)); // Refetch comments after disliking
    } catch (err) {
      console.error("Error disliking the post:", err);
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
        console.log(data);
        setCommentsData(await fetchComments(postId)); // Refetch comments
        if (!data.success) {
          toast.error("Failed to comment");
        } else {
          toast.success("Comment created successfully");
        }
      } catch (err) {
        console.error("Error submitting comment:", err);
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
      <p className="text-[12px]">
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
      <PostModal postId={postId} userId={userId} />
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
                (total: number, comment: any) => total + (comment?.upVote || 0),
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
        <Button fullWidth size="sm" variant="faded">
          View Full Recipe
        </Button>
      </div>
    </div>
  );
};

export default PostComments;
