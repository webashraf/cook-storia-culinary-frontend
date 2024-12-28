"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { Link } from "@nextui-org/link";
import { FormEvent, useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh] p-6 text-white w-full ">
      <div className="max-w-7xl w-full grid grid-cols-1 gap-8">
        {/* Contact Information Section */}
        <div className="bg-gradient-to-br from-black to-gray-900 shadow-2xl rounded-lg p-8 md:p-10 border border-gray-700">
          <h2 className="text-2xl lg:text-3xl font-semibold text-white mb-4">
            Customer Support
          </h2>
          <p className="text-gray-400 mb-6 text-sm lg:text-base">
            For immediate assistance, you can reach us through any of the
            following channels:
          </p>
          <div className="space-y-4 text-sm lg:text-base">
            <p className="text-gray-400">
              📧 Email:{" "}
              <a
                className="text-white hover:underline"
                href="mailto:support@example.com"
              >
                support@example.com
              </a>
            </p>
            <p className="text-gray-400">
              📞 Phone:{" "}
              <a className="text-white hover:underline" href="tel:+11234567890">
                +1 (123) 456-7890
              </a>
            </p>
            <p className="text-gray-400">
              🌐 Live Chat:{" "}
              <a className="text-white hover:underline" href="/chat">
                Start a Live Chat
              </a>
            </p>
            <p className="text-gray-400">
              💬 Business Hours: Monday to Friday, 9 AM - 5 PM (UTC)
            </p>
          </div>

          <div className="mt-10">
            <h3 className="text-xl lg:text-2xl font-semibold text-white mb-4">
              Follow Us:
            </h3>

            <div className="flex gap-3 h-full flex-wrap">
              <Link
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                href="https://www.facebook.com/"
                target="_blank"
                type="button"
              >
                Facebook
              </Link>
              <Link
                className="text-white bg-gradient-to-r from-red-500 via-red-600 to-red-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                href="https://www.youtube.com"
                target="_blank"
                type="button"
              >
                YouTube
              </Link>
              <Link
                className="text-white bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-400/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                href="https://www.x.com"
                target="_blank"
                type="button"
              >
                Twitter
              </Link>
              <Link
                className="text-white bg-gradient-to-r from-pink-500 via-pink-600 to-pink-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                href="https://www.instagram.com"
                target="_blank"
                type="button"
              >
                Instagram
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="bg-gradient-to-br from-black to-gray-900 shadow-2xl rounded-lg p-8 md:p-10 border border-gray-700">
          <h1 className="text-3xl lg:text-4xl font-bold text-center mb-6 text-white">
            Contact Us
          </h1>
          <p className="text-lg text-center mb-8 text-gray-400">
            Have questions? We’re here to help! Fill out the form below, and our
            support team will get back to you shortly.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-3">
              <Input
                label="Name"
                name="name"
                type="text"
                onChange={handleChange}
              />
              <Input
                label="Email"
                name="email"
                type="email"
                onChange={handleChange}
              />
              <Textarea
                label="Message"
                name="message"
                onChange={handleChange}
              />
              <Button fullWidth className="bg-black">
                Send Message
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
