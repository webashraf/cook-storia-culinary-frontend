"use client";

import { Accordion, AccordionItem } from "@nextui-org/accordion";
import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LuPencil } from "react-icons/lu";
import { toast } from "sonner";

import nexiosInstance from "@/src/config/nexios.instance";
import { getCurrentUser } from "@/src/services/AuthService";
import { fetchComments } from "@/src/services/RecipeService";
import { IOpinions } from "@/src/types";
import "./userComments.css";

export default function UserComments({
  postId,
  userId,
  commentsData,
  setCommentsData,
}: any) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [editState, setEditState] = useState<{ [key: string]: boolean }>({});
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  const refetchComments = async () => {
    try {
      const updatedComments = await fetchComments(postId);

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

        setLoading(true);
      } catch (err: any) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchAndSetComments();
  }, [postId, loading]);

  return (
    <Accordion style={{ padding: 0 }}>
      <AccordionItem
        key="1sdf"
        aria-label="see-comments"
        title={
          <div className="text-[#9acd32] space-x-1 text-sm">
            <span>See Comments</span>
            <span>
              {commentsData?.data?.filter(
                (comment: any) => comment.comments !== ""
              ).length || 0}
            </span>
          </div>
        }
      >
        <Accordion selectionMode="multiple" style={{ padding: 0 }}>
          {commentsData?.data
            ?.filter((comment: any) => comment.comments)
            .map((comment: any) => (
              <AccordionItem
                key={comment?._id}
                aria-label={comment?.userId?._id}
                startContent={
                  <Avatar
                    isBordered
                    color="primary"
                    radius="lg"
                    size="sm"
                    src={comment?.userId?.profilePicture}
                  />
                }
                subtitle={moment(comment.createdAt).format("MMM YYYY  h:mm a")}
                title={comment?.userId?.username}
              >
                {comment.comments && (
                  <div className="flex flex-col items-start gap-2 pb-2 -mt-2">
                    <div className="flex items-center gap-4 w-full">
                      {comment?.userId?.email !== currentUser?.email ? (
                        <div className="w-full pt-1 block">
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
                              className=" text-blue-600"
                              color="default"
                              defaultValue={comment.comments}
                              radius="none"
                              size="sm"
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
                                    onClick={() => handleEditClick(comment._id)}
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
              </AccordionItem>
            ))}
        </Accordion>
      </AccordionItem>
    </Accordion>
  );
}
