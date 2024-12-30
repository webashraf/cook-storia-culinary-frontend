/* eslint-disable no-undef */
"use client";
import { Image } from "@nextui-org/image";
import { useState } from "react";
import ReactQuill from "react-quill";

import { toolbarOptions } from "@/src/constent/toolbarOptions.quil";

import "react-quill/dist/quill.snow.css";
import { toast } from "sonner";

export default function CreateSocietyPost({
  societyId,
  currentSocietyMember,
}: {
  societyId: string;
  currentSocietyMember: any;
}) {
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleContentChange = (value: string) => {
    setPostContent(value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];

    if (file?.size / (1024 * 1024) > 8) {
      toast.error("Image size exceeds 8MB. Please upload a smaller file.");

      return;
    }
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!postContent && !image) {
      alert("Please provide content or upload an image.");

      return;
    }

    setIsLoading(true);
    const formData = new FormData();

    const postData = {
      societyId,
      userId: currentSocietyMember?._id,
      content: postContent,
    };

    formData.append("data", JSON.stringify(postData));

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/society-post/create`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to submit post.");
      }

      const responseData = await response.json();

      toast.success("Post submitted successfully!");
      window.location.reload();
      // Reset inputs
      setPostContent("");
      setImage(null);
      setPreviewImage(null);
    } catch (error) {
      console.error("Submission failed:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const modules = {
    toolbar: toolbarOptions,
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "header",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
  ];

  return (
    <div className="p-4 dark:bg-neutral-950 rounded-lg shadow-lg">
      <p className="text-white text-lg font-semibold">Create a Post</p>
      <ReactQuill
        className="mt-4 rounded-lg overflow-hidden"
        formats={formats}
        modules={modules}
        theme="snow"
        value={postContent}
        onChange={handleContentChange}
      />
      <div className="flex justify-between items-center mt-4 gap-4">
        <div className="parent-div size-10 flex items-center justify-center transition-transform duration-300 hover:scale-110 relative">
          <div className="absolute flex flex-col items-center">
            <Image
              alt="File Icon"
              height={30}
              src="https://res.cloudinary.com/dyalzfwd4/image/upload/v1734975521/photo_wvubrf.png"
              width={30}
            />
            <span className="block text-gray-500 font-semibold" />
          </div>
          <input
            accept="image/*"
            className="h-full w-full bg-red-500 opacity-0 cursor-pointer relative z-10"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <button
          className={`px-4 py-2 text-white rounded-md transition-colors duration-300 ${
            isLoading
              ? "bg-blue-400 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={isLoading}
          onClick={handleSubmit}
        >
          {isLoading ? "Posting..." : "Post"}
        </button>
      </div>
      {previewImage && (
        <div className="mt-4">
          <p className="text-gray-400">Image Preview:</p>
          <Image
            alt="Uploaded preview"
            className="mt-2 max-h-64 rounded-lg"
            src={previewImage}
          />
        </div>
      )}
    </div>
  );
}
