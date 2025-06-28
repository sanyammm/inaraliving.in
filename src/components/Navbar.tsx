import { useState } from "react";
import { Link } from "react-router-dom";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#1f4e5f] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="text-2xl font-bold">
              Inara Living
            </Link>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>
          </div>

          {/* Links */}
          <div
            className={`${
              isOpen ? "block absolute top-full left-0 w-full bg-[#1f4e5f] z-10" : "hidden"
            } md:flex flex-col md:flex-row md:space-x-4`}
          >
            <div className="px-4 py-2 space-y-2 md:space-y-0 md:flex md:items-center">
              <Link to="/" className="block hover:text-[#ec4899]">
                Home
              </Link>
              <Link to="/rooms" className="block hover:text-[#4f46e5]">
                Rooms
              </Link>
              <Link to="/pricing" className="block hover:text-[#4f46e5]">
                Pricing
              </Link>
              <Link to="/contact" className="block hover:text-[#4f46e5]">
                Contact
              </Link>
              <Link to="/about" className="block hover:text-[#4f46e5]">
                About
              </Link>
            </div>
          </div>

          {/* Admin Profile Icon */}
          <div className="hidden md:block">
            <Link to="/admin/login">
              <img
                src="https://via.placeholder.com/40"
                alt="Admin Profile"
                className="w-10 h-10 rounded-full"
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}