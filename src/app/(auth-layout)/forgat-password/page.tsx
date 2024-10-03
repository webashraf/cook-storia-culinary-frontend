"use client";

import { useUser } from "@/src/context/user.provider";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import nexiosInstance from "nexios-http";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoEyeOff, IoEyeSharp, IoMail } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import { toast } from "sonner";

const ForgatPassword = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const defaultValues = { email: "ali@gmail.com", password: "123456" };
  const { handleSubmit, register } = useForm({ defaultValues });
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setIsUserLoading } = useUser();

  const onSubmit: SubmitHandler<any> = async (formData) => {
    const { data }: any = await nexiosInstance.post("", formData);

    if (data.success) {
      setIsUserLoading(true);
      toast.success("Login successful!!");
      router.push("/");
    } else {
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center ">
      <form
        className=" border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 w-[400px] space-y-8"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2 className="text-3xl font-bold text-center text-default-800">
          Recover your password
        </h2>

        <Input
          label="Email"
          type="email"
          {...register("email")}
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          placeholder="you@example.com"
          startContent={
            <IoMail className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          }
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
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
          Login
        </Button>

        <div className="flex justify-between items-center">
          <Link
            href="/login"
            className="text-sm text-blue-600 hover:underline focus:outline-none"
            type="button"
          >
            Going to login page
          </Link>
        </div>

        <div className="text-center">
          <span className="text-sm text-gray-500">
            Dont have an account?&nbsp;
          </span>
          <button
            className="text-sm text-blue-600 hover:underline focus:outline-none"
            type="button"
          >
            <Link href="/register"> Sign Up</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ForgatPassword;
