"use client";

import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEdit } from "react-icons/fa";

import nexiosInstance from "@/src/config/nexios.instance";
import { getSingleSociety } from "@/src/services/SocietyServices";

export default function SocietyUpdateModal({
  societyId,
  setLoading,
}: {
  societyId: string;
  setLoading: any;
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const {
    register,
    handleSubmit,
    reset, // Reset form values dynamically
    formState: { errors, isSubmitting },
  } = useForm();

  const [isLoading, setIsLoading] = useState(false); // Loading state for data fetch

  // Fetch society data when the modal opens
  useEffect(() => {
    const fetchSociety = async () => {
      if (!societyId || !isOpen) return;

      setIsLoading(true);
      try {
        const result = await getSingleSociety(societyId);

        console.log("Fetched Society Data:", result);

        if (result?.success) {
          const { societyName, coverImage, description } = result.data;

          // Prefill form with fetched data
          reset({
            societyName: societyName || "",
            coverImage: coverImage || "",
            description: description || "",
          });
        }
      } catch (error) {
        console.error("Error fetching society data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSociety();
  }, [societyId, isOpen, reset]);

  const submitHandler = async (data: any) => {
    console.log("Form Submitted:", data);
    const result = await nexiosInstance.put(
      `/society/update/${societyId}`,
      data
    );

    console.log("Result", result);
    setLoading(true);
  };

  return (
    <>
      <Button isIconOnly size="sm" onPress={onOpen}>
        <FaEdit />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Update Society
              </ModalHeader>
              <ModalBody>
                {isLoading ? (
                  <p>Loading...</p>
                ) : (
                  <form
                    className="flex flex-col gap-5"
                    onSubmit={handleSubmit(submitHandler)}
                  >
                    <Input
                      placeholder="Society name (optional)"
                      type="text"
                      variant="underlined"
                      {...register("societyName")}
                    />
                    <Input
                      placeholder="Cover photo URL (optional)"
                      type="url"
                      variant="underlined"
                      {...register("coverImage", {
                        validate: (value) =>
                          !value || // If the field is empty, it passes
                          /^(https?:\/\/[^\s/$.?#].[^\s]*)$/i.test(value) ||
                          "Enter a valid URL",
                      })}
                      errorMessage={errors.coverImage?.message as any}
                      isInvalid={!!errors.coverImage}
                    />
                    <Textarea
                      label="Description (optional)"
                      labelPlacement="outside"
                      placeholder="Enter your description"
                      variant="underlined"
                      {...register("description")}
                    />
                    <Button isLoading={isSubmitting} type="submit">
                      Submit
                    </Button>
                  </form>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
