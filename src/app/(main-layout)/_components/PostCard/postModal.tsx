"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from "@nextui-org/modal";
import { User } from "@nextui-org/user";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuPencil } from "react-icons/lu";
import { toast } from "sonner";

import nexiosInstance from "@/src/config/axios.instance";
import { getCurrentUser } from "@/src/services/AuthService";
import { fetchComments } from "@/src/services/RecipeService";

import { IOpinions } from "./PostComments";

export default function PostModal({
  postId,
  userId,
  commentsData,
  setCommentsData,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [editState, setEditState] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const refetchComments = async () => {
    try {
      const updatedComments = await fetchComments(postId);

      console.log("updatedComments", refetchComments);
      setCommentsData(updatedComments);
    } catch (err) {
      console.error("Error fetching updated comments:", err);
    }
  };

  // Handle form submission for new comments
  const onSubmit = async (formData: any, commentId: string) => {
    const opinions: IOpinions = {
      postId,
      userId,
      comments: formData.comments,
    };

    try {
      const { data }: any = await nexiosInstance.post(
        "/user-opinion/create",
        opinions
      );

      if (data.success) {
        setCommentsData((FormData as any)?.comments);
        await refetchComments();
        reset();
        setEditState((prev) => ({ ...prev, [commentId]: false }));
        console.log("first", editState);
        toast.success("Comment updated successfully");
        setLoading(true);
      }
    } catch (err) {
      console.error("Error saving the comment:", err);
    }
  };

  const handleEditClick = (commentId: string) => {
    setEditState((prev) => ({ ...prev, [commentId]: true }));
  };

  useEffect(() => {
    const fetchAndSetComments = async () => {
      try {
        const loggedInUser = await getCurrentUser();

        setCurrentUser(loggedInUser);

        const fetchedComments = await fetchComments(postId);

        setCommentsData(fetchedComments);
        console.log("fetchedComments", fetchedComments);
        console.log("CommentsData", commentsData);
        setLoading(true);
      } catch (err: any) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchAndSetComments();
  }, [postId, loading]);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button
          className="text-sm text-primary-300 hover:text-primary-400 underline lowercase"
          onClick={onOpen}
        >
          See comments (
          {commentsData?.data?.filter((comment: any) => comment.comments !== "")
            .length || 0}
          )
        </button>
      </div>
      <Modal isOpen={isOpen} size="md" onClose={onClose}>
        <ModalContent>
          <ModalBody className="p-5">
            {commentsData?.data
              ?.filter((comment: any) => comment.comments)
              .map((comment: any) => (
                <div key={comment?._id}>
                  {comment.comments && (
                    <div className="flex flex-col items-start gap-2 border-b py-2 border-slate-400/40">
                      <User
                        avatarProps={{
                          src: comment?.userId?.profilePicture,
                        }}
                        description={
                          <Link
                            isExternal
                            href="https://twitter.com/jrgarciadev"
                            size="sm"
                          >
                            {moment(comment.createdAt).format(
                              "MMM YYYY, h:mm:ss a"
                            )}
                          </Link>
                        }
                        name={comment?.userId?.username}
                      />
                      <div className="flex items-center gap-4 w-full">
                        {comment?.userId?.email !== currentUser?.email ? (
                          <div className="bg-default-300/50 p-2 rounded-lg min-w-[70%] block">
                            <p className="text-sm">{comment.comments}</p>
                          </div>
                        ) : (
                          ""
                        )}
                        <form
                          className="w-full"
                          onSubmit={handleSubmit((data) =>
                            onSubmit(data, comment._id)
                          )}
                        >
                          {comment?.userId?.email === currentUser?.email && (
                            <div className="w-full flex items-center gap-2">
                              <Input
                                className="w-[70%]"
                                defaultValue={comment.comments}
                                type="text"
                                {...register("comments")}
                                disabled={!editState[comment._id]}
                                variant={
                                  editState[comment._id] ? "faded" : "flat"
                                }
                              />
                              <div className="flex gap-2">
                                {editState[comment._id] ? (
                                  <Button size="sm" type="submit">
                                    Save
                                  </Button>
                                ) : (
                                  comment?.userId?.email ===
                                    currentUser?.email && (
                                    <button
                                      className="text-primary-400 hover:border-primary-400 underline flex items-center gap-1"
                                      type="button"
                                      onClick={() =>
                                        handleEditClick(comment._id)
                                      }
                                    >
                                      edit
                                      <LuPencil
                                        className="text-primary-500 hover:text-primary-400"
                                        size={10}
                                      />
                                    </button>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                        </form>
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
