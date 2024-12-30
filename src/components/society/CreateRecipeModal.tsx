"use client";

import Image from "next/image";

import { useUser } from "@/src/context/user.provider";
import { ILogInUser } from "@/src/types/user";

import CreateRecipe from "../Home/Recipe/CreateRecipe";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "../UI/AnimetedModal";

export function CreateRecipeModal() {
  const { user }: ILogInUser | any = useUser();

  return (
    <div className="flex items-center justify-center w-full">
      <Modal>
        <ModalTrigger className="w-full flex items-center gap-2">
          <Image
            alt="User Avatar"
            className="min-size-12 max-size-14 rounded-full"
            height={40}
            src={user?.photo}
            width={40}
          />
          <input
            className="fle w-full dark:bg-neutral-700 bg-neutral-100 rounded-full px-4 py-2 text-gray-700 outline-none"
            placeholder={`What's recipe on your mind today, ${user?.name}?`}
            type="text"
          />
        </ModalTrigger>

        <ModalBody>
          <ModalContent className="p-4 dark:bg-neutral-950 rounded-lg shadow-lg">
            <CreateRecipe />
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
