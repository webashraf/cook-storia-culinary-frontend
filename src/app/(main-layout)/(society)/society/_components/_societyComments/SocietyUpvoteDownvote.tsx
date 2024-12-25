import { Button } from "@nextui-org/button";
import { useEffect, useState } from "react";
import { AiOutlineDislike } from "react-icons/ai";
import { FaCommentMedical, FaShare } from "react-icons/fa6";
import { LuHeartHandshake } from "react-icons/lu";

import {
  createOrUpdateUpvoteDownvote,
  getSocietyPostVotes,
} from "@/src/services/SocietyPostService";

export interface IUpvoteDownvote {
  postId: string;
  userId: string;
  voteType: "upvote" | "downvote";
}

const SocietyUpvoteDownvote = ({ post }: any) => {
  const [upvotes, setUpvotes] = useState<number>(post?.upvotes || 0);
  const [downvotes, setDownvotes] = useState<number>(post?.downvotes || 0);

  const fetchVotes = async () => {
    try {
      const result = await getSocietyPostVotes(post._id);

      console.log(result.data);
      setUpvotes(result?.data?.upvote?.length);
      setDownvotes(result?.data?.downvote?.length);
    } catch (error) {
      console.error("Error fetching votes:", error);
    }
  };

  const handleVote = async (voteType: "upvote" | "downvote") => {
    if (!post?._id || !post?.userId?._id) return;

    const payload: IUpvoteDownvote = {
      postId: post._id,
      userId: post.userId._id,
      voteType,
    };

    try {
      await createOrUpdateUpvoteDownvote(payload);
      fetchVotes();
    } catch (error) {
      console.error("Error while voting:", error);
    }
  };

  useEffect(() => {
    fetchVotes();
  }, [post._id]);

  return (
    <div className="flex items-center justify-between mt-3 text-[12px] border-b pb-2 border-neutral-500">
      <div className="flex gap-2">
        {/* Upvote button */}
        <span className="flex items-center gap-1">
          <Button
            isIconOnly={true}
            size="sm"
            onClick={() => handleVote("upvote")}
          >
            <LuHeartHandshake size={18} />
          </Button>
          Appreciate {upvotes}
        </span>

        {/* Downvote button */}
        <span className="flex items-center gap-1">
          <Button
            isIconOnly={true}
            size="sm"
            onClick={() => handleVote("downvote")}
          >
            <AiOutlineDislike size={18} />
          </Button>
          Dislike {downvotes}
        </span>
      </div>

      <div className="flex gap-2">
        <span className="flex items-center gap-1">
          <Button isIconOnly={true} size="sm">
            <FaCommentMedical size={18} />
          </Button>
          Comments
        </span>
        <span className="flex items-center gap-1">
          <Button isIconOnly={true} size="sm">
            <FaShare size={18} />
          </Button>
          Share
        </span>
      </div>
    </div>
  );
};

export default SocietyUpvoteDownvote;
