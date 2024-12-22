"use client";
import { Image } from "@nextui-org/image";
import { Input, Textarea } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useUser } from "@/src/context/user.provider";
import { createSociety } from "@/src/services/SocietyServices";
import { ISociety } from "@/src/types/society";
import { IUser } from "@/src/types/user";

const SocietyPage = () => {
  const [isInput, setIsInput] = useState(false);
  const { handleSubmit, control, reset } = useForm<ISociety>();
  const { user }: { user: IUser | any } = useUser();

  // Form submission handler
  const onSubmit = async (data: ISociety) => {
    console.log("Form Data:", data);
    reset();

    try {
      const result: any = await createSociety({ ...data, admin: user?.id });

      if (result?.success) {
        toast.success("Society created successfully!");
        setIsInput(false);
      } else {
        toast.error("Error creating Society!");
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
          <Image
            alt="Society cover"
            className="object-cover w-full h-full"
            src="https://res.cloudinary.com/dyalzfwd4/image/upload/v1734884282/digital-art-style-pottery-illustration_1_ei4tal.jpg"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto mt-8 px-4">
        {/* Society Info Section */}
        <div className="flex justify-between">
          <div className="w-full">
            {isInput && (
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
                    name="privacy"
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
            )}
            {!isInput && (
              <h1
                className="text-2xl font-bold hover:underline capitalize"
                onClick={() => setIsInput(true)}
              >
                Create your society
              </h1>
            )}
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

        {/* Main Section */}
        <div className="mt-6 flex flex-col md:flex-row gap-4">
          {/* Left Section */}
          <div className="flex-1">
            <div className="p-4 dark:bg-gray-800 rounded-lg">
              <p className="text-gray-500">What's on your mind?</p>
              <div className="flex items-center mt-4">
                <div className="flex-grow flex gap-4">
                  <button className="flex items-center text-gray-400 hover:text-white">
                    <span className="mr-2">📷</span> Photo/video
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-white">
                    <span className="mr-2">🏷</span> Tag people
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-white">
                    <span className="mr-2">😊</span> Feeling/activity
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-64 dark:bg-gray-800 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-2">About</h3>
            <p className="text-gray-400">
              Add some information about your Society here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocietyPage;
