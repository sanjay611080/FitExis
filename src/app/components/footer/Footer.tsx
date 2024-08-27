// components/Footer.js
import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-6">
        <div className="flex flex-wrap justify-between mb-12">
          {/* About Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0 md:pr-6"> {/* Added padding-right for horizontal spacing */}
            <h5 className="text-xl font-semibold mb-4">About FitExis</h5>
            <p className="text-gray-400 leading-relaxed">
              At FitExis, we offer flexible gym memberships on a daily, weekly, or monthly basis. Discover gyms in your area, book sessions, and take your fitness journey to the next level with ease.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0 md:px-20"> {/* Added padding-left and padding-right for horizontal spacing */}
            <h5 className="text-xl font-semibold mb-4">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link href="/About" className="text-gray-400 hover:text-white transition duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/Services" className="text-gray-400 hover:text-white transition duration-300">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/Plans" className="text-gray-400 hover:text-white transition duration-300">
                  Memberships
                </Link>
              </li>
              <li>
                <Link href="/About" className="text-gray-400 hover:text-white transition duration-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/Progress" className="text-gray-400 hover:text-white transition duration-300">
                  Daily Progress
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0 md:pl-6"> {/* Added padding-left for horizontal spacing */}
            <h5 className="text-xl font-semibold mb-4">Contact Us</h5>
            <p className="text-gray-400">New Delhi, India</p>
            <p className="text-gray-400">Email: info@fitexis.com</p>
            <p className="text-gray-400">Contact: (+91) 98689-80710 <br />Contact: (+91) 88822-78139</p>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8">
          <div className="flex justify-center space-x-6 mb-8">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
              <FaFacebookF size={24} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
              <FaTwitter size={24} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
              <FaInstagram size={24} />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition duration-300">
              <FaLinkedinIn size={24} />
            </a>
          </div>

          <div className="text-center">
            <p className="text-gray-500 text-sm">
              &copy; {new Date().getFullYear()} FitExis. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
