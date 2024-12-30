"use client";

import { Image } from "@nextui-org/image";

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
        <ModalTrigger className="w-full flex items-center ">
          <Image
            alt="User Avatar"
            className="w-12 h-12 rounded-full"
            src={user?.photo}
          />
          <input
            className="ml-4 flex-1 dark:bg-neutral-700 bg-neutral-100 rounded-full px-4 py-2 text-gray-700 outline-none"
            placeholder={`What's recipe on your mind today, ${user?.name}?`}
            type="text"
          />
        </ModalTrigger>

        <ModalBody>
          <ModalContent className="p-4 bg-neutral-950 rounded-lg shadow-lg">
            <CreateRecipe />
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
}
