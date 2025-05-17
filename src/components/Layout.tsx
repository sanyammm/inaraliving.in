import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Building2,
  DollarSign,
  Phone,
  User,
  Users,
  Info,
  CheckSquare,
  Menu,
  X,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside or scroll
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsMenuOpen(false);
    };

    document.addEventListener("mousedown", handleOutsideClick);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Check if it's the homepage or not
  const isHomepage = location.pathname === "/";
  const isAdminDashboard = location.pathname === "/admin/dashboard";

  return (
    <div className="min-h-screen bg-gray-50">
      {!isAdmin && (
        <nav className="bg-white shadow-sm fixed w-full z-10">
          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              {/* Left Section - Logo */}
              <div className="flex items-center">
                <Link to="/" className="flex items-center">
                  <img
                    src="/images/inaraWhite.webp"
                    alt="Inara Living"
                    className="h-12 w-auto"
                    width="48"
                    height="48"
                  />
                </Link>
              </div>

              {/* Mobile Menu Button & Admin Icon */}
              <div className="flex items-center space-x-4 md:hidden">
                <Link
                  to="/admin/login"
                  className="text-gray-700 hover:text-pink-600 transition-colors duration-500"
                >
                  <User className="h-6 w-6" />
                </Link>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-700 hover:text-pink-600 focus:outline-none"
                >
                  {isMenuOpen ? (
                    <X className="h-6 w-6" />
                  ) : (
                    <Menu className="h-6 w-6" />
                  )}
                </button>
              </div>

              {/* Desktop Navigation Links */}
              <div className="hidden md:flex md:items-center md:space-x-10">
                {[
                  {
                    path: "/rooms",
                    label: "Rooms",
                    icon: <Building2 className="h-5 w-5 inline-block mr-1" />,
                  },
                  {
                    path: "/pricing",
                    label: "Pricing",
                    icon: <DollarSign className="h-5 w-5 inline-block mr-1" />,
                  },
                  {
                    path: "/communities",
                    label: "Communities",
                    icon: <Users className="h-5 w-5 inline-block mr-1" />,
                  },
                  {
                    path: "/amenities",
                    label: "Amenities",
                    icon: <CheckSquare className="h-5 w-5 inline-block mr-1" />,
                  },
                  {
                    path: "/contact",
                    label: "Contact",
                    icon: <Phone className="h-5 w-5 inline-block mr-1" />,
                  },
                  {
                    path: "/about",
                    label: "About Us",
                    icon: <Info className="h-5 w-5 inline-block mr-1" />,
                  },
                ].map(({ path, label, icon }) => (
                  <Link
                    key={path}
                    to={path}
                    className="text-gray-700 hover:text-pink-600 transition-colors duration-500"
                  >
                    {icon} {label}
                  </Link>
                ))}
              </div>

              {/* Right Section - Admin Login (Visible Only on Desktop) */}
              <div className="hidden md:flex items-center">
                <Link
                  to="/admin/login"
                  className="flex items-center text-gray-700 hover:text-pink-600 transition-colors duration-500"
                >
                  <User className="h-5 w-5 mr-1" />
                  <span>Admin</span>
                </Link>
              </div>
            </div>

            {/* Mobile Menu */}
            <div
              ref={menuRef}
              className={`md:hidden bg-white shadow-md absolute top-16 left-0 w-full transition-all duration-300 ${
                isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
              }`}
            >
              <div className="flex flex-col space-y-3 p-4">
                {[
                  { path: "/rooms", label: "Rooms" },
                  { path: "/pricing", label: "Pricing" },
                  { path: "/communities", label: "Communities" },
                  { path: "/amenities", label: "Amenities" },
                  { path: "/contact", label: "Contact" },
                  { path: "/about", label: "About Us" },
                ].map(({ path, label }) => (
                  <Link
                    key={path}
                    to={path}
                    className="block text-gray-700 hover:text-pink-600 transition-colors duration-500"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
      )}

      {/* Content Wrapper with Conditional Top Padding */}
      <main
        className={`mx-auto sm:px-6 lg:px-8 ${
          isHomepage || isAdminDashboard ? "" : "pt-20"
        }`}
      >
        {children}
      </main>
    </div>
  );
}
