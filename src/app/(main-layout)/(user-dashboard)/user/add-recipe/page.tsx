"use client";

import { toolbarOptions } from "@/src/constent/toolbarOptions.quil";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style/AddRecipe.css";

const MyComponent = () => {
  const [text, setText] = useState("");
  const [quilData, setQuillData] = useState({});
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const handleChange = (content: any, delta: any, source: any, editor: any) => {
    setText(content);
    setValue("description", content);

    const editorContents = editor.getContents();

    const images = editorContents.ops
      .filter((op: any) => op.insert && op.insert.image)
      .map((op: any) => op.insert.image);

    console.log("Images:", images[0]);
    console.log("HTML Content:", editor.getHTML());

    const plainTextContent = editor.getText().replace(/\n/g, "");
    console.log("Plain Text Content (no newlines):", plainTextContent);

    const quilEditorInfo = {
      imageUrl: images[0],
      htmlDescription: editor.getHTML(),
      description: plainTextContent,
    };
    setQuillData(quilEditorInfo);
  };

  const onSubmit = (data: any) => {
    const quillValue = getValues("description");
    console.log("Form Data:", { ...data, ...quilData });
  };

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

  return (
    <div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 w-[500px space-y-8"
      >
        <h2 className="text-3xl font-bold text-center text-default-800">
          Add your recipe
        </h2>

        <Input
          {...register("title", { required: true })}
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          label="Recipe Title"
          placeholder="Give your recipe title"
          type="text"
        />
        {errors.title && (
          <span className="text-red-500">Title is required</span>
        )}

        <Input
          {...register("ingredients", { required: true })}
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          label="Ingredients"
          placeholder="Give ingredients"
          type="text"
        />
        {errors.ingredients && (
          <span className="text-red-500">Ingredients are required</span>
        )}

        <Input
          {...register("cookingTime", { required: true })}
          label="Cooking time"
          placeholder="Give total time of cooking"
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          type="text"
        />
        {errors.cookingTime && (
          <span className="text-red-500">Cooking time is required</span>
        )}

        <div className="text-editor bg-gray-50 rounded-lg shadow-lg bg-transparent text-white">
          <h4 className="mb-5">Give Description and your recipe photo</h4>
          <ReactQuill
            theme="snow"
            value={text}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            className="lux-quill h-[30vh] border-none mb-[100px]"
          />
        </div>

        <Button
          className="w-full text-white bg-black hover:bg-gray-800 transition-colors duration-300"
          color="primary"
          variant="shadow"
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default MyComponent;
