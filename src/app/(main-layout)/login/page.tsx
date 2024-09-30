"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { IoEyeOff, IoEyeSharp } from "react-icons/io5";

const LoginPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-1">
      <form className="bg-white shadow-md rounded-lg p-8 w-[400px] space-y-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800">
          Login
        </h2>

        <Input
          isClearable
          type="email"
          variant="bordered"
          placeholder="Enter your email"
          onClear={() => console.log("input cleared")}
          className="w-full"
        />

        <Input
          variant="bordered"
          placeholder="Enter your password"
          endContent={
            <button
              className="focus:outline-none"
              type="button"
              onClick={toggleVisibility}
              aria-label="toggle password visibility"
            >
              {isVisible ? (
                <IoEyeOff className="text-2xl text-gray-400 pointer-events-none" />
              ) : (
                <IoEyeSharp className="text-2xl text-gray-400 pointer-events-none" />
              )}
            </button>
          }
          type={isVisible ? "text" : "password"}
          className="w-full"
        />

        <Button variant="solid" color="primary" className="w-full text-white">
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
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
