"use client";

import { Avatar } from "@nextui-org/avatar";
import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { useState } from "react";

const CreatePost = () => {
  const [value, setValue] = useState("");

  return (
    <div className="max-w-[90%] mx-auto rounded-lg mb-10 bg-default-100 p-5 flex gap-5 justify-center items-center">
      <Avatar
        isBordered
        radius="sm"
        src="https://i.pravatar.cc/150?u=a04258a2462d826712d"
      />

      <div className="w-full flex flex-col gap-2 ">
        <div>
          <Textarea
            variant="underlined"
            // label="Description"
            labelPlacement="outside"
            placeholder="Share Your Recipe"
            value={value}
            size="sm"
            onValueChange={setValue}
          />
        </div>
      </div>
      <Input
        key="warning"
        type="file"
        color="warning"
        size="sm"
        className="max-w-[100px]"
      />
      <Button>Post</Button>
    </div>
  );
};

export default CreatePost;
