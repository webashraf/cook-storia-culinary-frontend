/* eslint-disable no-undef */
"use client";
import { Image } from "@nextui-org/image";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUser } from "@/src/context/user.provider";
import { ISociety } from "@/src/types/society";
import { IUser } from "@/src/types/user";

const SocietyPage = () => {
  const [isInput, setIsInput] = useState(false);
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { handleSubmit, control, reset } = useForm<ISociety>();
  const { user }: { user: IUser | any } = useUser();

  const handleCoverPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setCoverPhoto(file);

      // Create a preview for the user
      const reader = new FileReader();

      reader.onload = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ISociety) => {
    const form = new FormData();

    // Add the data object with additional fields
    const dataForCreateSociety = { ...data, admin: user?.id };

    console.log(dataForCreateSociety);
    form.append("data", JSON.stringify(dataForCreateSociety)); // Serialize the object as a JSON string

    // Add the cover photo if it exists
    if (coverPhoto) form.append("image", coverPhoto);

    console.log(form);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/society/create`,
        {
          method: "POST",
          body: form, // Use the FormData as the body
        }
      );

      const result = await response.json();

      console.log(result);
      if (response.ok && result?.success) {
        toast.success("Society created successfully!");
        setIsInput(false);
        setCoverPhoto(null);
        setPreviewImage(null);
        reset();
      } else {
        toast.error(result?.message || "Error creating Society!");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error creating Society!");
    }
  };

  return (
    <div className="min-h-screen dark:bg-neutral-900 text-white">
      {/* Header Section */}
      <div className="relative w-full h-64 bg-gray-700 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          {previewImage ? (
            <Image
              alt="Society cover"
              className="object-cover w-full h-full"
              src={previewImage}
            />
          ) : (
            <Image
              alt="Society cover"
              className="object-cover w-full h-full"
              src="https://res.cloudinary.com/dyalzfwd4/image/upload/v1734884282/digital-art-style-pottery-illustration_1_ei4tal.jpg"
            />
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto mt-8 px-4">
        {/* Society Info Section */}
        <div className="flex justify-between">
          <div className="w-full">
            <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-5 flex items-end gap-5">
                {/* Society Name Input */}
                <Controller
                  control={control}
                  name="societyName"
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Society name"
                      size="sm"
                      type="text"
                      variant="underlined"
                    />
                  )}
                />
                {/* Privacy Selector */}
                <Controller
                  control={control}
                  name="privacyType"
                  render={({ field }) => (
                    <Select
                      {...field}
                      placeholder="Select a privacy"
                      variant="underlined"
                    >
                      <SelectItem key="Public" value="Public">
                        Public
                      </SelectItem>
                      <SelectItem key="Private" value="Private">
                        Private
                      </SelectItem>
                    </Select>
                  )}
                />
              </div>
              {/* Photo Upload Section */}
              <div className="mb-5 flex items-center gap-4">
                <input
                  accept="image/*"
                  className="border-b-1 px-4 py-2 bg-neutral-950 text-white cursor-pointer"
                  id="coverPhotoUpload"
                  type="file"
                  onChange={handleCoverPhotoChange}
                />
              </div>
              {/* Description Textarea */}
              <Controller
                control={control}
                defaultValue=""
                name="description"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    labelPlacement="outside"
                    placeholder="Enter your description"
                    variant="underlined"
                  />
                )}
              />
              {/* Submit Button */}
              <div className="mt-4 flex justify-end gap-2">
                <button
                  className="px-4 py-2 bg-gray-600 rounded text-white ml-4 hover:bg-gray-700"
                  type="button"
                  onClick={() => setIsInput(false)}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>

            <p className="text-gray-400">Society privacy · 1 member</p>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="mt-6 border-b border-gray-600">
          <ul className="flex space-x-4 text-gray-400">
            <li className="pb-2 border-b-2 border-transparent hover:text-white hover:border-white">
              About
            </li>
            <li className="pb-2 border-b-2 border-transparent hover:text-white hover:border-white">
              Posts
            </li>
            <li className="pb-2 border-b-2 border-transparent hover:text-white hover:border-white">
              Members
            </li>
            <li className="pb-2 border-b-2 border-transparent hover:text-white hover:border-white">
              Events
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SocietyPage;
