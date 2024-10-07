"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoEyeOff, IoEyeSharp, IoMail } from "react-icons/io5";
import { LuUserPlus } from "react-icons/lu";
import { MdPassword } from "react-icons/md";
import { toast } from "sonner";

import { nexiosInstance } from "@/src/config/axios.instance";
import { useUser } from "@/src/context/user.provider";

export interface IUserFormInfo {
  username: string;
  email: string;
  id: string;
  password: string;
  profilePicture: string;
}

const CreateAdmin = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  // Using react-hook-form
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IUserFormInfo>({
    defaultValues: {
      username: "Ali Ashraf Tamim",
      email: "aliashraf@gmail.com",
      password: "123456",
      profilePicture:
        "https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?t=st=1727979695~exp=1727983295~hmac=175f5b9229e80fb758ee5f0ec8cc665bf84af6260a74ab6a86f67dec799ad8ef&w=740",
    },
  });
  const { setIsUserLoading } = useUser();

  const onSubmit: SubmitHandler<IUserFormInfo> = async (formData) => {
    try {
      const { data }: any = await nexiosInstance.post("/user/create-user", {
        ...formData,
        role: "admin",
      });

      if (data.success) {
        setIsUserLoading(true);
        toast.success("Registration successful!");
      } else {
        toast.error("Failed to register");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center ">
      <form
        className="border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 w-[400px] space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold text-center text-default-800">
          Sign Up As Admin
        </h2>

        <Input
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          label="User Name"
          placeholder="Drop your user name"
          {...register("username", { required: "Username is required" })}
          startContent={
            <LuUserPlus className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          }
          type="text"
        />
        {errors.username && (
          <p className="text-red-500">{errors.username.message}</p>
        )}

        <Input
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          label="Email"
          placeholder="you@example.com"
          {...register("email", { required: "Email is required" })}
          startContent={
            <IoMail className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          }
          type="email"
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <Input
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          label="Password"
          placeholder="Enter your password"
          {...register("password", { required: "Password is required" })}
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
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        <Input
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          label="Profile URL"
          placeholder="image.com"
          {...register("profilePicture", {
            required: "Profile picture URL is required",
          })}
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">https://</span>
            </div>
          }
          type="url"
        />
        {errors.profilePicture && (
          <p className="text-red-500">{errors.profilePicture.message}</p>
        )}

        <Button
          className="w-full text-white bg-black hover:bg-gray-800 transition-colors duration-300"
          color="primary"
          type="submit"
          variant="shadow"
        >
          Register
        </Button>

        <div className="text-center">
          <span className="text-sm text-gray-500">
            Already have an account?&nbsp;
          </span>
          <Link
            className="text-sm text-blue-600 hover:underline focus:outline-none"
            href="/login"
          >
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default CreateAdmin;
