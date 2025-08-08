import React from 'react';
import { Link } from 'react-router-dom';
import { FiInstagram, FiMail } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-light rounded-full flex items-center justify-center">
<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSWO5trvhKokO0_hB2SBXO400gYMEOL8QFzQ&s" alt="" />
              </div>
              <span className="font-heading font-bold text-xl">WaaPickle</span>
            </div>
            <p className="font-body text-light/90 mb-6 leading-relaxed">
              Crafting premium artisanal pickles with traditional recipes and the finest ingredients. 
              Each jar is a perfect blend of authentic flavors and modern quality standards.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-light/20 rounded-full flex items-center justify-center hover:bg-light/30 transition-colors duration-200"
              >
                <FiInstagram size={20} />
              </a>
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-light/20 rounded-full flex items-center justify-center hover:bg-light/30 transition-colors duration-200"
              >
                <FaWhatsapp size={20} />
              </a>
              <a
                href="mailto:hello@picklecraft.com"
                className="w-10 h-10 bg-light/20 rounded-full flex items-center justify-center hover:bg-light/30 transition-colors duration-200"
              >
                <FiMail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Quick Links</h3>
            <nav className="space-y-3">
              <Link
                to="/"
                className="block font-body text-light/90 hover:text-light transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                to="/pickles"
                className="block font-body text-light/90 hover:text-light transition-colors duration-200"
              >
                Our Pickles
              </Link>
              <Link
                to="/contact"
                className="block font-body text-light/90 hover:text-light transition-colors duration-200"
              >
                Contact Us
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Customer Service</h3>
            <nav className="space-y-3">
              <Link
                to="/orders"
                className="block font-body text-light/90 hover:text-light transition-colors duration-200"
              >
                Track Orders
              </Link>
              <Link
                to="/profile"
                className="block font-body text-light/90 hover:text-light transition-colors duration-200"
              >
                My Account
              </Link>
              <a
                href="mailto:support@picklecraft.com"
                className="block font-body text-light/90 hover:text-light transition-colors duration-200"
              >
                Support
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-light/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="font-body text-light/80 text-sm">
            © 2024 PickleCraft. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="font-body text-light/80 hover:text-light text-sm transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-body text-light/80 hover:text-light text-sm transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;