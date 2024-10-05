"use client";

import { toolbarOptions } from "@/src/constent/toolbarOptions.quil";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
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
    // console.log("HTML Content:", editor.getHTML());
    // console.log("Plain Text Content:", editor.getText());
  };

  return (
    <div>
      <form className=" border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 w-[500px space-y-8">
        <h2 className="text-3xl font-bold text-center text-default-800">
          Add your recipe
        </h2>

        <Input
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          label="Recipe Title"
          placeholder="Give your recipe title"
          // startContent={
          //   <IoMail className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          // }
          type="text"
          // onClear={() => //console.log("input cleared")}
        />
        <Input
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          label="Ingredients"
          placeholder="Give ingredients"
          // startContent={
          //   <IoMail className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          // }
          type="email"
          // onClear={() => //console.log("input cleared")}
        />

        <Input
          label="Cooking time"
          placeholder="Give total time of cooking"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">https://</span>
            </div>
          }
          type="url"
        />

        <div className="text-editor bg-gray-50  rounded-lg shadow-lg   bg-transparent text-white">
          <h4 className="mb-5">Give Description and your recipe photo</h4>
          <ReactQuill
            theme="snow"
            value={text}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            className="lux-quill h-[30vh] border-none  mb-[100px]"
          />
        </div>
        <Button
          className="w-full text-white bg-black hover:bg-gray-800 transition-colors duration-300"
          color="primary"
          variant="shadow"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default MyComponent;
