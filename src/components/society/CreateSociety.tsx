"use client";

import { Image } from "@nextui-org/image";
import { useState } from "react";

import { useUser } from "@/src/context/user.provider";
import { ILogInUser } from "@/src/types/user";

import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../UI/AnimetedModal";

export function CreateSociety() {
  const [postContent, setPostContent] = useState("");
  const { user }: ILogInUser | any = useUser();

  return (
    <div className=" flex items-center justify-center w-full mb-5">
      <Modal>
        {/* Trigger Button */}
        <ModalTrigger className="w-full">
          <div className="dark:bg-neutral-900 flex justify-center items-center w-full rounded-md">
            <div className="w-full  rounded-lg shadow-md overflow-hidden">
              {/* Create Post Section */}
              <div className="p-4 border-t">
                <div className="flex items-center mb-4">
                  <Image
                    alt="User Avatar"
                    className="w-12 h-12 rounded-full"
                    src={user.photo}
                  />
                  <input
                    className="ml-4 flex-1 dark:bg-neutral-700 bg-neutral-100 rounded-full px-4 py-2 text-gray-700 outline-none"
                    placeholder="What's on your mind, John?"
                    type="text"
                  />
                </div>

                <div className="flex justify-between">
                  <button disabled className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.75 8.25v-3a3 3 0 00-3-3h-3a3 3 0 00-3 3v3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 8.25a6.75 6.75 0 1113.5 0v8.5A6.75 6.75 0 019 16.75v-8.5z"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Photo/Video
                  </button>
                  <button disabled className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M9.75 7.5v9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M14.25 7.5v9"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Live Video
                  </button>
                  <button disabled className="flex items-center text-gray-600">
                    <svg
                      className="w-5 h-5 mr-1"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={1.5}
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Create Event
                  </button>
                </div>
              </div>
            </div>
          </div>
        </ModalTrigger>

        {/* Modal Body */}
        <ModalBody>
          <ModalContent className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            {/* Header */}
            <div className="flex items-center mb-4">
              <img
                alt="Profile"
                className="w-10 h-10 rounded-full"
                src="/user-profile.jpg"
              />
              <div className="ml-4">
                <p className="font-medium text-gray-800 dark:text-gray-100">
                  John Doe
                </p>
                <select className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded-md px-2 py-1">
                  <option>Public</option>
                  <option>Friends</option>
                  <option>Only Me</option>
                </select>
              </div>
            </div>

            {/* Textarea */}
            <textarea
              className="w-full h-24 p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring focus:ring-blue-200 dark:focus:ring-blue-600"
              placeholder="What's on your mind?"
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
            />

            {/* Footer */}
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-1 text-blue-500 hover:bg-blue-50 px-3 py-2 rounded-md">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zM6 8a2 2 0 100 4 2 2 0 000-4zm4-1a2 2 0 11-4 0 2 2 0 014 0zm0 6a2 2 0 100 4 2 2 0 000-4zm4-1a2 2 0 110-4 2 2 0 014 4zm0 1a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Photo</span>
                </button>
                <button className="flex items-center space-x-1 text-green-500 hover:bg-green-50 px-3 py-2 rounded-md">
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M2 3a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V3z" />
                    <path d="M10 6a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Video</span>
                </button>
              </div>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                Post
              </button>
            </div>
          </ModalContent>
          <ModalFooter className="flex justify-end gap-4">
            <button
              className="px-4 py-2 bg-gray-300 dark:bg-gray-700 rounded-md"
              onClick={() => setPostContent("")}
            >
              Cancel
            </button>
          </ModalFooter>
        </ModalBody>
      </Modal>
    </div>
  );
}
