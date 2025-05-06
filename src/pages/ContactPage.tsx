import { useState } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
} from "lucide-react";
import BreadCrumbNav from "../components/BreadCrumbNav";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export function ContactPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  // Removed unused success state
  // Removed unused error state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name is required.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    // Validate phone number (10 digits only)
    if (!/^\d{10}$/.test(phone)) {
      toast.error("Phone must be a valid 10-digit number.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    if (!message.trim() || message.length > 200) {
      toast.error("Message is required and must be under 200 characters.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone: `+91${phone}`, message }), // Include +91 prefix in the payload
      });

      const data = await res.json();

      if (data.message === "Inquiry submitted") {
        toast.success("Your message has been sent successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setName("");
        setPhone("");
        setMessage("");
      } else {
        toast.error("Failed to send your message. Please try again.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      console.error("Form error:", err);
      toast.error("Something went wrong. Please try again.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="bg-[#f9fafb] min-h-screen">
      {/* Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pt-0">
        <BreadCrumbNav />
      </div>

      {/* Page Title */}
      <h1 className="text-4xl md:text-5xl font-bold text-center text-[#1f4e5f] my-10">
        Contact Us
      </h1>

      {/* Content */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4 sm:px-6 lg:px-8 pb-16">
        {/* Contact Information */}
        <div className="space-y-8">
          <h2 className="text-3xl font-bold text-[#1f4e5f]">Get in Touch</h2>
          <div className="space-y-6 text-[#4b5563]">
            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#1f4e5f]/10 rounded-full">
                <MapPin className="text-[#ec4899] w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg text-[#1f4e5f] font-semibold mb-2">
                  Address
                </h3>
                <a
                  href="https://maps.app.goo.gl/HH536QW55HAyVirV8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#ec4899] transition-colors block"
                >
                  2655 Hudson Lane, Kingsway Camp, GTB Nagar, Delhi - 110009
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#1f4e5f]/10 rounded-full">
                <Phone className="text-[#ec4899] w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg text-[#1f4e5f] font-semibold mb-2">
                  Phone
                </h3>
                <a
                  href="tel:+919568055761"
                  className="hover:text-[#ec4899] transition-colors block"
                >
                  +91 9568055761
                </a>
                <a
                  href="tel:+917454943021"
                  className="hover:text-[#ec4899] transition-colors block"
                >
                  +91 7454943021
                </a>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="p-2 bg-[#1f4e5f]/10 rounded-full">
                <Mail className="text-[#ec4899] w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg text-[#1f4e5f] font-semibold mb-2">
                  Email
                </h3>
                <a
                  href="mailto:inaraliving00@gmail.com"
                  className="hover:text-[#ec4899] transition-colors block"
                >
                  inaraliving00@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Social Media */}
          <div className="pt-4">
            <h3 className="text-xl font-semibold text-[#1f4e5f] mb-5">
              Follow Us
            </h3>
            <div className="flex space-x-5">
              <a
                href="https://www.facebook.com/share/1B2BiavUGH/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#1f4e5f]/10 rounded-full hover:bg-[#ec4899]/10 transition-colors group"
              >
                <Facebook className="w-5 h-5 text-[#1f4e5f] group-hover:text-[#ec4899]" />
              </a>
              <a
                href="https://instagram.com/inara_living"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#1f4e5f]/10 rounded-full hover:bg-[#ec4899]/10 transition-colors group"
              >
                <Instagram className="w-5 h-5 text-[#1f4e5f] group-hover:text-[#ec4899]" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#1f4e5f]/10 rounded-full hover:bg-[#ec4899]/10 transition-colors group"
              >
                <Twitter className="w-5 h-5 text-[#1f4e5f] group-hover:text-[#ec4899]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-[#1f4e5f]/10 rounded-full hover:bg-[#ec4899]/10 transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-[#1f4e5f] group-hover:text-[#ec4899]" />
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h2 className="text-3xl font-bold text-[#1f4e5f] mb-8">
            Send us a Message
          </h2>
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="block text-base font-medium text-[#1f4e5f]"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec4899] focus:border-transparent transition-all"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="phone"
                className="block text-base font-medium text-[#1f4e5f]"
              >
                Phone
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  +91
                </span>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => {
                    const input = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                    setPhone(input);
                  }}
                  required
                  placeholder="Enter 10-digit number"
                  className="w-full pl-12 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec4899] focus:border-transparent transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="block text-base font-medium text-[#1f4e5f]"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={200}
                required
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ec4899] focus:border-transparent transition-all"
              />
              <p className="text-sm text-gray-500">
                Max 200 characters allowed.
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-[#1f4e5f] hover:bg-[#ec4899] text-white py-3 px-6 rounded-lg font-medium text-lg transition-colors duration-300 shadow-md hover:shadow-lg"
            >
              Send Message
            </button>
            {/* Removed unused error message */}
            {/* Removed unused success message */}
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
