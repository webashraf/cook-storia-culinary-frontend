"use client";

import { nexiosInstance } from "@/src/config/axios.instance";
import { fetchComments } from "@/src/services/RecipeService";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5";
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
}

const PostComments = ({ postId, userId }: IProps) => {
  const [commentsData, setCommentsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchAndSetComments = async () => {
      setLoading(true);
      try {
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

  // console.log(commentsData);
  const handleLike = async () => {
    const opinions: IOpinions = {
      postId,
      userId,
      upVote: 1,
    };
    try {
      const { data } = await nexiosInstance.post(
        "/user-opinion/create",
        opinions
      );
      console.log("Like response:", data);
      setCommentsData(await fetchComments(postId));
    } catch (err) {
      console.error("Error liking the post:", err);
    }
  };

  const handleDislike = async () => {
    const opinions: IOpinions = {
      postId,
      userId,
      downVote: 1,
    };
    try {
      const { data } = await nexiosInstance.post(
        "/user-opinion/create",
        opinions
      );
      console.log("Dislike response:", data);
      setCommentsData(await fetchComments(postId)); // Refetch comments after disliking
    } catch (err) {
      console.error("Error disliking the post:", err);
    }
  };

  const onSubmit = async (data: any) => {
    if (data.comment.trim()) {
      const opinions: IOpinions = {
        postId,
        userId,
        comments: data.comment,
      };
      try {
        const response = await nexiosInstance.post(
          "/user-opinion/create",
          opinions
        );
        console.log("Comment response:", response.data);
        reset();
        setCommentsData(await fetchComments(postId)); // Refetch comments after submitting
      } catch (err) {
        console.error("Error submitting comment:", err);
      }
    } else {
      console.log("Comment cannot be empty!");
    }
  };

  return (
    <div>
      <div>Ratings: ⭐⭐⭐⭐⭐</div>
      <div className="flex justify-between bg-default-40 gap-2 py-2 rounded-xl">
        <Button
          isIconOnly={true}
          size="sm"
          className="text-sm flex w-[50%] gap-1"
          onPress={handleLike}
          disabled={loading}
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
          isIconOnly={true}
          size="sm"
          className="text-sm flex w-[50%] gap-1"
          onPress={handleDislike}
          disabled={loading}
        >
          <AiOutlineDislike size={18} />
          <span className="text-[12px]">
            {commentsData?.data?.reduce(
              (total: number, comment: any) => total + (comment?.downVote || 0),
              0
            )}
          </span>
        </Button>
      </div>

      <form
        className="flex w-full gap-2 py-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type="text"
          width={"100%"}
          className="w-[100%]"
          placeholder="Drop your comment"
          {...register("comment", { required: true })}
        />
        <Button className="p-1" type="submit" disabled={loading}>
          <IoPaperPlaneOutline size={20} />
        </Button>
      </form>
      <PostModal postId={postId} />
      <div></div>
    </div>
  );
};

export default PostComments;
