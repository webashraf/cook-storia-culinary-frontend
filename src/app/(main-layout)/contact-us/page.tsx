"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
import { FormEvent, useState } from "react";

const ContactUs = () => {
  console.log("", process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
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
      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8">
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
            <div className="flex space-x-4">
              <a
                className="text-gray-400 hover:text-white"
                href="https://www.facebook.com"
              >
                Facebook
              </a>
              <a
                className="text-gray-400 hover:text-white"
                href="https://www.twitter.com"
              >
                Twitter
              </a>
              <a
                className="text-gray-400 hover:text-white"
                href="https://www.instagram.com"
              >
                Instagram
              </a>
              <a
                className="text-gray-400 hover:text-white"
                href="https://www.linkedin.com"
              >
                LinkedIn
              </a>
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
              <Button
                fullWidth
                className="bg-white text-black hover:bg-gray-200"
                variant="faded"
              >
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
