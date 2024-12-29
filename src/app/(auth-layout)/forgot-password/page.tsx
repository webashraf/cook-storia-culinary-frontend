"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoEyeOff, IoEyeSharp, IoMail } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import { toast } from "sonner";

import nexiosInstance from "@/src/config/nexios.instance";
import { useUser } from "@/src/context/user.provider";

interface IFormInfo {
  email: string;
  newPassword: string;
}

const ForgatPassword = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const defaultValues: IFormInfo = {
    email: "ali@gmail.com",
    newPassword: "123456",
  };
  const { handleSubmit, register } = useForm<IFormInfo>({
    defaultValues,
  });

  const router = useRouter();
  const { setIsUserLoading } = useUser();

  const onSubmit: SubmitHandler<IFormInfo> = async (formData) => {
    try {
      const { data }: any = await nexiosInstance.post(
        "/auth/generate-new-password",
        formData
      );

      if (data.success) {
        setIsUserLoading(true);
        toast.success("Password change successful!!");
        router.push("/login");
      } else {
        toast.error("Failed to change password");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <form
        className="border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 w-[400px] space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold text-center text-default-800">
          Recover your password
        </h2>

        <Input
          label="Email"
          type="email"
          {...register("email", { required: true })}
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          placeholder="you@example.com"
          startContent={
            <IoMail className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          }
        />

        <Input
          label="Password"
          placeholder="Enter your new password"
          {...register("newPassword", { required: true })}
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
          startContent={
            <MdPassword className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          }
          type={isVisible ? "text" : "password"}
        />

        <Button
          className="w-full text-white bg-black hover:bg-gray-800 transition-colors duration-300"
          color="primary"
          type="submit"
          variant="shadow"
        >
          Send Request
        </Button>

        <div className="flex justify-between items-center">
          <Link
            className="text-sm text-blue-600 hover:underline focus:outline-none"
            href="/login"
            type="button"
          >
            Go to login page
          </Link>
        </div>

        <div className="text-center">
          <span className="text-sm text-gray-500">
            Dont have an account?&nbsp;
          </span>
          <Link
            className="text-sm text-blue-600 hover:underline focus:outline-none"
            href="/register"
          >
            Sign Up
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgatPassword;
