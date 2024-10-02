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

import { IOpinions } from "./PostComments";

import { nexiosInstance } from "@/src/config/axios.instance";
import { getCurrentUser } from "@/src/services/AuthService";
import { fetchComments } from "@/src/services/RecipeService";

export default function PostModal({ postId, userId }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [commentsData, setCommentsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [editState, setEditState] = useState<{ [key: string]: boolean }>({});

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    const fetchAndSetComments = async () => {
      setLoading(true);
      try {
        const loggedInUser = await getCurrentUser();

        setCurrentUser(loggedInUser);
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

  const onSubmit = async (data: any, commentId: string) => {
    const opinions: IOpinions = {
      postId,
      userId,
      comments: data.comments,
    };

    try {
      const res = await nexiosInstance.post("/user-opinion/create", opinions);

      console.log(res);
      // Refetch comments after saving
      const updatedComments = await fetchComments(postId);

      setCommentsData(updatedComments);
      reset();
      setEditState((prev) => ({ ...prev, [commentId]: false }));
    } catch (err) {
      console.error("Error saving the comment:", err);
    }
  };

  const handleEditClick = (commentId: string) => {
    setEditState((prev) => ({ ...prev, [commentId]: true }));
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <button
          className="text-sm text-primary-300 hover:text-primary-400 underline lowercase"
          onClick={onOpen}
        >
          See comments
        </button>
      </div>
      <Modal isOpen={isOpen} size="md" onClose={onClose}>
        <ModalContent>
          <ModalBody className="p-5">
            {commentsData?.data?.map((comment: any) => (
              <div key={comment?._id}>
                {comment.comments && (
                  <div className="flex flex-col items-start gap-2 border-b py-2 border-slate-400/40">
                    <User
                      avatarProps={{
                        src: "https://avatars.githubusercontent.com/u/30373425?v=4",
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
                      name="Junior Garcia"
                    />
                    <div className="flex items-center gap-4 w-full ">
                      {comment?.userId?.email !== currentUser?.email ? (
                        <div>
                          <p className="text-sm">{comment.comments}</p>
                        </div>
                      ) : (
                        ""
                      )}
                      <form
                        onSubmit={handleSubmit((data) =>
                          onSubmit(data, comment._id)
                        )}
                      >
                        {comment?.userId?.email === currentUser?.email && (
                          <div className="w-full flex items-center gap-2">
                            <Input
                              className="w-[80%]"
                              defaultValue={comment.comments}
                              type="text"
                              {...register("comments")}
                              disabled={!editState[comment._id]} // Only enable if in edit mode
                              variant={
                                editState[comment._id] ? "faded" : "flat"
                              }
                            />
                            <div className="flex gap-2 ">
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
              </div>
            ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
