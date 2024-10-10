"use client";

import { Button } from "@nextui-org/button";
import { Input } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaUserEdit } from "react-icons/fa";
import { IoMail } from "react-icons/io5";
import { toast } from "sonner";

import { nexiosInstance } from "@/src/config/axios.instance";
import { useUser } from "@/src/context/user.provider";
import { logoutUser } from "@/src/services/AuthService";

const SettingsPage = () => {
  const { user } = useUser();
  const [needLogin, setNeedLogin] = useState<boolean>(false);

  // Initialize the useForm hook
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: user?.name || "",
      email: user?.email || "",
      profilePicture: user?.photo || "",
    },
  });

  // Handle form submission
  const onSubmit = async (formData: any) => {
    console.log(formData);

    try {
      const { data }: any = await nexiosInstance.put(
        `/user/update-user-profile-info/${user?.id}`,
        formData
      );

      console.log(data);

      if (data.success) {
        setNeedLogin(true);
        logoutUser();
        toast.success("User updated successfully");
      }
    } catch (error: any) {
      toast.error("Failed to update info");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      {needLogin ? (
        <Button>
          <Link className="text-white" href="/login">
            Now you must need to login
          </Link>
        </Button>
      ) : (
        <form
          className="border border-gray-200 shadow-2xl shadow-sky-600/40 rounded-lg p-12 w-[500px] space-y-8"
          onSubmit={handleSubmit(onSubmit)} // Attach the submit handler
        >
          <h2 className="text-3xl font-bold text-center text-default-800">
            Update your profile
          </h2>

          <Input
            className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
            label="User Name"
            placeholder="Drop your user name"
            startContent={
              <FaUserEdit className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
            }
            type="text"
            {...register("username", { required: true })}
          />
          {errors.username && (
            <p className="text-red-500">User Name is required</p>
          )}

          <Input
            className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
            label="Email"
            placeholder="you@example.com"
            startContent={
              <IoMail className="text-2xl text-gray-600 pointer-events-none flex-shrink-0" />
            }
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="text-red-500">Email is required</p>}

          <Input
            className="border-gray-300 rounded-lg focus:border-black focus:ring-2 focus:ring-black"
            label="ProfileUrl"
            placeholder="image.com"
            startContent={
              <div className="pointer-events-none flex items-center">
                <span className="text-default-400 text-small">https://</span>
              </div>
            }
            type="url"
            {...register("profilePicture", { required: true })}
          />
          {(errors as any).photo && (
            <p className="text-red-500">Profile URL is required</p>
          )}

          <Button
            className="w-full text-white bg-black hover:bg-gray-800 transition-colors duration-300"
            color="primary"
            type="submit"
            variant="shadow"
          >
            Save
          </Button>
        </form>
      )}
    </div>
  );
};

export default SettingsPage;
