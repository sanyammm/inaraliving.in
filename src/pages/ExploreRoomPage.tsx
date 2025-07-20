import { useParams, Link } from "react-router-dom";
import { rooms } from "./RoomsPage"; // Assuming rooms data is exported from RoomsPage
import { useState, useEffect } from "react";
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaWifi,
  FaUtensils,
  FaTshirt,
  FaBed,
  FaLock,
} from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

export function ExploreRoomPage() {
  const { roomId } = useParams<{ roomId: string }>(); // Get the room ID from the URL
  const room = rooms.find((r) => r.id === roomId); // Find the selected room
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // Track the current image index
  const [showAllPhotos, setShowAllPhotos] = useState(false);

  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
const [lightboxIndex, setLightboxIndex] = useState(0);


  // Sample images - replace with your actual image URLs
  const images = room?.images || [];

  // Auto-rotate images every 5 seconds
  useEffect(() => {
    if (!showAllPhotos) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // 5 seconds
      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [images.length, showAllPhotos]);

  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") setIsLightboxOpen(false);
  };

  document.addEventListener("keydown", handleKeyDown);
  return () => document.removeEventListener("keydown", handleKeyDown);
}, []);


  // Amenities to display
  const amenities = [
    { icon: <FaWifi className="text-blue-500" />, name: "High-Speed WiFi" },
    { icon: <FaUtensils className="text-orange-500" />, name: "4 Meals Daily" },
    { icon: <FaTshirt className="text-green-500" />, name: "Laundry Service" },
    { icon: <FaBed className="text-purple-500" />, name: "Premium Mattress" },
    { icon: <FaLock className="text-red-500" />, name: "24/7 Security" },
    {
      icon: <FaMapMarkerAlt className="text-indigo-500" />,
      name: "15-min Walk to Campus",
    },
  ];

  // Trust badges
  const trustBadges = [
    { value: "50+", label: "Happy Residents" },
    { value: "24/7", label: "Security" },
    { value: "4.9★", label: "Google Rating" },
    { value: "15min", label: "To DU Campus" },
  ];

  if (!room) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md mx-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            Room Not Found
          </h2>
          <p className="text-gray-600 mb-4">
            The requested room doesn't exist or may have been removed.
          </p>
          <Link
            to="/rooms"
            className="inline-block bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
          >
            Browse Available Rooms
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f9fafb]">
      <nav className="py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center space-x-2 text-sm">
          <Link to="/" className="text-indigo-600 hover:text-indigo-800">
            Home
          </Link>
          <IoIosArrowForward className="text-gray-400" />
          <Link to="/rooms" className="text-indigo-600 hover:text-indigo-800">
            Rooms
          </Link>
          <IoIosArrowForward className="text-gray-400" />
          <span className="text-gray-600 truncate max-w-[120px]">
            {room.name}
          </span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Room Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
            {room.name}
          </h1>
          <div className="flex items-center text-gray-600">
            <FaMapMarkerAlt className="mr-1" />
            <span className="text-sm">15 min walk to DU North Campus</span>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="mb-8 relative">
          {showAllPhotos ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {images.map((img, idx) => (
  <img
    key={idx}
    src={img}
    alt={`${room.name} view ${idx + 1}`}
    className="w-full h-64 object-cover rounded-lg shadow-sm cursor-pointer"
    onClick={() => {
      setLightboxIndex(idx);
      setIsLightboxOpen(true);
    }}
  />
))}

            </div>
          ) : (
            <div className="relative">
              <img
                src={images[currentImageIndex]}
                alt={`${room.name} main view`}
                className="w-full h-64 sm:h-96 object-cover rounded-lg shadow-md"
              />
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-3 h-3 rounded-full ${
                      currentImageIndex === idx
                        ? "bg-indigo-600"
                        : "bg-white bg-opacity-70"
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
          <button
            onClick={() => setShowAllPhotos(!showAllPhotos)}
            className="mt-3 text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center"
          >
            {showAllPhotos
              ? "Show main photo"
              : `View all ${images.length} photos`}
          </button>
        </div>

        {/* Pricing Section */}
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start">
            <div>
              <p className="text-gray-500 text-sm">Starting from</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹{room.price.toLocaleString()}
                <span className="text-gray-500 text-sm font-normal">
                  {" "}
                  /month
                </span>
              </p>
              <p className="text-gray-500 text-xs mt-1">
                *Additional charges may apply as per applicable policies
              </p>
            </div>
            <div className="text-right mt-4 sm:mt-0">
              <p className="text-sm text-gray-600">Deposit</p>
              <p className="font-medium text-gray-900">
                ₹{(room.price * 2).toLocaleString()}{" "}
                {/* Assuming deposit is twice the price */}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            {/* Instant Booking Button */}
            <a
              href={`https://wa.me/917454943021?text=Hi%20Inara%20Living,%20I%20want%20to%20book%20${room.name}%20(₹${room.price}/month)`}
              className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition"
            >
              <FaWhatsapp />
              <span>Instant Booking</span>
            </a>

            {/* Reserve Now Button */}
            <a
              href={`https://wa.me/917454943021?text=Hi%20Inara%20Living,%20I%20want%20to%20reserve%20${room.name}%20(₹${room.price}/month)%20for%20my%20stay.%20Please%20let%20me%20know%20the%20next%20steps.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg flex items-center justify-center space-x-2 transition"
            >
              <span>Reserve Now</span>
            </a>
          </div>
          <p className="text-center text-xs text-gray-500 mt-2">
            No advance payment required for reservation
          </p>
        </div>

        {/* Amenities Section */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Room Features
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {amenities.map((item, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-lg border border-gray-200 flex flex-col items-center"
              >
                <span className="text-xl mb-2">{item.icon}</span>
                <p className="text-xs sm:text-sm text-center font-medium text-gray-700">
                  {item.name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-indigo-50 p-4 rounded-lg mb-8">
          <h3 className="font-medium text-indigo-800 mb-2 text-center">
            Why Students Choose Inara
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {trustBadges.map((badge, index) => (
              <div key={index}>
                <p className="text-2xl font-bold text-indigo-600">
                  {badge.value}
                </p>
                <p className="text-xs text-gray-600">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Floating WhatsApp Button */}
        <a
          href={`https://wa.me/919876543210?text=Hi%20Inara%20Living,%20I%20have%20a%20question%20about%20${room.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 bg-green-500 text-white p-3 rounded-full shadow-lg z-50 animate-bounce"
        >
          <FaWhatsapp className="text-2xl" />
        </a>
      </div>
      {isLightboxOpen && (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center">
    <button
      onClick={() => setIsLightboxOpen(false)}
      className="absolute top-6 right-6 text-white text-3xl font-bold z-50 hover:text-red-400"
    >
      ✕
    </button>

    {/* Navigation Buttons */}
    {images.length > 1 && (
      <>
        <button
          onClick={() =>
            setLightboxIndex((lightboxIndex - 1 + images.length) % images.length)
          }
          className="absolute left-4 text-white text-4xl z-50 hover:text-indigo-400"
        >
          ‹
        </button>
        <button
          onClick={() =>
            setLightboxIndex((lightboxIndex + 1) % images.length)
          }
          className="absolute right-4 text-white text-4xl z-50 hover:text-indigo-400"
        >
          ›
        </button>
      </>
    )}

    <img
      src={images[lightboxIndex]}
      alt={`Full view ${lightboxIndex + 1}`}
      className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-lg"
    />
  </div>
)}

    </div>
  );
}
