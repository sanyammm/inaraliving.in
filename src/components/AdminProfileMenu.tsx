import React, { useState } from "react";
import { Link } from "react-router-dom";

export function AdminProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Profile Icon */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center focus:outline-none"
      >
        <img
          src="https://via.placeholder.com/40"
          alt="Admin Profile"
          className="w-10 h-10 rounded-full"
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg">
          <Link
            to="/admin/login"
            className="block px-4 py-2 text-[#1f4e5f] hover:bg-[#ec4899] hover:text-white"
          >
            Sign In
          </Link>
          <Link
            to="/admin/dashboard"
            className="block px-4 py-2 text-[#1f4e5f] hover:bg-[#ec4899] hover:text-white"
          >
            Dashboard
          </Link>
        </div>
      )}
    </div>
  );
}
