"use client";

import { getCurrentUser } from "@/src/services/AuthService";
import { fetchComments } from "@/src/services/RecipeService";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { User } from "@nextui-org/user";
import moment from "moment";
import { useEffect, useState } from "react";
import { LuPencil } from "react-icons/lu";

export default function PostModal({ postId }: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState<string>("md");
  const [commentsData, setCommentsData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  // Track editable state for each comment
  const [editableComments, setEditableComments] = useState<
    | {
        [key: string]: boolean;
      }
    | any
  >({});

  console.log(commentsData);
  useEffect(() => {
    const fetchAndSetComments = async () => {
      setLoading(true);
      try {
        const logedInUser = await getCurrentUser();
        setCurrentUser(logedInUser);
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

  // Handle edit state toggle
  const handleEdit = (commentId: string) => {
    setEditableComments((prev: any) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  const handleOpen = (size: string) => {
    setSize(size);
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button href="#" onPress={() => handleOpen(size)} variant="faded">
          View Comments
        </Button>
      </div>
      <Modal size="xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Modal Title
              </ModalHeader>
              <ModalBody>
                {commentsData?.data?.map((comment: any) => (
                  <div key={comment?._id}>
                    {comment.comments ? (
                      <div className="flex flex-col items-start gap-2 mb-3">
                        <User
                          name="Junior Garcia"
                          description={
                            <Link
                              href="https://twitter.com/jrgarciadev"
                              size="sm"
                              isExternal
                            >
                              {moment(comment.createdAt).format(
                                "MMM YYYY, h:mm:ss a"
                              )}
                            </Link>
                          }
                          avatarProps={{
                            src: "https://avatars.githubusercontent.com/u/30373425?v=4",
                          }}
                        />
                        <div className="flex items-center gap-4">
                          <Input
                            type="text"
                            defaultValue={comment?.comments}
                            disabled={!editableComments[comment?._id]} // Disable input if not editable
                          />
                          <button
                            className={`flex items-center gap-1 ${currentUser.email !== comment?.userId?.email && "hidden"}`}
                            onClick={() => handleEdit(comment?._id)} // Toggle edit state
                          >
                            <span className="text-sky-500 hover:text-sky-400 underline">
                              {editableComments[comment?._id] ? "save" : "edit"}{" "}
                            </span>
                            <LuPencil className="text-sky-500 hover:text-sky-400" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                ))}
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
