import { Link } from "react-router-dom";
import BreadCrumbNav from "../components/BreadCrumbNav";
import {
  FaBed,
  FaWifi,
  FaUtensils,
  FaLock,
  FaArrowRight,
  FaBoxes,
  FaWhatsapp,
  FaUser,
  FaUsers,
  FaFire,
  FaStar,
  FaEye,
} from "react-icons/fa";
import Whatsapp from "../components/Whatsapp"; // Adjust the path as needed
import { MdWorkHistory } from "react-icons/md";
import { useState, useEffect } from "react"; // Import useEffect
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Sample data for rooms
export const rooms = [
  {
    id: "1",
    name: "Solo Luxe",
    type: "single",
    price: 21999,
    description: "A cozy single room with all basic amenities.",
    amenities: ["Attached Bathroom", "Study Table", "Single Bed", "Wardrobe"],
    imageUrl: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
    ],
    images: [
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
    available: true,
  },
  {
    id: "2",
    name: "Twin Deluxe",
    type: "double",
    price: 18999,
    description: "Spacious double room perfect for sharing.",
    amenities: [
      "Attached Bathroom",
      "2 Study Tables",
      "2 Single Beds",
      "2 Wardrobes",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&q=80",
    images: [
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
    available: true,
  },
  {
    id: "3",
    name: "Premium Suite",
    type: "suite",
    price: 24999,
    description: "A luxurious suite with premium amenities.",
    amenities: [
      "King Size Bed",
      "Private Workspace",
      "Large Wardrobe",
      "Attached Bathroom",
      "WiFi Access",
      "3 Meals/Day",
      "Personal TV",
    ],
    imageUrl:
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1615874959474-d609969a20ed?auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    ],
    available: true,
  },
];

// Types for the urgency badges

type UrgencyBadge = {
  id: string;
  text: string;
  icon: JSX.Element;
  bgColor: string;
  textColor: string;
  borderColor: string; 
};

export function RoomsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProofModalOpen, setIsProofModalOpen] = useState(false); // State for the second modal
  const [selectedRoom, setSelectedRoom] = useState<{
    id: string;
    name: string;
    type: string;
    price: number;
    description: string;
    amenities: string[];
    imageUrl: string | string[];
    images: string[];
    available: boolean;
  } | null>(null); // Track the selected room
  const [userName, setUserName] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [moveInDate, setmoveInDate] = useState("");
  const [activeBadges, setActiveBadges] = useState<{ [key: string]: number }>(
    {}
  );

  // Define all possible urgency badges
  const urgencyBadges: UrgencyBadge[] = [
    {
      id: "filling-fast",
      text: "Filling fast!",
      icon: <FaFire className="mr-1.5" size={14} />,
      bgColor: "bg-orange-500/20 backdrop-blur-md",
      textColor: "text-white",
      borderColor: "border-orange-400/30"
    },
    {
      id: "visiting-today",
      text: "1 person visiting today",
      icon: <FaUser className="mr-1.5" size={14} />,
      bgColor: "bg-blue-500/20 backdrop-blur-md",
      textColor: "text-white",
      borderColor: "border-blue-400/30"
    },
    {
      id: "almost-full",
      text: "Almost full!",
      icon: <FaUsers className="mr-1.5" size={14} />,
      bgColor: "bg-red-500/20 backdrop-blur-md",
      textColor: "text-white",
      borderColor: "border-red-400/30"
    },
    {
      id: "viewing-now",
      text: "4 people viewing now",
      icon: <FaEye className="mr-1.5" size={14} />,
      bgColor: "bg-purple-500/20 backdrop-blur-md",
      textColor: "text-white",
      borderColor: "border-purple-400/30"
    },
  ];

  // Initialize active badges for each room
  useEffect(() => {
    const initialBadges: { [key: string]: number } = {};
    rooms.forEach((room, index) => {
      initialBadges[room.id] = index % urgencyBadges.length;
    });
    setActiveBadges(initialBadges);

    // Set up rotation of badges
    const interval = setInterval(() => {
      setActiveBadges((prev) => {
        const newBadges = { ...prev };
        Object.keys(newBadges).forEach((roomId) => {
          // Get next badge index, ensuring no two rooms have the same badge
          let nextIndex;
          do {
            nextIndex = Math.floor(Math.random() * urgencyBadges.length);
          } while (
            Object.values(newBadges).includes(nextIndex) &&
            Object.keys(newBadges).length <= urgencyBadges.length
          );

          newBadges[roomId] = nextIndex;
        });
        return newBadges;
      });
    }, 5000); // Rotate every 5 seconds

    return () => clearInterval(interval);
  }, []);

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

    console.log("Selected Room:", selectedRoom);
    console.log("User Name:", userName);
    console.log("User Phone:", userPhone);
    console.log("Move-in Date:", moveInDate);
    console.log("Transaction ID:", transactionId);

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

    // Calculate total amount (Rent + Deposit)
    const totalAmount = (selectedRoom?.price ?? 0) * 2;
    if (totalAmount === 0) {
      toast.error("Invalid room price. Please try again.");
      return;
    }

    console.log("Total Amount:", totalAmount);
    console.log("Room ID being sent:", selectedRoom?.id);

    try {
      const response = await fetch(
        "https://inaraliving-in.onrender.com/api/booking",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomId: selectedRoom?.id ?? "",
            roomName: selectedRoom?.name ?? "",
            roomPrice: selectedRoom?.price ?? 0,
            userName,
            userPhone,
            moveInDate,
            transactionId,
            totalAmount, // Send the calculated total amount to the backend
          }),
        }
      );

      if (response.ok) {
        toast.success(
          "Booking request submitted! Sit tight, we will confirm your payment and get back to you shortly.",
          {
            position: "top-center",
            autoClose: 6000, // Display for 6 seconds
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
        setIsModalOpen(false);
        setIsProofModalOpen(true); // Open the second modal
        setUserName("");
        setUserPhone("");
        setmoveInDate("");
        setTransactionId("");
      } else {
        const errorData = await response.json();
        console.error("API Error Data:", errorData);
        toast.error(
          errorData.message ||
            "Failed to submit booking request, Please try again.",
          {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          }
        );
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

  const amenityIcons: { [key: string]: JSX.Element } = {
    "Attached Bathroom": <FaLock className="text-indigo-600" />,
    "Study Table": <MdWorkHistory className="text-indigo-600" />,
    "Single Bed": <FaBed className="text-indigo-600" />,
    Wardrobe: <FaBoxes className="text-indigo-600" />,
    "2 Study Tables": <MdWorkHistory className="text-indigo-600" />,
    "2 Single Beds": <FaBed className="text-indigo-600" />,
    "2 Wardrobes": <FaBoxes className="text-indigo-600" />,
    "Large Wardrobe": <FaBoxes className="text-indigo-600" />,
    "King Size Bed": <FaBed className="text-indigo-600" />,
    "WiFi Access": <FaWifi className="text-indigo-600" />,
    "3 Meals/Day": <FaUtensils className="text-indigo-600" />,
    "Private Workspace": <MdWorkHistory className="text-indigo-600" />,
    "Personal TV": <FaArrowRight className="text-indigo-600" />,
  };

  return (
    <div className="min-h-screen bg-[#f9fafb] px-4 sm:px-6 lg:px-8 py-8 pt-0">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Navigation */}
        <div className="mb-6">
          <BreadCrumbNav />
        </div>

        {/* Page Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-center text-[#1f4e5f] mb-8">
          Available Rooms
        </h1>

        {/* Rooms Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rooms.map((room) => {
            const currentBadgeIndex = activeBadges[room.id] || 0;
            const currentBadge = urgencyBadges[currentBadgeIndex];

            return (
              <div
                key={room.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col relative overflow-hidden"
              >
                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
                  {/* Preferred by students badge */}
                  <div className="bg-yellow-100 text-yellow-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                    <FaStar className="mr-1 text-yellow-500" />
                    Preferred by students
                  </div>

                  {/* Limited Offer Badge */}
                  <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold py-1 px-2 rounded-full shadow-md">
                    Limited Offer
                  </div>
                </div>


                {/* Image container with overlay */}
              <div className="relative">
                <img
                  src={Array.isArray(room.imageUrl) ? room.imageUrl[0] : room.imageUrl}
                  alt={room.name}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                
                {/* Glass-style Urgency Bar */}
                {currentBadge && (
                  <div className={`absolute bottom-0 left-0 right-0 ${currentBadge.bgColor} ${currentBadge.textColor} ${currentBadge.borderColor} border-t py-2 px-4 flex items-center justify-center transition-all duration-300 backdrop-blur-md`}>
                    <div className="flex items-center text-sm font-medium">
                      {currentBadge.icon}
                      <span className="drop-shadow-sm">{currentBadge.text}</span>
                    </div>
                  </div>
                )}
              </div>

                <div className="p-6 flex flex-col flex-grow">
                  {/* Room Title */}
                  <h2 className="text-xl font-semibold text-[#1f4e5f] mb-1">
                    {room.name}
                  </h2>
                  <p className="text-sm text-[#4b5563] mb-3">
                    {room.description}
                  </p>

                  {/* Amenities */}
                  <div className="mb-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-2">
                      Key Features:
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-[#4b5563]">
                      {room.amenities.slice(0, 4).map((amenity, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {amenityIcons[amenity] ?? <FaArrowRight />}
                          <span>{amenity}</span>
                        </div>
                      ))}
                    </div>
                    <Link
                      to="/amenities"
                      className="text-sm text-[#1f4e5f] hover:text-indigo-800 mt-2 inline-block"
                    >
                      View All Amenities
                    </Link>
                  </div>

                  {/* Pricing */}
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-[#4b5563]">Rent</p>
                      <p className="text-xl font-bold text-[#1f4e5f]">
                        ₹{room.price.toLocaleString()}
                        <span className="text-sm text-gray-500"> /month*</span>
                      </p>
                      <p className="text-sm text-gray-500 line-through">
                        ₹{(room.price + 2000).toLocaleString()}
                      </p>
                    </div>
                    <div className="border-l border-gray-300 pl-4">
                      <p className="text-sm text-[#4b5563]">Deposit</p>
                      <p className="text-sm font-medium text-[#1f4e5f]">
                        ₹{(room.price * 2).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto flex flex-col sm:flex-row gap-3">
                    <button
                      onClick={() => {
                        setSelectedRoom(room);
                        setIsModalOpen(true);
                      }}
                      className="w-full sm:w-1/2 bg-[#1f4e5f] hover:bg-indigo-700 text-white py-2 rounded-md transition text-sm"
                    >
                      Book Now
                    </button>
                    <Link
                      to={`/explore/${room.id}`}
                      className="w-full sm:w-1/2 bg-white border border-[#1f4e5f] text-[#1f4e5f] hover:bg-[#ec4899] hover:text-white transition text-center py-2 rounded-md text-sm"
                    >
                      Explore Room
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* WhatsApp Floating Widget */}
      <Whatsapp message="Hi Inara Living, I want to inquire about room bookings." />

      {/* Booking Modal */}

      {isModalOpen && selectedRoom && (
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
                  ₹{(selectedRoom.price * 2).toLocaleString()}{" "}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  (Includes ₹{selectedRoom.price.toLocaleString()} Rent + an
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
      <ToastContainer />
    </div>
  );
}
