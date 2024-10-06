"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactQuill from "react-quill";

import { nexiosInstance } from "@/src/config/axios.instance";
import {
  dietaryRestrictions,
  recipeCategories,
  recipeTags,
} from "@/src/constent/recipe.constant";
import { toolbarOptions } from "@/src/constent/toolbarOptions.quil";
import { useUser } from "@/src/context/user.provider";
import "react-quill/dist/quill.snow.css";
import "./style/AddRecipe.css";

interface FormData {
  title: string;
  ingredients: string[];
  cookingTime: number;
  preparationTime: number;
  categories: string[];
  tags: string[];
  dietaryRestrictions: string[];
  cuisine: string;
  instructions: string;
  image: string;
  servings: number;
  nutritionFacts: {
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
  };
}

const MyComponent = () => {
  const [text, setText] = useState<string>("");
  const [quilData, setQuillData] = useState<any>({});
  const [quillError, setQuillError] = useState<string | null>(null);
  const { user: currentUser } = useUser();

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
    setValue("instructions", content);

    const plainTextContent = editor.getText().replace(/\n/g, "");

    const quilEditorInfo = {
      htmlInstructions: editor.getHTML(),
      instructions: plainTextContent,
    };

    setQuillData(quilEditorInfo);
  };

  const onSubmit = async (data: FormData) => {
    const editorContents = quilData.instructions;

    if (!editorContents) {
      setQuillError("Instructions are required.");

      return;
    } else {
      setQuillError(null);
    }

    const image = data.image;

    console.log(image);

    const formDataForSubmit = {
      ...data,
      user: currentUser?.id,
      cookingTime: Number(data.cookingTime),
      preparationTime: Number(data.preparationTime),
      servings: Number(data.servings),
      image,
      ingredients: (data?.ingredients as any)
        .split(",")
        .map((item: string) => item.trim()),
      tags: (data.tags as any)?.split(",").map((item: string) => item.trim()),
      categories: (data.categories as any)
        ?.split(",")
        .map((item: string) => item.trim()),
      dietaryRestrictions: (data.dietaryRestrictions as any)
        ?.split(",")
        .map((item: string) => item.trim()),
      ...quilData,
    };

    console.log("Form Data:", formDataForSubmit);

    try {
      const { data }: any = await nexiosInstance.post(
        "/recipe/create-recipe",
        {
          data: JSON.stringify(formDataForSubmit),
        },
        // {
        //   headers: { "Content-Type": "multipart/form-data" },
        // }
      );

      console.log("Response:", data);
    } catch (error: any) {
      console.log("Error:", error);
    }
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
    <div className="w-full h-[90vh] overflow-y-scroll my-auto">
      <form
        className="border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold text-center text-default-800">
          Add your recipe
        </h2>

        {/* Part 1: Recipe Details */}
        <fieldset className="flex flex-wrap gap-5">
          <legend className="text-2xl font-semibold mb-4">
            Recipe Details
          </legend>
          <div className="w-[48%]">
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
          </div>

          <div className="w-[48%]">
            <Input
              {...register("servings", { required: "Servings are required" })}
              className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
              label="Servings"
              placeholder="Number of servings"
              type="number"
            />
            {errors.servings && (
              <span className="text-red-500 block w-full">
                {errors.servings.message}
              </span>
            )}
          </div>

          <div className="w-[48%]">
            <Controller
              control={control}
              name="preparationTime"
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-full"
                  label="Preparation Time (minutes)"
                  placeholder="Select preparation time"
                  onChange={field.onChange}
                >
                  {Array.from({ length: 26 }, (_, i) => (i + 1) * 5).map(
                    (time) => (
                      <SelectItem key={time} value={time}>
                        {time} minutes
                      </SelectItem>
                    )
                  )}
                </Select>
              )}
              rules={{ required: "Preparation time is required" }}
            />
            {errors.preparationTime && (
              <span className="text-red-500 block w-full">
                {errors.preparationTime.message}
              </span>
            )}
          </div>

          <div className="w-[48%]">
            <Controller
              control={control}
              name="cookingTime"
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-full"
                  label="Cooking Time (minutes)"
                  placeholder="Select cooking time"
                  onChange={field.onChange}
                >
                  {Array.from({ length: 26 }, (_, i) => (i + 1) * 5).map(
                    (time) => (
                      <SelectItem key={time} value={time}>
                        {time} minutes
                      </SelectItem>
                    )
                  )}
                </Select>
              )}
              rules={{ required: "Cooking time is required" }}
            />
            {errors.cookingTime && (
              <span className="text-red-500 block w-full">
                {errors.cookingTime.message}
              </span>
            )}
          </div>

          <div className="w-[100%]">
            <Input
              {...register("image", { required: "Image is required" })}
              className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
              type="file"
            />
            {errors.image && (
              <span className="text-red-500 block w-full">
                {errors.image.message}
              </span>
            )}
          </div>
        </fieldset>

        {/* Part 2: Ingredients and Nutrition Facts */}
        <fieldset>
          <legend className="text-2xl font-semibold mb-4">
            Ingredients and Nutrition Facts
          </legend>
          <div className="flex flex-wrap gap-5">
            <Controller
              control={control}
              name="ingredients"
              render={({ field }) => (
                <Select
                  {...field}
                  className="w-full"
                  label="Ingredients"
                  placeholder="Select ingredients"
                  selectionMode="multiple"
                  onChange={field.onChange}
                >
                  {["Flour", "Sugar", "Salt", "Butter", "Eggs"].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </Select>
              )}
              rules={{ required: "Ingredients are required" }}
            />
            {errors.ingredients && (
              <span className="text-red-500 block w-full">
                {errors.ingredients.message}
              </span>
            )}

            {/* Nutrition Facts */}
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-4">Nutrition Facts</h3>
              <div className="flex flex-wrap gap-5">
                <div className="w-[48%]">
                  <Input
                    {...register("nutritionFacts.calories", {
                      required: "Calories are required",
                      valueAsNumber: true,
                    })}
                    className="border-gray-300 rounded-lg"
                    label="Calories (kcal)"
                    placeholder="500"
                    type="number"
                  />
                  {errors.nutritionFacts?.calories && (
                    <span className="text-red-500 block w-full">
                      {errors.nutritionFacts.calories.message}
                    </span>
                  )}
                </div>

                <div className="w-[48%]">
                  <Input
                    {...register("nutritionFacts.protein", {
                      required: "Protein is required",
                      valueAsNumber: true,
                    })}
                    className="border-gray-300 rounded-lg"
                    label="Protein (g)"
                    placeholder="25"
                    type="number"
                  />
                  {errors.nutritionFacts?.protein && (
                    <span className="text-red-500 block w-full">
                      {errors.nutritionFacts.protein.message}
                    </span>
                  )}
                </div>

                <div className="w-[48%]">
                  <Input
                    {...register("nutritionFacts.fat", {
                      required: "Fat is required",
                      valueAsNumber: true,
                    })}
                    className="border-gray-300 rounded-lg"
                    label="Fat (g)"
                    placeholder="20"
                    type="number"
                  />
                  {errors.nutritionFacts?.fat && (
                    <span className="text-red-500 block w-full">
                      {errors.nutritionFacts.fat.message}
                    </span>
                  )}
                </div>

                <div className="w-[48%]">
                  <Input
                    {...register("nutritionFacts.carbohydrates", {
                      required: "Carbohydrates are required",
                      valueAsNumber: true,
                    })}
                    className="border-gray-300 rounded-lg"
                    label="Carbohydrates (g)"
                    placeholder="60"
                    type="number"
                  />
                  {errors.nutritionFacts?.carbohydrates && (
                    <span className="text-red-500 block w-full">
                      {errors.nutritionFacts.carbohydrates.message}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </fieldset>

        {/* Part 3: Categories, Tags, Dietary Restrictions, Cuisine */}
        <fieldset className="flex flex-wrap gap-5">
          <legend className="text-2xl font-semibold mb-4">
            Categories, Tags, Dietary Restrictions, Cuisine
          </legend>
          <Controller
            control={control}
            name="categories"
            render={({ field }) => (
              <Select
                {...field}
                className="w-full"
                label="Categories"
                placeholder="Select categories"
                selectionMode="multiple"
                onChange={field.onChange}
              >
                {recipeCategories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </Select>
            )}
            rules={{ required: "Categories are required" }}
          />
          {errors.categories && (
            <span className="text-red-500 block w-full">
              {errors.categories.message}
            </span>
          )}

          <Controller
            control={control}
            name="tags"
            render={({ field }) => (
              <Select
                {...field}
                className="w-full"
                label="Tags"
                placeholder="Select tags"
                selectionMode="multiple"
                onChange={field.onChange}
              >
                {recipeTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </Select>
            )}
            rules={{ required: "Tags are required" }}
          />
          {errors.tags && (
            <span className="text-red-500 block w-full">
              {errors.tags.message}
            </span>
          )}

          <Controller
            control={control}
            name="dietaryRestrictions"
            render={({ field }) => (
              <Select
                {...field}
                className="w-full"
                label="Dietary Restrictions"
                placeholder="Select dietary restrictions"
                selectionMode="multiple"
                onChange={field.onChange}
              >
                {dietaryRestrictions.map((restriction) => (
                  <SelectItem key={restriction} value={restriction}>
                    {restriction}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name="cuisine"
            render={({ field }) => (
              <Select
                {...field}
                className="w-full"
                label="Cuisine"
                placeholder="Select recipe cuisine"
                selectionMode="multiple"
                onChange={field.onChange}
              >
                {dietaryRestrictions.map((restriction) => (
                  <SelectItem key={restriction} value={restriction}>
                    {restriction}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
        </fieldset>

        {/* Part 4: Instructions */}
        <fieldset>
          <legend className="text-2xl font-semibold mb-4">
            Recipe Instructions
          </legend>
          <div className="quill-container mb-20">
            <ReactQuill
              className=" h-[300px] "
              formats={formats}
              modules={modules}
              theme="snow"
              value={text}
              onChange={handleChange}
            />
          </div>
          {quillError && <p className="text-red-500">{quillError}</p>}
        </fieldset>

        <div className="w-full flex justify-center">
          <Button
            className="w-full sm:w-auto"
            size="lg"
            type="submit"
            variant="solid"
          >
            Submit Recipe
          </Button>
        </div>
      </form>
    </div>
  );
};

export default MyComponent;
