"use client";

import { Button } from "@nextui-org/button";
import { Input, Textarea } from "@nextui-org/input";
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
    console.log("Form data submitted:", formData);
    // Add form submission logic here (e.g., API call)
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
                href="mailto:support@example.com"
                className="text-white hover:underline"
              >
                support@example.com
              </a>
            </p>
            <p className="text-gray-400">
              📞 Phone:{" "}
              <a href="tel:+11234567890" className="text-white hover:underline">
                +1 (123) 456-7890
              </a>
            </p>
            <p className="text-gray-400">
              🌐 Live Chat:{" "}
              <a href="/chat" className="text-white hover:underline">
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
                href="https://www.facebook.com"
                className="text-gray-400 hover:text-white"
              >
                Facebook
              </a>
              <a
                href="https://www.twitter.com"
                className="text-gray-400 hover:text-white"
              >
                Twitter
              </a>
              <a
                href="https://www.instagram.com"
                className="text-gray-400 hover:text-white"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com"
                className="text-gray-400 hover:text-white"
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Input
                type="text"
                name="name"
                label="Name"
                onChange={handleChange}
              />
              <Input
                type="email"
                name="email"
                label="Email"
                onChange={handleChange}
              />
              <Textarea
                name="message"
                label="Message"
                onChange={handleChange}
              />
              <Button
                fullWidth
                variant="faded"
                className="bg-white text-black hover:bg-gray-200"
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
