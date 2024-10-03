"use client";
import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { useState } from "react";
import { IoMail } from "react-icons/io5";

const page = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="min-h-[90vh] flex items-center justify-center ">
      <form className=" border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 w-[500px] space-y-8">
        <h2 className="text-3xl font-bold text-center text-default-800">
          Update your profile
        </h2>

        <Input
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          label="User Name"
          placeholder="Drop your user name"
          startContent={
            <IoMail className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          }
          type="text"
          // onClear={() => //console.log("input cleared")}
        />
        <Input
          className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
          label="Email"
          placeholder="you@example.com"
          startContent={
            <IoMail className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
          }
          type="email"
          // onClear={() => //console.log("input cleared")}
        />

        <Input
          label="ProfileUrl"
          placeholder="image.com"
          startContent={
            <div className="pointer-events-none flex items-center">
              <span className="text-default-400 text-small">https://</span>
            </div>
          }
          type="url"
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

export default page;
