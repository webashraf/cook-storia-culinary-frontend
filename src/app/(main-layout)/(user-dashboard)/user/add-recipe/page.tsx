"use client";

import {
  dietaryRestrictions,
  recipeCategories,
  recipeCuisines,
  recipeTags,
} from "@/src/constent/recipe.constant";
import { toolbarOptions } from "@/src/constent/toolbarOptions.quil";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "./style/AddRecipe.css";

// Define the form data type
interface FormData {
  title: string;
  ingredients: string[];
  cookingTime: number;
  categories: string[];
  tags: string[];
  dietaryRestrictions: string[];
  cuisine: string;
  description: string; // Added description field for ReactQuill
}

const MyComponent = () => {
  const [text, setText] = useState<string>("");
  const [quilData, setQuillData] = useState<any>({});
  const [quillError, setQuillError] = useState<string | null>(null); // State for Quill error
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FormData>();

  const handleChange = (
    content: string,
    delta: any,
    source: any,
    editor: any
  ) => {
    setText(content);
    setValue("description", content);

    const editorContents = editor.getContents();
    const images = editorContents.ops
      .filter((op: any) => op.insert && op.insert.image)
      .map((op: any) => op.insert.image);

    const plainTextContent = editor.getText().replace(/\n/g, "");

    const quilEditorInfo = {
      imageUrl: images[0],
      htmlDescription: editor.getHTML(),
      description: plainTextContent,
    };
    setQuillData(quilEditorInfo);
  };

  const onSubmit = (data: FormData) => {
    const editorContents = quilData.description;
    const images = quilData.imageUrl;
    console.log(quilData.description, quilData.imageUrl);

    if (!editorContents && !images) {
      setQuillError("Description and image are required.");
      return;
    } else {
      setQuillError(null);
    }

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
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 space-y-8"
      >
        <h2 className="text-3xl font-bold text-center text-default-800">
          Add your recipe
        </h2>

        {/* Recipe Title */}
        <Input
          {...register("title", { required: "Title is required" })}
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          label="Recipe Title"
          placeholder="Give your recipe title"
          type="text"
        />
        {errors.title && (
          <span className="text-red-500 block w-full">
            {errors.title.message}
          </span>
        )}

        <div className="flex flex-wrap gap-5">
          {/* Ingredients */}
          <div className="w-[48%]">
            <Controller
              name="ingredients"
              control={control}
              rules={{ required: "Ingredients are required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={field.onChange}
                  label="Ingredients"
                  selectionMode="multiple"
                  placeholder="Select ingredients"
                  className="w-full"
                >
                  {["Flour", "Sugar", "Salt", "Butter", "Eggs"].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            {errors.ingredients && (
              <span className="text-red-500 block w-full">
                {errors.ingredients.message}
              </span>
            )}
          </div>

          {/* Cooking Time */}
          <div className="w-[48%]">
            <Controller
              name="cookingTime"
              control={control}
              rules={{ required: "Cooking time is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={field.onChange}
                  label="Cooking Time (minutes)"
                  placeholder="Select cooking time"
                  className="w-full"
                >
                  {Array.from({ length: 13 }, (_, i) => (i + 1) * 5).map(
                    (time) => (
                      <SelectItem key={time} value={time}>
                        {time} minutes
                      </SelectItem>
                    )
                  )}
                </Select>
              )}
            />
            {errors.cookingTime && (
              <span className="text-red-500 block w-full">
                {errors.cookingTime.message}
              </span>
            )}
          </div>

          {/* Categories */}
          <div className="w-[48%]">
            <Controller
              name="categories"
              control={control}
              rules={{ required: "Categories are required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={field.onChange}
                  label="Categories"
                  selectionMode="multiple"
                  placeholder="Select categories"
                  className="w-full"
                >
                  {recipeCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            {errors.categories && (
              <span className="text-red-500 block w-full">
                {errors.categories.message}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="w-[48%]">
            <Controller
              name="tags"
              control={control}
              rules={{ required: "Tags are required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={field.onChange}
                  label="Tags"
                  selectionMode="multiple"
                  placeholder="Select tags"
                  className="w-full"
                >
                  {recipeTags.map((tag) => (
                    <SelectItem key={tag} value={tag}>
                      {tag}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            {errors.tags && (
              <span className="text-red-500 block w-full">
                {errors.tags.message}
              </span>
            )}
          </div>

          {/* Dietary Restrictions */}
          <div className="w-[48%]">
            <Controller
              name="dietaryRestrictions"
              control={control}
              rules={{ required: "Dietary restrictions are required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={field.onChange}
                  label="Dietary Restrictions"
                  selectionMode="multiple"
                  placeholder="Select dietary restrictions"
                  className="w-full"
                >
                  {dietaryRestrictions.map((restriction) => (
                    <SelectItem key={restriction} value={restriction}>
                      {restriction}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            {errors.dietaryRestrictions && (
              <span className="text-red-500 block w-full">
                {errors.dietaryRestrictions.message}
              </span>
            )}
          </div>

          {/* Cuisine */}
          <div className="w-[48%]">
            <Controller
              name="cuisine"
              control={control}
              rules={{ required: "Cuisine is required" }}
              render={({ field }) => (
                <Select
                  {...field}
                  onChange={field.onChange}
                  label="Cuisine"
                  placeholder="Select cuisine"
                  className="w-full"
                >
                  {recipeCuisines.map((cuisine) => (
                    <SelectItem key={cuisine} value={cuisine}>
                      {cuisine}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
            {errors.cuisine && (
              <span className="text-red-500 block w-full">
                {errors.cuisine.message}
              </span>
            )}
          </div>
        </div>

        {/* Rich Text Editor */}
        <div className="text-editor bg-gray-50 rounded-lg shadow-lg bg-transparent text-white">
          <h4 className="mb-1 flex justify-between items-center">
            Give Description and your recipe photo
            {quillError && (
              <span className="text-red-500 ml-2">{quillError}</span>
            )}
          </h4>
          <ReactQuill
            theme="snow"
            value={text}
            onChange={handleChange}
            modules={modules}
            formats={formats}
            className="lux-quill h-[30vh] border-none mb-[100px]"
          />
        </div>

        {/* Submit Button */}
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
