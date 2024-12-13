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

        formData.append("image", file);
        formData.append("data", JSON.stringify({ user: user?.id }));
        try {
          setIsUploading(true);
          const response = await fetch(
            `https://cook-storia-culinary-backend-project.vercel.app/api/v1/story/create`,
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
      <div className="w-full h-full flex items-center">
        <div className="relative px-5 mx-5 h-full min-w-[150px] min-h-[150px] max-h-[150px] max-w-[150px] rounded-full border-2 border-slate-200 bg-default-50 flex justify-center items-center shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          <div className="absolute flex flex-col items-center">
            <Image
              alt="File Icon"
              className="mb-3"
              height={70}
              src="https://res.cloudinary.com/da5dhxzen/image/upload/v1731992298/image-_ctitmd.png"
              width={70}
            />
            <span className="block text-gray-500 font-semibold">
              {/* {isUploading ? "Uploading..." : "Drag & drop your files here"}
            </span>
            <span className="block text-gray-400 font-normal mt-1">
              {isUploading ? "" : "or click to upload"} */}
              {/* upload your image here */}
            </span>
          </div>
          <input
            className="h-full w-full bg-red-500 opacity-0 cursor-pointer relative z-10"
            type="file"
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AddStory;
