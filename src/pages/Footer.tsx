import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

// Desc: Footer Component for the Website
//       This component is used to display the footer section of the website.
const Footer = () => {
  return (
    <footer className="bg-[#111827] text-[#d1d5db] py-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Section - Logo */}
          <div className="flex flex-col items-center md:items-start">
            <img
              src="/images/inaraBlack.webp"
              alt="Inaरa Living"
              className="w-36 mb-4"
            />
            <p className="text-sm text-center md:text-left">
              Creating vibrant, safe, and hassle-free living spaces for students
              and professionals.
            </p>
          </div>

          {/* Center Section - Links */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-sm text-center md:text-left">
            <div>
              <p className="font-semibold text-[#ec4899]">Company</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:text-[#f9fafb]">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#f9fafb]">
                    Team
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#f9fafb]">
                    Media
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[#ec4899]">Resources</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:text-[#f9fafb]">
                    FAQs
                  </a>
                </li>
                <li>
                  <a href="refer" className="hover:text-[#f9fafb]">
                    Refer & Earn
                  </a>
                </li>
                <li>
                  <a href="rules" className="hover:text-[#f9fafb]">
                    House Rules
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-[#ec4899]">Legal</p>
              <ul className="mt-2 space-y-2">
                <li>
                  <a href="#" className="hover:text-[#f9fafb]">
                    T&C
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#f9fafb]">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-[#f9fafb]">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Social Media */}
          <div className="flex flex-col items-center md:items-start">
            <p className="font-semibold text-[#ec4899] mb-4">Follow Us</p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/share/1B2BiavUGH/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d1d5db] hover:text-[#ec4899] transition"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="https://instagram.com//inara_living"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d1d5db] hover:text-[#ec4899] transition"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d1d5db] hover:text-[#ec4899] transition"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d1d5db] hover:text-[#ec4899] transition"
              >
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="border-t border-[#4b5563] mt-8 pt-6 text-sm text-[#d1d5db] px-6 lg:px-12 flex flex-col md:flex-row justify-between items-center md:items-start">
        <p className="text-center md:text-left">
          Copyright © 2025 || All Rights Reserved by Inara Living Pvt Ltd. ||{" "}
          <a
            href="https://maps.app.goo.gl/HH536QW55HAyVirV8"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#ec4899] hover:text-[#f9fafb] transition"
          >
            Sitemap
          </a>
        </p>
        <p className="text-center md:text-right mt-4 md:mt-0">
          Images shown are for representational purposes only. Amenities
          depicted may or may not form a part of that individual property.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
