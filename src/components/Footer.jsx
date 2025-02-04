import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 text-black py-6 mt-auto">
      <div className="container mx-auto px-4">
        {/* Upper Section */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="mb-4 md:mb-0">
            <h2 className="text-lg font-bold">About Us</h2>
            <p className="text-sm text-gray-700">
              We are committed to providing the best services and products to
              our customers.
            </p>
          </div>
          <div className="flex gap-4">
            <a
              href="https://www.facebook.com/tee.tps"
              className="text-gray-700 hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="#"
              className="text-gray-700 hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com/sirtee_xyz/"
              className="text-gray-700 hover:text-black"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-gray-300 mb-4" />

        {/* Lower Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-700">
            &copy; 2025 YourCompany. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-700 hover:text-black text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-700 hover:text-black text-sm">
              Terms of Service
            </a>
            <a href="#" className="text-gray-700 hover:text-black text-sm">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
