/* eslint-disable no-undef */
import { Image } from "@nextui-org/image";
import { useState } from "react";
import { toast } from "sonner";

import { useUser } from "@/src/context/user.provider";

const AddStory = ({ setRefacing }: any) => {
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useUser();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const formData = new FormData();

        if (file.size / (1024 * 1024) > 8) {
          toast.error("File size exceeds 8MB. Please upload a smaller file.");

          return;
        }

        formData.append("image", file);
        formData.append("data", JSON.stringify({ user: user?.id }));
        try {
          setIsUploading(true);
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/story/create`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (response.ok) {
            toast.success("File uploaded successfully!");
            setRefacing(true);
          } else {
            toast.error("Failed to upload file.");
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          toast.error("An error occurred.");
        } finally {
          setIsUploading(false);
        }
      }
    }
  };

  return (
    <div className="parent-div size-10 flex items-center justify-center bg-white rounded-full transition-transform duration-300 hover:scale-110">
      <div className="absolute flex flex-col items-center">
        <Image
          alt="File Icon"
          className=""
          height={20}
          src="https://res.cloudinary.com/da5dhxzen/image/upload/v1731992298/image-_ctitmd.png"
          width={20}
        />
        <span className="block text-gray-500 font-semibold" />
      </div>
      <input
        className="h-full w-full bg-red-500 opacity-0 cursor-pointer relative z-10"
        type="file"
        onChange={handleFileChange}
      />
    </div>
  );
};

export default AddStory;
