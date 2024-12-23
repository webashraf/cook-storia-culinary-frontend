"use client";
import { Image } from "@nextui-org/image";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function CreateSocietyPost() {
  const [postContent, setPostContent] = useState("");
  const [image, setImage] = useState(null);

  const handleContentChange = (value) => {
    setPostContent(value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = () => {
    console.log("Quill Data:", postContent);
    if (image) {
      console.log("Uploaded Image URL:", image);
    }
    if (postContent || image) {
      setPostContent("");
      setImage(null);
    }
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      [{ align: [] }],
    ],
  };

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "list",
    "bullet",
    "link",
    "align",
  ];

  return (
    <div className="p-4 dark:bg-neutral-950 rounded-lg">
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
              className=""
              height={30}
              src="https://res.cloudinary.com/dyalzfwd4/image/upload/v1734975521/photo_wvubrf.png"
              width={30}
            />
            <span className="block text-gray-500 font-semibold" />
          </div>
          <input
            className="h-full w-full bg-red-500 opacity-0 cursor-pointer relative z-10"
            type="file"
            onChange={handleImageChange}
          />
        </div>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md transition-colors duration-300 hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Post
        </button>
      </div>
      {image && (
        <div className="mt-4">
          <p className="text-gray-400">Image Preview:</p>
          <img
            alt="Uploaded preview"
            className="mt-2 max-h-64 rounded-lg"
            src={image}
          />
        </div>
      )}
    </div>
  );
}
