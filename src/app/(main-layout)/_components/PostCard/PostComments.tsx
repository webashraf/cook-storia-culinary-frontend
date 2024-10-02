"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineDislike, AiOutlineLike } from "react-icons/ai";
import { IoPaperPlaneOutline } from "react-icons/io5";

import PostModal from "./postModal";

import { nexiosInstance } from "@/src/config/axios.instance";
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

  // //console.log(commentsData);
  const handleLike = async () => {
    const opinions: IOpinions = {
      postId,
      userId,
      upVote: 1,
    };

    try {
      const { data } = await nexiosInstance.post(
        "/user-opinion/create",
        opinions,
      );

      //console.log("Like response:", data);
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
        opinions,
      );

      //console.log("Dislike response:", data);
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
          opinions,
        );

        //console.log("Comment response:", response.data);
        reset();
        setCommentsData(await fetchComments(postId)); // Refetch comments after submitting
      } catch (err) {
        console.error("Error submitting comment:", err);
      }
    } else {
      //console.log("Comment cannot be empty!");
    }
  };

  return (
    <div>
      <div className="flex items-center gap-3">
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
                0,
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
                0,
              )}
            </span>
          </Button>
        </div>
        <p className="text-[12px]">Ratings: ⭐⭐⭐⭐⭐</p>
      </div>
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
      <PostModal postId={postId} />
      <div />
    </div>
  );
};

export default PostComments;
