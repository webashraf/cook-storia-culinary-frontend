"use client";

import { loginUser } from "@/src/services/AuthService";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoEyeOff, IoEyeSharp, IoMail } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import { toast } from "sonner";

const page = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const defaultValues = { email: "ali@gmail.com", password: "123456" };
  const { handleSubmit, register } = useForm({ defaultValues });
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");

  const loginForm: SubmitHandler<any> = async (formData) => {
    const res = await loginUser(formData);

    console.log(res);
    if (res.success) {
      toast.success("Login successful!!");
      if (redirect) {
        router.push(redirect);
      } else {
        router.push("/");
      }
    } else {
      toast.error("Login failed");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center ">
      <form
        onSubmit={handleSubmit(loginForm)}
        className=" border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 w-[400px] space-y-8"
      >
        <h2 className="text-3xl font-bold text-center text-default-800">
          Login
        </h2>

        <Input
          type="email"
          label="Email"
          {...register("email")}
          placeholder="you@example.com"
          startContent={
            <IoMail className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          }
          onClear={() => console.log("input cleared")}
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
          startContent={
            <MdPassword className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          }
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <IoEyeOff className="text-2xl text-gray-600 pointer-events-none" />
              ) : (
                <IoEyeSharp className="text-2xl text-gray-600 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
        />

        <Button
          type="submit"
          variant="shadow"
          color="primary"
          className="w-full text-white bg-black hover:bg-gray-800 transition-colors duration-300"
        >
          Login
        </Button>

        <div className="flex justify-between items-center">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline focus:outline-none"
          >
            Forgot Password?
          </button>
        </div>

        <div className="text-center">
          <span className="text-sm text-gray-500">
            Don't have an account?&nbsp;
          </span>
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline focus:outline-none"
          >
            <Link href="/register"> Sign Up</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
