"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useState } from "react";
import { IoEyeOff, IoEyeSharp, IoMail } from "react-icons/io5";
import { MdPassword } from "react-icons/md";

const page = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="min-h-[90vh] flex items-center justify-center ">
      <form className=" border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 w-[400px] space-y-8">
        <h2 className="text-3xl font-bold text-center text-default-800">
          Sign Up
        </h2>

        <Input
          type="text"
          label="User Name"
          placeholder="Drop your user name"
          startContent={
            <IoMail className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          }
          onClear={() => console.log("input cleared")}
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
        />
        <Input
          type="url"
          label="Website"
          placeholder="image.com"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">https://</span>
            </div>
          }
        />
        <Input
          type="email"
          label="Email"
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
          variant="shadow"
          color="primary"
          className="w-full text-white bg-black hover:bg-gray-800 transition-colors duration-300"
        >
          Register
        </Button>

   

        <div className="text-center">
          <span className="text-sm text-gray-500">
            Already have an account?&nbsp;
          </span>
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline focus:outline-none"
          >
            <Link href="/login"> Login</Link>
          </button>
        </div>
      </form>
    </div>
  );
};

export default page;
