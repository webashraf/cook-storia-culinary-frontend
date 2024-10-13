"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { useForm } from "react-hook-form"; // Import useForm
import { IoEyeOff, IoEyeSharp } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import { toast } from "sonner";

import nexiosInstance from "@/src/config/nexios.instance";
import { useUser } from "@/src/context/user.provider";

const PasswordChange = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { register, handleSubmit } = useForm();
  const toggleVisibility = () => setIsVisible(!isVisible);
  const { user } = useUser();
  // Form submit handler
  const onSubmit = async (formData: any) => {
    try {
      const { data }: any = await nexiosInstance.put(
        `/auth/change-password/${user?.id}`,
        formData
      );

      if (data.success) {
        toast.success("Password changed successfully");
      } else {
        toast.error("Password changed failed");
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center ">
      <form
        className="border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 w-[500px] space-y-8"
        onSubmit={handleSubmit(onSubmit)} // Attach the form submit handler
      >
        <h2 className="text-3xl font-bold text-center text-default-800">
          Change Password
        </h2>

        <Input
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <IoEyeOff className="text-2xl text-gray-600 pointer-events-none" />
              ) : (
                <IoEyeSharp className="text-2xl text-gray-600 pointer-events-none" />
              )}
            </button>
          }
          label="Old Password"
          placeholder="Enter your old password"
          startContent={
            <MdPassword className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          }
          type={isVisible ? "text" : "password"}
          {...register("oldPassword")} // Register the oldPassword input
        />

        <Input
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
            >
              {isVisible ? (
                <IoEyeOff className="text-2xl text-gray-600 pointer-events-none" />
              ) : (
                <IoEyeSharp className="text-2xl text-gray-600 pointer-events-none" />
              )}
            </button>
          }
          label="New Password"
          placeholder="Enter your new password"
          startContent={
            <MdPassword className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          }
          type={isVisible ? "text" : "password"}
          {...register("newPassword")}
        />

        <Button
          className="w-full text-white bg-black hover:bg-gray-800 transition-colors duration-300"
          color="primary"
          type="submit"
          variant="shadow"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default PasswordChange;
