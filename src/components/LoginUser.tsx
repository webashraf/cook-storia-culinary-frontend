"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoEyeOff, IoEyeSharp, IoMail } from "react-icons/io5";
import { MdPassword } from "react-icons/md";
import { toast } from "sonner";

import { loginUser } from "@/src/services/AuthService";

import { useUser } from "../context/user.provider";

type TLoginFormInputs = {
  email: string;
  password: string;
};

const Login = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TLoginFormInputs>();

  const router = useRouter();
  const { user, setIsUserLoading } = useUser();

  const setCredentials = (email: string, password: string) => {
    reset({ email, password });
  };

  const loginForm: SubmitHandler<TLoginFormInputs> = async (formData) => {
    try {
      const res = await loginUser(formData);

      if (res.success) {
        setIsUserLoading(true);
        setLoading(true);
        router.push("/");
        toast.success("Login successful!!");
        reset(); // Reset only after successful login
      } else {
        toast.error(`Login failed: ${res?.message}`);
      }
    } catch (error: any) {
      console.log("Error", error?.message);
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center ">
      <form
        className=" border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 w-[400px] space-y-8"
        onSubmit={handleSubmit(loginForm)}
      >
        <h2 className="text-3xl font-bold text-center text-default-800">
          Login
        </h2>
        <span className="flex gap-2">
          <div
            className=" rounded-lg text-sm p-1 border"
            onClick={() => setCredentials("ali@gmail.com", "123456")}
          >
            User Credentials
            <span>
              <br /> email: ali@gmail.com
              <br />
              pas: 123456
            </span>
          </div>
          <div
            className=" rounded-lg text-sm p-1 border"
            onClick={() => setCredentials("supperadmin@gmail.com", "123456")}
          >
            Admin Credentials
            <span>
              <br /> email: supperadmin@gmail.com
              <br />
              pas: 123456
            </span>
          </div>
        </span>
        <div>
          <Input
            label="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                message: "Enter a valid email address",
              },
            })}
            className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
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
