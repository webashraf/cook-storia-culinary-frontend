// components/Footer.js

import Image from "next/image";
import Link from "next/link";

import Container from "../../UI/Container";

const Footer = () => {
  return (
    <footer className=" glassy  mt-5">
      <div className="max-w-[1500px] mx-auto lg:py-12 py-5 border-t-4 border-primary-400 text-default-900">
        <Container>
          <div className="container mx-auto lg:px-6">
            <div className="grid lg:grid-cols-4 ">
              {/* Company Info Section */}
              <div className="mb-6 footer-item">
                <Link
                  className="flex justify-start items-center gap-1 mb-3"
                  href="/"
                >
                  <Image
                    alt="Site logo"
                    className="min-w-[280px]"
                    height={100}
                    src="/logo.png"
                    width={280}
                  />
                </Link>
                <p className="text-default-500 mb-4">
                  Your trusted partner for innovative solutions in technology
                  and business.
                </p>
                <p className="text-default-500 mb-4">
                  Empowering your business with cutting-edge solutions.
                </p>
              </div>

              {/* Quick Links Section */}
              <div className="mb-6 lg:pl-10 footer-item">
                <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a
                      className="text-default-500 hover:text-white transition duration-300"
                      href="#"
                    >
                      Home
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-default-500 hover:text-white transition duration-300"
                      href="#"
                    >
                      About Us
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-default-500 hover:text-white transition duration-300"
                      href="#"
                    >
                      Services
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-default-500 hover:text-white transition duration-300"
                      href="#"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-default-500 hover:text-white transition duration-300"
                      href="#"
                    >
                      Contact
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-default-500 hover:text-white transition duration-300"
                      href="#"
                    >
                      FAQ
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-default-500 hover:text-white transition duration-300"
                      href="#"
                    >
                      Testimonials
                    </a>
                  </li>
                  <li>
                    <a
                      className="text-default-500 hover:text-white transition duration-300"
                      href="#"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact Us Section */}
              <div className="mb-6 footer-item">
                <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
                <p className="text-default-500">
                  123 Business St, City, Country
                </p>
                <p className="text-default-500">
                  Email:{" "}
                  <a
                    className="hover:underline"
                    href="mailto:info@yourcompany.com"
                  >
                    info@yourcompany.com
                  </a>
                </p>
                <p className="text-default-500">
                  Phone:{" "}
                  <a className="hover:underline" href="tel:+11234567890">
                    +1 (123) 456-7890
                  </a>
                </p>
              </div>
              {/* Newsletter Section */}
              <div className="mb-6 footer-item mt-6">
                <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
                <p className="text-default-500 mb-4">
                  Subscribe to our newsletter for the latest updates and offers.
                </p>
                <form className="flex flex-col">
                  <input
                    required
                    className="p-2 rounded-md text-default-500 mb-2"
                    placeholder="Your email"
                    type="email"
                  />
                  <button
                    className="bg-default-900 text-default-100 p-2 rounded-md hover:bg-gray-300 transition duration-300"
                    type="submit"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

            {/* Additional Sections */}

            {/* Legal Information Section */}
            <div className="mt-12 border-t border-gray-700 pt-6">
              <p className="text-default-500 text-sm mb-2">
                © {new Date().getFullYear()} Company Name. All rights reserved.
              </p>
              <ul className="flex flex-wrap space-x-4">
                <li>
                  <a
                    className="text-default-500 hover:text-white transition duration-300"
                    href="#"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    className="text-default-500 hover:text-white transition duration-300"
                    href="#"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    className="text-default-500 hover:text-white transition duration-300"
                    href="#"
                  >
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;
