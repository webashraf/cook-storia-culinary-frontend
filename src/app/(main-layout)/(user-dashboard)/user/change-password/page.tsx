"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { IoEyeOff, IoEyeSharp } from "react-icons/io5";
import { MdPassword } from "react-icons/md";

const PasswordChange = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="min-h-[90vh] flex items-center justify-center ">
      <form className=" border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 w-[500px] space-y-8">
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
          placeholder="Enter old your password"
          startContent={
            <MdPassword className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          }
          type={isVisible ? "text" : "password"}
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
          placeholder="Enter new your password"
          startContent={
            <MdPassword className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          }
          type={isVisible ? "text" : "password"}
        />

        <Button
          className="w-full text-white bg-black hover:bg-gray-800 transition-colors duration-300"
          color="primary"
          variant="shadow"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default PasswordChange;
