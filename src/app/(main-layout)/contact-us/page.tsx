// src/app/contact/page.js

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
    <div className="flex flex-col items-center justify-center min-h-[90vh] p-6  text-gray-900 w-full">
      <div className="max-w-6xl w-full bg-white shadow-lg rounded-lg p-10 border border-gray-300 flex flex-col md:flex-row">
        {/* Contact Information Section */}
        <div className="md:w-1/2 md:pr-8">
          <h2 className="text-2xl font-semibold text-indigo-600">
            Customer Support
          </h2>
          <p className="text-gray-700 mt-4">
            For immediate assistance, you can reach us through any of the
            following channels:
          </p>
          <p className="text-gray-700">
            📧 Email:{" "}
            <a
              href="mailto:support@example.com"
              className="text-indigo-500 hover:underline"
            >
              support@example.com
            </a>
          </p>
          <p className="text-gray-700">
            📞 Phone:{" "}
            <a
              href="tel:+11234567890"
              className="text-indigo-500 hover:underline"
            >
              +1 (123) 456-7890
            </a>
          </p>
          <p className="text-gray-700">
            🌐 Live Chat:{" "}
            <a href="/chat" className="text-indigo-500 hover:underline">
              Start a Live Chat
            </a>
          </p>
          <p className="text-gray-700 mt-4">
            💬 Business Hours: Monday to Friday, 9 AM - 5 PM (UTC)
          </p>
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Follow Us:</h3>
            <div className="flex justify-start mt-2 space-x-4">
              <a
                href="https://www.facebook.com"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Facebook
              </a>
              <a
                href="https://www.twitter.com"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Twitter
              </a>
              <a
                href="https://www.instagram.com"
                className="text-indigo-600 hover:text-indigo-800"
              >
                Instagram
              </a>
              <a
                href="https://www.linkedin.com"
                className="text-indigo-600 hover:text-indigo-800"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="md:w-1/2 md:pl-8 mt-6 md:mt-0">
          <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">
            Contact Us
          </h1>
          <p className="text-lg text-center mb-8 text-gray-700">
            Have questions? We’re here to help! Fill out the form below and our
            support team will get back to you shortly.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-3">
              <Input type="name" label="Name" />
              <Input type="email" label="Email" />
              <Textarea label="Description" />
              <Button fullWidth variant="faded">
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
