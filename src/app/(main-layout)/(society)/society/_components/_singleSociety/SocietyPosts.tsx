/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Link } from "@nextui-org/link";
import { useEffect, useState } from "react";
import { AiOutlineDislike } from "react-icons/ai";
import { FaCommentMedical, FaShare } from "react-icons/fa6";
import { LuHeartHandshake } from "react-icons/lu";

import { getSocietyPost } from "@/src/services/SocietyPostService";

import SocietyComment from "../_societyComments/SocietyComment";

export default function SocietyPost({ societyId }: { societyId: string }) {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSocietyPosts = async () => {
      try {
        const result = await getSocietyPost(societyId);

        if (result.success) {
          console.log(result);
          setPosts(result?.data);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load posts.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSocietyPosts();
  }, [societyId]);

  console.log(posts);

  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4">Posts</h3>

      {isLoading ? (
        <p>Loading posts...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : posts.length > 0 ? (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <Link href={`/user/${post?.userId?.userId?._id}`}>
                  <Image
                    className="size-10 border-2 border-neutral-600"
                    src={post?.userId?.userId?.profilePicture}
                  />
                </Link>
                <div>
                  <Link href={`/user/${post?.userId?.userId?._id}`}>
                    <h4 className="capitalize hover:underline text-white">
                      {post?.userId?.userId?.username}
                    </h4>
                  </Link>
                  <h6 className="text-[12px]">
                    {post?.userId?.userId?.isPremium ? "Pro" : "Free"}
                  </h6>
                </div>
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: post.content }}
                className="prose dark:prose-invert"
              />

              {post.imageUrl && (
                <div className=" mt-3 rounded-lg overflow-hidden">
                  <Image
                    alt="Post Image"
                    className="max-w-full"
                    src={post?.imageUrl}
                  />
                </div>
              )}

              {/* Like Dislike */}
              <div className="flex items-center justify-between  mt-3 text-[12px] border-b pb-2 border-neutral-500 ">
                <div className="flex gap-2">
                  <span className="flex items-center gap-1">
                    <Button isIconOnly={true} size="sm">
                      <LuHeartHandshake size={18} />
                    </Button>
                    Appreciate
                  </span>
                  <span className="flex items-center gap-1">
                    <Button isIconOnly={true} size="sm">
                      <AiOutlineDislike size={18} />
                    </Button>
                    Dislike
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
              {/* Comments */}
              <SocietyComment post={post} />
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
