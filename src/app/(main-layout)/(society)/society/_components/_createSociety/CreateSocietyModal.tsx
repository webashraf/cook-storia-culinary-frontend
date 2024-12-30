import {
  Modal,
  ModalBody,
  ModalContent,
  ModalTrigger,
} from "@/src/components/UI/AnimetedModal";

import CreateSociety from "./CreateSociety";

const CreateSocietyModal = () => {
  return (
    <div className="flex items-center justify-center w-full">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Create A Society
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            🎪
          </div>
        </ModalTrigger>

        <ModalBody>
          <ModalContent className="p-4 dark:bg-neutral-950 rounded-lg shadow-lg">
            <CreateSociety />
          </ModalContent>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default CreateSocietyModal;
