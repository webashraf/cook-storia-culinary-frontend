// components/Footer.js

import Container from "../../UI/Container";

const Footer = () => {
  return (
    <footer className="bg-black glassy text-white py-12">
      <Container>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-4 ">
            {/* Company Info Section */}
            <div className="mb-6 footer-item">
              <h3 className="text-lg font-semibold mb-2">Company Name</h3>
              <p className="text-gray-300 mb-4">
                Your trusted partner for innovative solutions in technology and
                business.
              </p>
              <p className="text-gray-400 mb-4">
                Empowering your business with cutting-edge solutions.
              </p>
            </div>

            {/* Quick Links Section */}
            <div className="mb-6 pl-10 footer-item">
              <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    className="text-gray-300 hover:text-white transition duration-300"
                    href="#"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-white transition duration-300"
                    href="#"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-white transition duration-300"
                    href="#"
                  >
                    Services
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-white transition duration-300"
                    href="#"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-white transition duration-300"
                    href="#"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-white transition duration-300"
                    href="#"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-white transition duration-300"
                    href="#"
                  >
                    Testimonials
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-300 hover:text-white transition duration-300"
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
              <p className="text-gray-300">123 Business St, City, Country</p>
              <p className="text-gray-300">
                Email:{" "}
                <a
                  className="hover:underline"
                  href="mailto:info@yourcompany.com"
                >
                  info@yourcompany.com
                </a>
              </p>
              <p className="text-gray-300">
                Phone:{" "}
                <a className="hover:underline" href="tel:+11234567890">
                  +1 (123) 456-7890
                </a>
              </p>

              {/* Social Icons Section */}
              <div className="flex space-x-4 mt-4">
                <a
                  className="text-gray-300 hover:text-white transition duration-300"
                  href="#"
                >
                  {/* Facebook Icon */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M4.5 12A7.5 7.5 0 0112 4.5V12l5.25-5.25A9 9 0 104.5 12z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </a>
                <a
                  className="text-gray-300 hover:text-white transition duration-300"
                  href="#"
                >
                  {/* Twitter Icon */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.54 6.42a10.44 10.44 0 01-2.88.79 5.25 5.25 0 002.3-2.89 10.43 10.43 0 01-3.31 1.27 5.22 5.22 0 00-8.93 4.76A14.82 14.82 0 011.67 4.88 5.22 5.22 0 003.49 11.3a5.21 5.21 0 01-2.37-.65v.07a5.22 5.22 0 004.19 5.12 5.22 5.22 0 01-2.36.09 5.22 5.22 0 004.87 3.62 10.48 10.48 0 01-6.48 2.23 10.43 10.43 0 01-1.24-.07 14.8 14.8 0 007.99 2.35c9.6 0 14.84-7.96 14.84-14.85 0-.23 0-.46-.02-.69a10.62 10.62 0 002.6-2.7 10.46 10.46 0 01-2.95.81z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </a>
                <a
                  className="text-gray-300 hover:text-white transition duration-300"
                  href="#"
                >
                  {/* LinkedIn Icon */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 8c-1.5 0-3-1.5-3-3s1.5-3 3-3 3 1.5 3 3-1.5 3-3 3zm-5 1c-1.5 0-3 1.5-3 3s1.5 3 3 3 3-1.5 3-3-1.5-3-3-3zm-3 7h6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </a>
                <a
                  className="text-gray-300 hover:text-white transition duration-300"
                  href="#"
                >
                  {/* Instagram Icon */}
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M22.54 6.42a10.44 10.44 0 01-2.88.79 5.25 5.25 0 002.3-2.89 10.43 10.43 0 01-3.31 1.27 5.22 5.22 0 00-8.93 4.76A14.82 14.82 0 011.67 4.88 5.22 5.22 0 003.49 11.3a5.21 5.21 0 01-2.37-.65v.07a5.22 5.22 0 004.19 5.12 5.22 5.22 0 01-2.36.09 5.22 5.22 0 004.87 3.62 10.48 10.48 0 01-6.48 2.23 10.43 10.43 0 01-1.24-.07 14.8 14.8 0 007.99 2.35c9.6 0 14.84-7.96 14.84-14.85 0-.23 0-.46-.02-.69a10.62 10.62 0 002.6-2.7 10.46 10.46 0 01-2.95.81z"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                    />
                  </svg>
                </a>
              </div>
            </div>
            {/* Newsletter Section */}
            <div className="mb-6 footer-item mt-6">
              <h3 className="text-lg font-semibold mb-2">Newsletter</h3>
              <p className="text-gray-300 mb-4">
                Subscribe to our newsletter for the latest updates and offers.
              </p>
              <form className="flex flex-col">
                <input
                  required
                  className="p-2 rounded-md text-gray-900 mb-2"
                  placeholder="Your email"
                  type="email"
                />
                <button
                  className="bg-white text-black p-2 rounded-md hover:bg-gray-300               transition duration-300"
                  type="submit"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Additional Sections */}
          <div className="mt-12">
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-gray-300 mb-2">
              We are a leading company dedicated to providing innovative
              solutions that empower businesses worldwide. Our team of experts
              works tirelessly to ensure our clients achieve their goals and
              remain competitive in their industries.
            </p>
            <p className="text-gray-300 mb-4">
              With years of experience and a commitment to excellence, we strive
              to deliver value and create lasting relationships with our
              clients.
            </p>
            <h3 className="text-lg font-semibold mb-4">Our Services</h3>
            <ul className="text-gray-300 space-y-2">
              <li>• Web Development</li>
              <li>• Mobile Application Development</li>
              <li>• Digital Marketing</li>
              <li>• Cloud Solutions</li>
              <li>• IT Consulting</li>
              <li>• E-commerce Solutions</li>
            </ul>
          </div>

          {/* Legal Information Section */}
          <div className="mt-12 border-t border-gray-700 pt-6">
            <p className="text-gray-400 text-sm mb-2">
              © {new Date().getFullYear()} Company Name. All rights reserved.
            </p>
            <ul className="flex flex-wrap space-x-4">
              <li>
                <a
                  className="text-gray-400 hover:text-white transition duration-300"
                  href="#"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  className="text-gray-400 hover:text-white transition duration-300"
                  href="#"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  className="text-gray-400 hover:text-white transition duration-300"
                  href="#"
                >
                  Cookie Policy
                </a>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
