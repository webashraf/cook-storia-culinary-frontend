"use client";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { ScrollShadow } from "@nextui-org/scroll-shadow";

import { useUser } from "@/src/context/user.provider";

import UserCard from "../../../_components/UserCard/UserCard";

export default function FollowersModal({ allFollowers }: any) {
  const { user: currentUser } = useUser();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleOpen = () => {
    onOpen();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <p className="" onClick={() => handleOpen()}>
          <span className="mr-1 font-bold text-black dark:text-white">
            {allFollowers?.data?.followers
              ? allFollowers?.data?.followers?.length
              : 0}
          </span>
          Followers
        </p>
      </div>
      <Modal isOpen={isOpen} size={"sm"} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Followers
              </ModalHeader>
              <ModalBody className="">
                <ScrollShadow
                  hideScrollBar
                  className="wpb-5 max-h-[50vh] overflow-y-scroll"
                >
                  <div className="flex flex-col gap-3 ">
                    {allFollowers?.data?.followers?.map((user: any) => (
                      <div key={user?._id}>
                        {user?._id !== currentUser?.id && (
                          <UserCard logedInUser={currentUser} user={user} />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollShadow>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
