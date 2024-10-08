"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { BsPencil } from "react-icons/bs";
import ReactQuill from "react-quill";
import { toast } from "sonner";

import {
  dietaryRestrictions,
  ingredientsArr,
  recipeCategories,
  recipeCuisines,
  recipeTags,
  timeMinutes,
} from "@/src/constent/recipe.constant";
import { formats, toolbarOptions } from "@/src/constent/toolbarOptions.quil";
import { useUser } from "@/src/context/user.provider";
import { IRecipeFormData } from "@/src/types";
import "react-quill/dist/quill.snow.css";

export default function UpdateProfileModal({
  recipe,
  updateRecipeLoading,
  setUpdateRecipeLoading,
}: any) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [size, setSize] = useState("4xl");
  const [updateLoading, setupUpdateLoading] = useState(false);

  console.log("Modal Recipe", recipe);
  const handleOpen = () => {
    setSize("4xl");
    onOpen();
  };
  const [text, setText] = useState<string>("");
  const [quilData, setQuillData] = useState<any>({});
  const { user: currentUser } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<IRecipeFormData>({
    defaultValues: {
      title: recipe.title,
      servings: recipe.servings,
    },
  });

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

  const onSubmit = async (data: IRecipeFormData) => {
    const formData = new FormData();
    // const editorContents = quilData.instructions;

    const image = data.image[0];

    const formDataForSubmit = {
      ...data,
      user: currentUser?.id,
      cookingTime: Number(data.cookingTime),
      preparationTime: Number(data.preparationTime),
      servings: Number(data.servings),
      ingredients: (data?.ingredients as any)
        ?.split(",")
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

    console.log("formDataForSubmit", formDataForSubmit);
    setupUpdateLoading(true);
    formData.append("data", JSON.stringify(formDataForSubmit));
    formData.append("image", image);
    try {
      const response = await fetch(
        `http://localhost:5000/api/v1/recipe/update-recipe/${recipe._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      const responseData = await response.json();

      console.log(responseData);
      if (responseData.success) {
        setUpdateRecipeLoading(!updateRecipeLoading);
        setupUpdateLoading(false);
        toast.success("Recipe updated successfully!!");
      }
      if (!responseData.success) {
        setupUpdateLoading(false);
        toast.error("Recipe update failed!", responseData?.message);
      }
      if (!response.ok) {
        setupUpdateLoading(false);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setupUpdateLoading(false);
      console.log("Response:", responseData);
    } catch (error) {
      setupUpdateLoading(false);
      console.log("Error:", error);
    }
  };

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button isIconOnly onPress={() => handleOpen()}>
          <BsPencil />
        </Button>
      </div>
      <Modal isOpen={isOpen} size={"4xl"} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-co gap-1">
                Update Recipe:
                <h3 className="text-primary-400"> {recipe?.title}</h3>
              </ModalHeader>
              <ModalBody>
                <div className="w-full h-[60vh] overflow-y-scroll my-auto">
                  <form
                    className="border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 space-y-8"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {/* Part 1: Recipe Details */}
                    <fieldset className="flex flex-wrap gap-5">
                      <legend className="text-2xl font-semibold mb-4">
                        Recipe Details
                      </legend>
                      <div className="w-[48%]">
                        <Input
                          {...register("title")}
                          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
                          label="Recipe Title"
                          placeholder="Give your recipe title"
                          type="text"
                        />
                      </div>

                      <div className="w-[48%]">
                        <Input
                          {...register("servings")}
                          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
                          label="Servings"
                          placeholder="Number of servings"
                          type="number"
                        />
                      </div>

                      <div className="w-[48%]">
                        <Controller
                          control={control}
                          name="preparationTime"
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="w-full"
                              label="Preparation Time(as minutes)"
                              placeholder="Select Preparation Time"
                              selectionMode="single"
                              onChange={field.onChange}
                            >
                              {timeMinutes.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                        />
                      </div>

                      <div className="w-[48%]">
                        <Controller
                          control={control}
                          name="cookingTime"
                          render={({ field }) => (
                            <Select
                              {...field}
                              className="w-full"
                              label="Cooking Time(as minutes)"
                              placeholder="Select Cooking Time"
                              selectionMode="single"
                              onChange={field.onChange}
                            >
                              {timeMinutes.map((time) => (
                                <SelectItem key={time} value={time}>
                                  {time}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                        />
                      </div>

                      <div className="w-[100%]">
                        <Input
                          {...register("image")}
                          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
                          type="file"
                        />
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
                              defaultSelectedKeys={recipe?.ingredients}
                              label="Ingredients"
                              placeholder="Select ingredients"
                              selectionMode="multiple"
                              onChange={field.onChange}
                            >
                              {ingredientsArr.map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </Select>
                          )}
                        />

                        {/* Nutrition Facts */}
                        <div className="w-full">
                          <h3 className="text-xl font-semibold mb-4">
                            Nutrition Facts
                          </h3>
                          {/* <div className="flex flex-wrap gap-5">
                            <div className="w-[48%]">
                              <Input
                                {...register("nutritionFacts.calories", {
                                  valueAsNumber: true,
                                  required: true,
                                })}
                                className="border-gray-300 rounded-lg"
                                label="Calories (kcal)"
                                placeholder="500"
                                type="number"
                              />
                            </div>

                            <div className="w-[48%]">
                              <Input
                                {...register("nutritionFacts.protein", {
                                  valueAsNumber: true,
                                  required: true,
                                })}
                                className="border-gray-300 rounded-lg"
                                label="Protein (g)"
                                placeholder="25"
                                type="number"
                              />
                            </div>

                            <div className="w-[48%]">
                              <Input
                                {...register("nutritionFacts.fat", {
                                  valueAsNumber: true,
                                })}
                                className="border-gray-300 rounded-lg"
                                label="Fat (g)"
                                placeholder="20"
                                type="number"
                              />
                            </div>

                            <div className="w-[48%]">
                              <Input
                                {...register("nutritionFacts.carbohydrates", {
                                  valueAsNumber: true,
                                })}
                                className="border-gray-300 rounded-lg"
                                label="Carbohydrates (g)"
                                placeholder="60"
                                type="number"
                              />
                            </div>
                          </div> */}
                          <div className="flex flex-wrap gap-5">
                            <div className="w-[48%]">
                              <Input
                                {...register("nutritionFacts.calories", {
                                  valueAsNumber: true,
                                  required: "Calories is required", // Validation message for required field
                                })}
                                className="border-gray-300 rounded-lg"
                                defaultValue={recipe?.nutritionFacts.calories}
                                label="Calories (kcal)"
                                placeholder="500"
                                type="number"
                              />
                              {(errors as any).nutritionFacts?.calories && (
                                <p className="text-red-600 text-sm">
                                  {
                                    (errors as any).nutritionFacts.calories
                                      .message
                                  }
                                </p>
                              )}
                            </div>

                            <div className="w-[48%]">
                              <Input
                                {...register("nutritionFacts.protein", {
                                  valueAsNumber: true,
                                  required: "Protein is required", // Validation message for required field
                                })}
                                className="border-gray-300 rounded-lg"
                                defaultValue={recipe?.nutritionFacts.protein}
                                label="Protein (g)"
                                placeholder="25"
                                type="number"
                              />
                              {/* Display error message */}
                              {(errors as any).nutritionFacts?.protein && (
                                <p className="text-red-600 text-sm">
                                  {
                                    (errors as any).nutritionFacts.protein
                                      .message
                                  }
                                </p>
                              )}
                            </div>

                            <div className="w-[48%]">
                              <Input
                                {...register("nutritionFacts.fat", {
                                  valueAsNumber: true,
                                })}
                                className="border-gray-300 rounded-lg"
                                defaultValue={recipe?.nutritionFacts.fat}
                                label="Fat (g)"
                                placeholder="20"
                                type="number"
                              />
                              {/* Display error message if needed */}
                              {(errors as any).nutritionFacts?.fat && (
                                <p className="text-red-600 text-sm">
                                  {(errors as any).nutritionFacts.fat.message}
                                </p>
                              )}
                            </div>

                            <div className="w-[48%]">
                              <Input
                                {...register("nutritionFacts.carbohydrates", {
                                  valueAsNumber: true,
                                })}
                                className="border-gray-300 rounded-lg"
                                defaultValue={
                                  recipe?.nutritionFacts.carbohydrates
                                }
                                label="Carbohydrates (g)"
                                placeholder="60"
                                type="number"
                              />
                              {/* Display error message if needed */}
                              {(errors as any).nutritionFacts
                                ?.carbohydrates && (
                                <p className="text-red-600 text-sm">
                                  {
                                    (errors as any).nutritionFacts.carbohydrates
                                      .message
                                  }
                                </p>
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
                            defaultSelectedKeys={recipe?.categories}
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
                      />

                      <Controller
                        control={control}
                        name="tags"
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="w-full"
                            defaultSelectedKeys={recipe?.tags}
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
                      />

                      <Controller
                        control={control}
                        name="dietaryRestrictions"
                        render={({ field }) => (
                          <Select
                            {...field}
                            className="w-full"
                            defaultSelectedKeys={recipe?.dietaryRestrictions}
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
                            defaultSelectedKeys={recipe?.cuisine}
                            label="Cuisine"
                            placeholder="Select cuisine"
                            selectionMode="single"
                            onChange={field.onChange}
                          >
                            {recipeCuisines.map((cuisine) => (
                              <SelectItem key={cuisine} value={cuisine}>
                                {cuisine}
                              </SelectItem>
                            ))}
                          </Select>
                        )}
                      />
                    </fieldset>

                    {/* Part 4: Instructions */}
                    <fieldset className="mt-4">
                      <legend className="text-2xl font-semibold mb-4">
                        Instructions
                      </legend>
                      <Controller
                        control={control}
                        name="instructions"
                        render={({ field }) => (
                          <ReactQuill
                            formats={formats}
                            modules={modules}
                            theme="snow"
                            value={text}
                            onChange={(content, delta, source, editor) =>
                              handleChange(content, delta, source, editor)
                            }
                          />
                        )}
                      />
                    </fieldset>

                    {/* Submit Button */}
                    <div className="flex justify-end mt-8">
                      <Button
                        className="w-full"
                        isLoading={updateLoading}
                        type="submit"
                        variant="faded"
                      >
                        Update Recipe
                      </Button>
                    </div>
                  </form>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
