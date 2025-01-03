/* eslint-disable no-undef */
"use client";

import { setTimeout } from "timers";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaUserSecret, FaUserTie } from "react-icons/fa";
import { IoEyeOff, IoEyeSharp, IoMail } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import { toast } from "sonner";

import { useUser } from "@/src/context/user.provider";
import { loginUser } from "@/src/services/AuthService";

type TLoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const router = useRouter();
  const { user } = useUser();

  setTimeout(() => user && router.push("/"), 1000);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TLoginFormInputs>();

  const loginUserHandler: SubmitHandler<TLoginFormInputs> = async (
    formData
  ) => {
    try {
      const res = await loginUser(formData);

      if (res.success) {
        setLoading(true);
        router.push("/");
        toast.success("Login successful!!");
        window.location.reload();
        reset();
      } else {
        toast.error(`Login failed: ${res?.message}`);
      }
    } catch (error: any) {
      console.log("Error", error?.message);
    }
  };

  return (
    <div className="flex items-center justify-center lg:p-10 p-5 rounded-2xl dark:bg-black/60 w-full border border-gray-200 shadow-2xl shadow-sky-600/40">
      <form
        className="space-y-5 w-full"
        onSubmit={handleSubmit(loginUserHandler)}
      >
        <Image
          alt="Site logo"
          className="w-[230] lg:w-[270px] mx-auto"
          height={100}
          src="/logo.png"
          width={280}
        />
        <div>
          <Input
            aria-label="userEmail"
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: "Enter a valid email address",
              },
            })}
            className="border-gray-300 rounded-lg focus:border-black focus:ring-2  focus:ring-black"
            placeholder="you@example.com"
            startContent={
              <IoMail className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
            }
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div>
          <Input
            aria-label="userPassword"
            label="Password"
            placeholder="Enter your password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters long",
              },
            })}
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
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
        </div>

        <Button
          className="w-full text-white bg-black hover:bg-gray-800 transition-colors duration-300"
          color="primary"
          type="submit"
          variant="shadow"
        >
          Login
        </Button>

        <div className="flex justify-center gap-5">
          <Button
            className=" text-white bg-black hover:bg-gray-800 transition-colors duration-300"
            color="primary"
            variant="shadow"
            onClick={() =>
              loginUserHandler({
                email: "user@gmail.com",
                password: "123456",
              })
            }
          >
            <FaUserTie />
            Login As User
          </Button>
          <Button
            className=" text-white bg-black hover:bg-gray-800 transition-colors duration-300"
            color="primary"
            variant="shadow"
            onClick={() =>
              loginUserHandler({
                email: "supperadmin@gmail.com",
                password: "123456",
              })
            }
          >
            <FaUserSecret />
            Login As Admin
          </Button>
        </div>

        <div className="flex justify-between items-center">
          <Link
            className="text-sm text-blue-600 hover:underline focus:outline-none"
            href="/forgot-password"
            type="button"
          >
            Forgot Password?
          </Link>
        </div>

        <div className="text-center">
          <span className="text-sm text-gray-500">
            Don't have an account?&nbsp;
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

export default Login;
