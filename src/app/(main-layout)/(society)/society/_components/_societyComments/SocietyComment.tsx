/* eslint-disable jsx-a11y/alt-text */
import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useEffect, useState } from "react";
import { BsSendFill } from "react-icons/bs";

import {
  createSocietyComment,
  getSocietyPostComment,
} from "@/src/services/SocietyPostService";

const SocietyComment = ({ post }: { post: any }) => {
  const [comment, setComment] = useState("");
  const [allComments, setAllComments] = useState<any[]>([]);

  console.log("All comments", allComments);

  useEffect(() => {
    if (post?._id) {
      getComments();
    }
  }, [post?._id]);

  const getComments = async () => {
    try {
      const result: any = await getSocietyPostComment(post?._id);

      console.log(result.data.data);
      setAllComments(result?.data?.data || []);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  console.log(post);

  const handleCommentSubmit = async () => {
    if (!comment.trim()) return;

    const payload = {
      comment,
      postId: post?._id,
      userId: post?.userId?._id,
    };

    try {
      const result = await createSocietyComment(payload);

      console.log("Comment submitted successfully:", result);
      setComment("");
      getComments();
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  return (
    <div className="w-[95%] mx-auto">
      {/* User Info */}
      <div className="flex items-center gap-3 mt-3">
        <Link href={`/user/${post?.userId?.userId?._id}`}>
          <Image
            alt={`${post?.userId?.userId?.username || "User"}'s profile`}
            className="size-9 border-2 border-neutral-600"
            src={
              post?.userId?.userId?.profilePicture ||
              "https://via.placeholder.com/35"
            }
          />
        </Link>
        <div>
          <Link href={`/user/${post?.userId?.userId?._id}`}>
            <h4 className="capitalize hover:underline text-white">
              {post?.userId?.userId?.username || "Unknown User"}
            </h4>
          </Link>
          <p className="text-[12px]">Nice post</p>
        </div>
      </div>

      {/* Comment Input */}
      <div className="flex mt-4 gap-2 items-center">
        <Image
          alt="User avatar"
          className="size-[100px] border-2 border-neutral-500"
          height={35}
          src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?t=st=1728475368~exp=1728478968~hmac=62789df160b00c4cb25a1e8c632f3fbcb154a5a5b2fdf8fff53037af9967688b&w=740"
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

      {/* Comments List */}
      <div className="mt-4">
        {allComments.length > 0 ? (
          allComments.map((comment, index) => (
            <div key={index} className="flex items-center gap-3 mb-3">
              <Image
                alt={`${comment?.userId?.userId?.username || "User"}'s profile`}
                className="size-9 border-2 border-neutral-600"
                height={35}
                src={
                  comment?.userId?.userId?.profilePicture ||
                  "https://via.placeholder.com/35"
                }
                width={35}
              />
              <div>
                <h4 className="capitalize text-white">
                  {comment?.userId?.userId?.username}
                </h4>
                <p className="text-[12px]">
                  {comment?.comment || "No comment"}
                </p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-neutral-400">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default SocietyComment;
