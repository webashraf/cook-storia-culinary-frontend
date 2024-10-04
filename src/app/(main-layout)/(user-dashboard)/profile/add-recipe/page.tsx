"use client";

import { toolbarOptions } from "@/src/constent/toolbarOptions.quil";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style/AddRecipe.css";

const MyComponent = () => {
  const [text, setText] = useState("");

  const modules = {
    toolbar: toolbarOptions,
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const handleChange = (content: any, delta: any, source: any, editor: any) => {
    setText(content);
    console.log("Editor Content:", editor.getContents());
    console.log("HTML Content:", editor.getHTML());
    console.log("Plain Text Content:", editor.getText());
  };

  return (
    <div className="text-editor bg-gray-50 text-gray-800 rounded-lg shadow-lg m-5 p-4 bg-transparent text-white">
      <ReactQuill
        theme="snow"
        value={text}
        onChange={handleChange}
        modules={modules}
        formats={formats}
        className="lux-quill h-[60vh] border-none" // No border for the editor
      />
    </div>
  );
};

export default MyComponent;
