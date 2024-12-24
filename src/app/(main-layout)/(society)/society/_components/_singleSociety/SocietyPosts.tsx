/* eslint-disable jsx-a11y/alt-text */
"use client";

import { Button } from "@nextui-org/button";
import { Image } from "@nextui-org/image";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useEffect, useState } from "react";
import { AiOutlineDislike } from "react-icons/ai";
import { BsSendFill } from "react-icons/bs";
import { FaCommentMedical, FaShare } from "react-icons/fa6";
import { LuHeartHandshake } from "react-icons/lu";

import { getSocietyPost } from "@/src/services/SocietyPostService";

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
              <div className="w-[95%] mx-auto">
                <div className="flex items-center gap-3 mt-3">
                  <Link href={`/user/${post?.userId?.userId?._id}`}>
                    <Image
                      className="size-9 border-2 border-neutral-600"
                      src={post?.userId?.userId?.profilePicture}
                    />
                  </Link>
                  <div>
                    <Link href={`/user/${post?.userId?.userId?._id}`}>
                      <h4 className="capitalize hover:underline text-white">
                        {post?.userId?.userId?.username}
                      </h4>
                    </Link>
                    <p className="text-[12px]">Nice post</p>
                  </div>
                </div>

                <div className="flex mt-4 gap-2 items-center ">
                  <Image
                    className="size-[100px] border-2 border-neutral-500 "
                    height={35}
                    src="https://img.freepik.com/free-psd/3d-illustration-human-avatar-profile_23-2150671122.jpg?t=st=1728475368~exp=1728478968~hmac=62789df160b00c4cb25a1e8c632f3fbcb154a5a5b2fdf8fff53037af9967688b&w=740"
                    width={35}
                  />
                  <Input
                    placeholder="Drop your comments"
                    type="text"
                    variant="underlined"
                  />
                  <Button isIconOnly size="sm">
                    <BsSendFill color="#88b72b" size={18} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}
