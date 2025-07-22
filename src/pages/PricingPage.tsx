import React, { useState, useEffect } from "react";
import BreadCrumbNav from "../components/BreadCrumbNav";
import {
  FaWifi,
  FaBed,
  FaTable,
  FaShower,
  FaUtensils,
  FaCheckCircle,
  FaDumbbell,
  FaTv,
  FaWhatsapp,
  FaStethoscope, // Import the medical icon
} from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Whatsapp from "../components/Whatsapp"; // Import the WhatsApp component

export function PricingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<{
    type: string;
    price: number;
    originalPrice: number;
    features: { name: string; icon: JSX.Element }[];
  } | null>(null);
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [moveInDate, setmoveInDate] = useState("");

  // Prevent scrolling when the modal is open
  useEffect(() => {
    if (isModalOpen || isProofModalOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }

    // Cleanup function to remove the class when the component unmounts
    return () => {
      document.body.classList.remove("no-scroll");
    };
  }, [isModalOpen, isProofModalOpen]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation for empty fields
    if (!userName.trim()) {
      toast.error("Please enter your name.");
      return;
    }
    if (!userPhone.trim() || userPhone.length !== 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }
    if (!moveInDate.trim()) {
      toast.error("Please select a check-in date.");
      return;
    }
    if (!transactionId.trim()) {
      toast.error("Please enter the UPI reference number.");
      return;
    }

    // Calculate total amount (Rent + Deposit)
    const totalAmount = selectedPlan ? selectedPlan.price * 2 : 0;

    try {
      const response = await fetch(
        "https://inaraliving-in.onrender.com/api/booking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            planName: selectedPlan?.type ?? "",
            userName,
            userPhone,
            moveInDate,
            transactionId,
            totalAmount, // Include totalAmount in the request payload
          }),
        }
      );

      if (response.ok) {
        toast.success(
          "Booking request submitted! Sit tight, we will confirm your payment and get back to you shortly.",
          {
            position: "top-center",
            autoClose: 6000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        setIsModalOpen(false);
        setIsProofModalOpen(true);
        setUserName("");
        setUserPhone("");
        setmoveInDate("");
        setTransactionId("");
      } else {
        const errorData = await response.json();
        toast.error(errorData.message || "Failed to submit booking request.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error submitting booking request:", error);
      toast.error("An error occurred. Please try again.", {
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
    <div className="min-h-screen bg-[#f9fafb] px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <BreadCrumbNav />
        </div>

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#1f4e5f] mb-8">
          Our Pricing Plans
        </h1>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              type: "Solo Luxe",
              price: 21999,
              originalPrice: 22999,
              features: [
                {
                  name: "Single Bed",
                  icon: <FaBed className="text-[#4f46e5]" />,
                },
                {
                  name: "Study Table",
                  icon: <FaTable className="text-[#4f46e5]" />,
                },
                {
                  name: "Wardrobe",
                  icon: <FaCheckCircle className="text-[#4f46e5]" />,
                },
                {
                  name: "Attached Bathroom",
                  icon: <FaShower className="text-[#4f46e5]" />,
                },
                {
                  name: "WiFi Access",
                  icon: <FaWifi className="text-[#4f46e5]" />,
                },
                {
                  name: "4 Meals/Day",
                  icon: <FaUtensils className="text-[#4f46e5]" />,
                },
                {
                  name: "Gym Access",
                  icon: <FaDumbbell className="text-[#4f46e5]" />,
                },
                {
                  name: "Free Netflix (Recurring)", // Updated Netflix feature
                  icon: <FaTv className="text-[#4f46e5]" />,
                },
                {
                  name: "Medical Assistance",
                  icon: <FaStethoscope className="text-[#4f46e5]" />,
                },
              ],
            },
            {
              type: "Twin Deluxe",
              price: 19999,
              originalPrice: 19999,
              features: [
                {
                  name: "2 Single Beds",
                  icon: <FaBed className="text-[#4f46e5]" />,
                },
                {
                  name: "2 Study Tables",
                  icon: <FaTable className="text-[#4f46e5]" />,
                },
                {
                  name: "2 Wardrobes",
                  icon: <FaCheckCircle className="text-[#4f46e5]" />,
                },
                {
                  name: "Attached Bathroom",
                  icon: <FaShower className="text-[#4f46e5]" />,
                },
                {
                  name: "WiFi Access",
                  icon: <FaWifi className="text-[#4f46e5]" />,
                },
                {
                  name: "4 Meals/Day",
                  icon: <FaUtensils className="text-[#4f46e5]" />,
                },
                {
                  name: "Gym Access",
                  icon: <FaDumbbell className="text-[#4f46e5]" />,
                },
                {
                  name: "Free Netflix (Recurring)", // Updated Netflix feature
                  icon: <FaTv className="text-[#4f46e5]" />,
                },
                {
                  name: "Medical Assistance",
                  icon: <FaStethoscope className="text-[#4f46e5]" />, // Add medical assistance with relevant icon
                },
              ],
            },
            {
              type: "Premium Suite",
              price: 24999,
              originalPrice: 27999,
              features: [
                {
                  name: "King Size Bed",
                  icon: <FaBed className="text-[#4f46e5]" />,
                },
                {
                  name: "Private Workspace",
                  icon: <FaTable className="text-[#4f46e5]" />,
                },
                {
                  name: "Large Wardrobe",
                  icon: <FaCheckCircle className="text-[#4f46e5]" />,
                },
                {
                  name: "Attached Bathroom",
                  icon: <FaShower className="text-[#4f46e5]" />,
                },
                {
                  name: "WiFi Access",
                  icon: <FaWifi className="text-[#4f46e5]" />,
                },
                {
                  name: "4 Meals/Day",
                  icon: <FaUtensils className="text-[#4f46e5]" />,
                },
                {
                  name: "Gym Access",
                  icon: <FaDumbbell className="text-[#4f46e5]" />,
                },
                {
                  name: "Free Netflix (Recurring)", // Updated Netflix feature
                  icon: <FaTv className="text-[#4f46e5]" />,
                },
                {
                  name: "Medical Assistance",
                  icon: <FaStethoscope className="text-[#4f46e5]" />, // Add medical assistance with relevant icon
                },
              ],
            },
          ].map((plan, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 sm:p-8 border border-[#e5e7eb] hover:shadow-xl transition-shadow duration-300 relative"
            >
              {/* Enhanced Offer Badge */}
              <div className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold py-1 px-3 rounded-full shadow-md animate-pulse">
                Limited Deal
              </div>

              <h2 className="text-xl md:text-2xl font-bold text-center mb-4 text-[#1f4e5f]">
                {plan.type}
              </h2>
              <p className="text-3xl md:text-4xl font-bold text-center text-[#1f4e5f] mb-2">
                ₹{plan.price.toLocaleString()}
                <span className="text-sm md:text-base text-[#4b5563]">
                  /month
                </span>
              </p>
              <p className="text-sm text-center text-gray-500 line-through mb-4">
                ₹{plan.originalPrice.toLocaleString()}
              </p>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center text-[#4b5563]">
                    <span className="h-5 w-5 mr-2">{feature.icon}</span>
                    {feature.name}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  setSelectedPlan(plan);
                  setIsModalOpen(true);
                }}
                className="w-full bg-[#1f4e5f] text-white py-2 px-4 rounded-lg hover:bg-[#4f46e5] transition-all duration-300 text-center block"
              >
                Book Now
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Section */}
        <div className="bg-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-12 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-[#1f4e5f] mb-6">
            Why Pay at Inara?
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
                  <th className="py-3 px-4 text-left rounded-tl-lg">Feature</th>
                  <th className="py-3 px-4 text-center">Inara Living</th>
                  <th className="py-3 px-4 text-center rounded-tr-lg">
                    Other PGs/Hostels
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    feature: "Fully Furnished Rooms",
                    inara: true,
                    competitors: false,
                  },
                  { feature: "WiFi Access", inara: true, competitors: false },
                  { feature: "4 Meals/Day", inara: true, competitors: false },
                  { feature: "Gym Access", inara: true, competitors: false },
                  {
                    feature: "Free Netflix (Recurring)",
                    inara: true,
                    competitors: false,
                  },
                  {
                    feature: "Transparent Pricing",
                    inara: true,
                    competitors: false,
                  },
                  { feature: "24/7 Security", inara: true, competitors: true },
                  {
                    feature: "Daily Housekeeping",
                    inara: true,
                    competitors: false,
                  },
                  {
                    feature: "Community Events",
                    inara: true,
                    competitors: false,
                  },
                  { feature: "Power Backup", inara: true, competitors: true },
                  {
                    feature: "Medical Assistance", // Add Medical Assistance
                    inara: true,
                    competitors: false, // Assume competitors don't offer this
                  },
                ].map((row, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td
                      className={`py-3 px-4 ${
                        index === 10 ? "rounded-bl-lg" : "" // Adjust for the last row
                      }`}
                    >
                      {row.feature}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {row.inara ? (
                        <span className="text-green-600 font-bold text-lg">
                          ✔
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold text-lg">
                          ✘
                        </span>
                      )}
                    </td>
                    <td
                      className={`py-3 px-4 text-center ${
                        index === 10 ? "rounded-br-lg" : "" // Adjust for the last row
                      }`}
                    >
                      {row.competitors ? (
                        <span className="text-green-600 font-bold text-lg">
                          ✔
                        </span>
                      ) : (
                        <span className="text-red-600 font-bold text-lg">
                          ✘
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Booking Modal */}
        {isModalOpen && selectedPlan && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-screen overflow-y-auto p-6 space-y-6">
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                ✕
              </button>

              {/* Title */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#1f4e5f] mb-2">
                  Confirm Your Booking
                </h2>
                <p className="text-sm text-gray-500">
                  Secure your spot by making a payment.
                </p>
              </div>

              {/* Payment Details */}
              <div className="space-y-3">
                <div className="bg-gray-100 rounded-lg p-4 text-center">
                  <p className="text-sm text-gray-600 mb-1">
                    Total Amount Payable
                  </p>
                  <p className="text-2xl font-bold text-[#1f4e5f]">
                    ₹{(selectedPlan.price * 2).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    (Includes ₹{selectedPlan.price.toLocaleString()} Rent + an
                    equal Security Deposit)
                  </p>
                </div>

                <div className="bg-gray-100 rounded-lg p-4 relative">
                  <p className="text-sm text-gray-600 mb-1">Pay via UPI ID</p>
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-semibold text-[#1f4e5f] tracking-wide">
                      9568055761@pthdfc
                    </p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText("9568055761@pthdfc");
                        toast.success("UPI ID copied to clipboard!", {
                          position: "top-center",
                          autoClose: 3000,
                          hideProgressBar: true,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                        });
                      }}
                      className="text-sm text-[#1f4e5f] hover:text-indigo-800 transition"
                    >
                      Copy
                    </button>
                  </div>
                </div>

                {/* QR Code */}
                <div className="flex justify-center">
                  <img
                    src="/images/upiQrCode.jpeg"
                    alt="UPI QR Code"
                    className="w-48 h-auto object-cover rounded-md"
                  />
                </div>
              </div>

              {/* Form */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();

                  // Validation for empty fields
                  if (!userName.trim()) {
                    toast.error("Please enter your name.");
                    return;
                  }
                  if (!/^\d{10}$/.test(userPhone.trim())) {
                    toast.error("Please enter a valid 10-digit phone number.");
                    return;
                  }
                  if (!moveInDate.trim()) {
                    toast.error("Please select a check-in date.");
                    return;
                  }
                  if (!transactionId.trim()) {
                    toast.error("Please enter the UPI reference number.");
                    return;
                  }

                  handleBooking(e);
                }}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="userName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="userName"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f4e5f]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="userPhone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone Number
                  </label>
                  <div className="relative flex items-center">
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                      +91
                    </span>
                    <input
                      type="tel"
                      id="userPhone"
                      value={userPhone}
                      onChange={(e) => setUserPhone(e.target.value)}
                      required
                      placeholder="Enter 10-digit number"
                      className="w-full pl-12 mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f4e5f]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="moveInDate"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Move-in Date
                  </label>
                  <input
                    type="date"
                    id="moveInDate"
                    value={moveInDate}
                    onChange={(e) => setmoveInDate(e.target.value)}
                    required
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f4e5f]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="transactionId"
                    className="block text-sm font-medium text-gray-700"
                  >
                    UPI Reference Number
                  </label>
                  <input
                    type="text"
                    id="transactionId"
                    value={transactionId}
                    onChange={(e) => setTransactionId(e.target.value)}
                    required
                    placeholder="Enter UPI reference number"
                    className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1f4e5f]"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    *This can be found in your UPI app after completing the
                    transaction.
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-3 bg-[#1f4e5f] hover:bg-[#163b49] text-white font-semibold rounded-md transition text-center"
                >
                  Submit Booking
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Payment Proof Modal */}
        {isProofModalOpen && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-screen overflow-y-auto p-6 space-y-6">
              {/* Close Button */}
              <button
                onClick={() => setIsProofModalOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
              >
                ✕
              </button>

              {/* Title */}
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#1f4e5f] mb-2">
                  Share Payment Proof
                </h2>
                <p className="text-sm text-gray-500">
                  Please share your payment proof with us on WhatsApp to confirm
                  your booking.
                </p>
              </div>

              {/* WhatsApp Button */}
              <div className="flex justify-center">
                <a
                  href={`https://wa.me/917454943021?text=Hi%20Inara%20Living,%20I%20have%20made%20the%20payment%20for%20my%20booking.%20Here%20is%20the%20proof%20of%20payment.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg flex items-center justify-center space-x-2 transition"
                >
                  <FaWhatsapp />
                  <span>Share on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        )}

        {/* Call-to-Action */}
        <div className="bg-[#1f4e5f] text-white py-8 px-4 sm:px-6 lg:px-8 mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Book Your Stay?</h2>
          <p className="text-lg mb-6">
            Contact us today to secure your spot at Inara Living!
          </p>
          <a
            href="https://wa.me/917454943021?text=Hi%20Inara%20Living,%20I%20want%20to%20know%20more%20about%20your%20pricing%20plans."
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg transition"
          >
            Contact Us on WhatsApp
          </a>
        </div>

        {/* WhatsApp Floating Widget */}
        <Whatsapp message="Hi! I would like to know more about the pricing plans at Inara Living." />
      </div>

      <ToastContainer />
    </div>
  );
}
