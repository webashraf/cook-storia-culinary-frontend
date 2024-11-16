/* eslint-disable no-undef */
import { Image } from "@nextui-org/image";
import { useState } from "react";
import { toast } from "sonner";

import { useUser } from "@/src/context/user.provider";

const AddStory = ({ setRefacing }: any) => {
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useUser();

  console.log("user", user?.id, process.env.NEXT_PUBLIC_BASE_API);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (user) {
      if (e.target.files && e.target.files.length > 0) {
        const file = e.target.files[0];
        const formData = new FormData();

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
    <div className="md:flex w-full h-full">
      <div className="w-full h-full">
        <div className="relative h-full min-w-[250px] max-w-[260px] rounded-lg border-2 border-blue-500 bg-gray-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <div className="absolute flex flex-col items-center">
            <Image
              alt="File Icon"
              className="mb-3"
              src="https://img.icons8.com/dusk/64/000000/file.png"
            />
            <span className="block text-gray-500 font-semibold">
              {isUploading ? "Uploading..." : "Drag & drop your files here"}
            </span>
            <span className="block text-gray-400 font-normal mt-1">
              {isUploading ? "" : "or click to upload"}
            </span>
          </div>
          <input
            className="h-full w-full opacity-0 cursor-pointer"
            type="file"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AddStory;
