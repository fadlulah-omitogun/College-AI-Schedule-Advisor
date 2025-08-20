import { useState } from "react";
import { Menu, X } from "lucide-react"; // Hamburger & close icons
import logo from "./assets/logo_placeholder.png"; // adjust path if needed

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo + Title */}
          <div>
            <a href="/" className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Logo"
                className="w-10 h-10 rounded-lg object-cover"
              />
              <h1 className="text-xl font-bold">College AI Schedule Advisor</h1>
            </a>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#features" className="hover:text-gray-300">
              Features
            </a>
            <a href="#about" className="hover:text-gray-300">
              About Us
            </a>
            <a href="#pricing" className="hover:text-gray-300">
              Pricing
            </a>
            <a href="#login" className="hover:text-gray-300">
              Login
            </a>
            <a
              href="#signup"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white"
            >
              Sign Up
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="flex flex-col space-y-4 px-4 py-4">
            <a href="#features" className="hover:text-gray-300">
              Features
            </a>
            <a href="#about" className="hover:text-gray-300">
              About Us
            </a>
            <a href="#pricing" className="hover:text-gray-300">
              Pricing
            </a>
            <a href="#login" className="hover:text-gray-300">
              Login
            </a>
            <a
              href="#signup"
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-white w-fit"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
