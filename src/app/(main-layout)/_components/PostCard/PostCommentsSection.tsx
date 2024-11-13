"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { toast } from "sonner";

import nexiosInstance from "@/src/config/nexios.instance";
import { useUser } from "@/src/context/user.provider";
import { fetchComments } from "@/src/services/RecipeService";
import { IOpinions } from "@/src/types";

import UserComments from "./UserComments";
import VotingViewRecipe from "./VotingViewRecipe";

interface IProps {
  postId: string;
  userId: string;
  isPremium: boolean;
  isProUser: boolean;
  recipe: any;
}

const PostCommentsSection = ({ postId, isPremium }: IProps) => {
  const [commentsData, setCommentsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const [refetching, setRefetching] = useState(false);
  const { user: currentUser } = useUser();

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
    <div className="relative">
      <p className="text-[12px] mt-1 pt-3">
        Average Rating: {calculateAverageRating()} ⭐
      </p>
      <VotingViewRecipe isPremium={isPremium} postId={postId} />
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
          className="p-1 flex transition ease-in-out duration-300 transform hover:scale-110 bg-[#739a25]"
          disabled={loading}
          type="submit"
        >
          <IoPaperPlaneOutline size={20} />
        </Button>
      </form>

      <div className=" bg-black w-full z-20">
        <UserComments
          commentsData={commentsData}
          postId={postId}
          setCommentsData={setCommentsData}
          userId={currentUser?.id}
        />
      </div>
    </div>
  );
};

export default PostCommentsSection;
