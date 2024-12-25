/* eslint-disable jsx-a11y/alt-text */
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { useEffect, useState } from "react";
import { BsSendFill } from "react-icons/bs";

import {
  createSocietyComment,
  getSocietyPostComment,
} from "@/src/services/SocietyPostService";

const SocietyComment = ({ post }: { post: any }) => {
  const [comment, setComment] = useState("");
  const [reply, setReply] = useState("");
  const [nestedReply, setNestedReply] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [nestedReplyTo, setNestedReplyTo] = useState<string | null>(null);
  const [allComments, setAllComments] = useState<any[]>([]);
  const [replies, setReplies] = useState<Record<string, any[]>>({});
  const [nestedReplies, setNestedReplies] = useState<Record<string, any[]>>({});

  useEffect(() => {
    if (post?._id) {
      getComments();
    }
  }, [post?._id]);

  const getComments = async () => {
    try {
      const result: any = await getSocietyPostComment(
        post?._id,
        "&limit=3&page=1"
      );

      console.log(result.data.data);
      setAllComments(result?.data?.data?.comments || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const getReplies = async (parentCommentId: string) => {
    console.log("ParentCommentId: ", parentCommentId);
    try {
      const result: any = await getSocietyPostComment(
        parentCommentId,
        "&limit=2&page=1"
      );

      console.log("Replies", result.data.data);
      setReplies((prev) => ({
        ...prev,
        [parentCommentId]: result?.data?.data?.comments || [],
      }));
    } catch (error) {
      console.error(
        `Error fetching replies for comment ${parentCommentId}:`,
        error
      );
    }
  };

  const getNestedReplies = async (parentReplyId: string) => {
    console.log("ParentReplyId: ", parentReplyId);
    try {
      const result: any = await getSocietyPostComment(parentReplyId, "");

      console.log("Nested Replies", result.data.data);
      setNestedReplies((prev) => ({
        ...prev,
        [parentReplyId]: result?.data?.data?.comments || [],
      }));
    } catch (error) {
      console.error(
        `Error fetching nested replies for reply ${parentReplyId}:`,
        error
      );
    }
  };

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    const payload = {
      comment,
      postId: post?._id,
      userId: post?.userId?._id,
    };

    try {
      await createSocietyComment(payload);
      setComment("");
      getComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const handleReplySubmit = async (parentCommentId: string) => {
    if (!reply.trim()) return;

    const payload = {
      comment: reply,
      postId: parentCommentId,
      userId: post?.userId?._id,
    };

    try {
      await createSocietyComment(payload);
      setReply("");
      setReplyTo(null);
      getReplies(parentCommentId);
    } catch (error) {
      console.error("Error submitting reply:", error);
    }
  };

  const handleNestedReplySubmit = async (parentReplyId: string) => {
    if (!nestedReply.trim()) return;

    const payload = {
      comment: nestedReply,
      postId: parentReplyId,
      userId: post?.userId?._id,
    };

    try {
      await createSocietyComment(payload);
      setNestedReply("");
      setNestedReplyTo(null);
      getNestedReplies(parentReplyId);
    } catch (error) {
      console.error("Error submitting nested reply:", error);
    }
  };

  return (
    <div className="w-[95%] mx-auto">
      {/* Display Total Comments */}
      <h3 className="text-neutral-400">
        {allComments.length} {allComments.length === 1 ? "Comment" : "Comments"}
      </h3>
      {/* Comments List */}
      <div className="mt-4">
        {allComments.length > 0 ? (
          allComments.map((comment, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 mb-3 border-l-1 pl-3 border-neutral-600"
            >
              <div className="flex items-start gap-3">
                <Image
                  alt={`${
                    comment?.userId?.userId?.username || "User"
                  }'s profile`}
                  className="size-9 border-2 border-neutral-600"
                  height={35}
                  src={
                    comment?.userId?.userId?.profilePicture ||
                    "https://via.placeholder.com/35"
                  }
                  width={35}
                />
                <div>
                  <h4 className="capitalize text-white text-sm">
                    {comment?.userId?.userId?.username}
                  </h4>
                  <p className="text-[12px]">{comment?.comment}</p>

                  <button
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => {
                      if (replyTo === comment?._id) {
                        setReplyTo(null);
                      } else {
                        setReplyTo(comment?._id);
                        if (!replies[comment?._id]) {
                          getReplies(comment?._id);
                        }
                      }
                    }}
                  >
                    {replies[comment?._id]?.length || ""}
                    {replies[comment?._id]?.length === 1
                      ? " Reply"
                      : " Replies"}
                  </button>
                </div>
              </div>
              {/* Reply Input */}
              {replyTo === comment?._id && (
                <div className="flex items-center gap-2 mt-2 ml-10">
                  <Input
                    placeholder="Write your reply..."
                    type="text"
                    value={reply}
                    variant="underlined"
                    onChange={(e) => setReply(e.target.value)}
                  />
                  <Button
                    isIconOnly
                    size="sm"
                    onPress={() => handleReplySubmit(comment?._id)}
                  >
                    <BsSendFill color="#88b72b" size={18} />
                  </Button>
                </div>
              )}
              {/* Display Replies */}
              {replies[comment?._id]?.map((reply, replyIndex) => (
                <div
                  key={replyIndex}
                  className="flex flex-col gap-3 ml-10 mt-2 border-l-1 pl-3 border-neutral-600"
                >
                  <div className="flex items-start gap-3">
                    <Image
                      alt={`${
                        reply?.userId?.userId?.username || "User"
                      }'s profile`}
                      className="size-9 border-2 border-neutral-600"
                      height={30}
                      src={
                        reply?.userId?.userId?.profilePicture ||
                        "https://via.placeholder.com/30"
                      }
                      width={30}
                    />
                    <div>
                      <h4 className="capitalize text-neutral-300 text-sm">
                        {reply?.userId?.userId?.username}
                      </h4>
                      <p className="text-[12px]">
                        {reply?.comment || "No reply"}
                      </p>
                      <p className="text-[12px] text-neutral-400" />
                      <button
                        className="text-sm text-blue-600 hover:underline"
                        onClick={() => {
                          if (nestedReplyTo === reply?._id) {
                            setNestedReplyTo(null);
                          } else {
                            setNestedReplyTo(reply?._id);
                            if (!nestedReplies[reply?._id]) {
                              getNestedReplies(reply?._id);
                            }
                          }
                        }}
                      >
                        {nestedReplies[reply?._id]?.length || ""}
                        {nestedReplies[reply?._id]?.length === 1
                          ? " Reply"
                          : " Replies"}
                      </button>
                    </div>
                  </div>
                  {/* Nested Reply Input */}
                  {nestedReplyTo === reply?._id && (
                    <div className="flex items-center gap-2 mt-2 ml-10">
                      <Input
                        placeholder="Write your nested reply..."
                        type="text"
                        value={nestedReply}
                        variant="underlined"
                        onChange={(e) => setNestedReply(e.target.value)}
                      />
                      <Button
                        isIconOnly
                        size="sm"
                        onPress={() => handleNestedReplySubmit(reply?._id)}
                      >
                        <BsSendFill color="#88b72b" size={18} />
                      </Button>
                    </div>
                  )}
                  {/* Display Nested Replies */}
                  {nestedReplies[reply?._id]?.map(
                    (nestedReply, nestedReplyIndex) => (
                      <div
                        key={nestedReplyIndex}
                        className="flex items-start gap-3 ml-10 mt-2 border-l-1 pl-3 border-neutral-600"
                      >
                        <Image
                          alt={`${
                            nestedReply?.userId?.userId?.username || "User"
                          }'s profile`}
                          className="size-9 border-2 border-neutral-600"
                          height={30}
                          src={
                            nestedReply?.userId?.userId?.profilePicture ||
                            "https://via.placeholder.com/30"
                          }
                          width={30}
                        />
                        <div>
                          <h4 className="capitalize text-neutral-300">
                            {nestedReply?.userId?.userId?.username}
                          </h4>
                          <p className="text-[12px]">
                            {nestedReply?.comment || "No nested reply"}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              ))}
            </div>
          ))
        ) : (
          <p className="text-neutral-400">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
      {/* Comment Input */}
      <div className="flex mt-4 gap-2 items-center">
        <Image
          alt="User avatar"
          className="size-[100px] border-2 border-neutral-500"
          height={35}
          src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg"
          width={35}
        />
        <Input
          placeholder="Drop your comments"
          type="text"
          value={comment}
          variant="underlined"
          onChange={(e) => setComment(e.target.value)}
        />
        <Button isIconOnly size="sm" onPress={handleCommentSubmit}>
          <BsSendFill color="#88b72b" size={18} />
        </Button>
      </div>
    </div>
  );
};

export default SocietyComment;
