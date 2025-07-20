import {
  Wifi,
  ShieldCheck,
  BedDouble,
  Utensils,
  Sparkles,
  Users,
  Dumbbell,
  Tv,
  Bus,
  Fan,
  Coffee,
  DoorOpen,
} from "lucide-react";
import BreadCrumbNav from "../components/BreadCrumbNav";
import { MealPlan } from "../components/MealPlan";
import Whatsapp from "../components/Whatsapp"; // Import the WhatsApp component
import { useState, useEffect } from "react";

// Highlight Images
const highlightImages = [
  { src: "/images/20.jpg", alt: "Common Lounge" },
  { src: "/images/21.jpg", alt: "Daily Running Meals" },
  { src: "/images/22.jpg", alt: "Common Lounge" },
  { src: "/images/23.jpg", alt: "Fitness Area" },
  { src: "/images/24.jpg", alt: "Laundry Service" },
  { src: "/images/8.jpg", alt: "Laundry Service" },
  { src: "/images/9.jpg", alt: "Laundry Service" },
  { src: "/images/10.jpg", alt: "Laundry Service" },
  { src: "/images/11.jpg", alt: "Laundry Service" },
  { src: "/images/12.jpg", alt: "Laundry Service" },
  { src: "/images/13.jpg", alt: "Laundry Service" },
  { src: "/images/14.jpg", alt: "Laundry Service" },
  { src: "/images/15.jpg", alt: "Laundry Service" },
  { src: "/images/16.jpg", alt: "Laundry Service" },
  { src: "/images/17.jpg", alt: "Laundry Service" },
  { src: "/images/18.jpg", alt: "Laundry Service" },
  { src: "/images/19.jpg", alt: "Laundry Service" },
];

const amenities = [
  { icon: BedDouble, title: "Fully Furnished Rooms", description: "Beds, wardrobes, study desks — ready to move in." },
  { icon: Fan, title: "Air Conditioning & Fans", description: "Comfortable in all seasons. Optional heating too." },
  { icon: Wifi, title: "WiFi + Power Backup", description: "High-speed internet & no power cuts. Ever." },
  { icon: DoorOpen, title: "Attached Bathrooms", description: "Clean, private bathrooms in every room." },
  { icon: Utensils, title: "Homemade Meals", description: "4 fresh meals daily. Tea & snacks included." },
  { icon: Coffee, title: "Tea & Coffee Station", description: "Available all day for your caffeine fix." },
  { icon: ShieldCheck, title: "Security + CCTV", description: "24/7 guards, cameras & biometric entry." },
  { icon: Sparkles, title: "Housekeeping + Laundry", description: "Daily cleaning, laundry & dustbin service." },
  { icon: Users, title: "Social Lounge", description: "Chill zone with couches, co-working, and more." },
  { icon: Dumbbell, title: "Fitness Area / Yoga", description: "Stretch or lift – stay healthy at home." },
  { icon: Tv, title: "TV + Entertainment", description: "Watch, stream, and unwind together." },
  { icon: Bus, title: "Metro & Pickup Access", description: "5 mins from DU Metro. Optional pick/drop." },
];

export function AmenitiesPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Auto-slide images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSelectedImage((prev) => (prev + 1) % highlightImages.length);
    }, 5000);

    // Keyboard Navigation for Carousel
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handleArrowClick("left");
      } else if (e.key === "ArrowRight") {
        handleArrowClick("right");
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
      clearInterval(interval);
    };
  }, []);

  // Open and close fullscreen view
  const openFullscreen = (index: number) => {
    setSelectedImage(index);
    setIsFullscreen(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
  };

  // Arrow navigation for the carousel
  const handleArrowClick = (direction: "left" | "right") => {
    setSelectedImage((prev) => {
      if (direction === "left") {
        return prev === 0 ? highlightImages.length - 1 : prev - 1;
      }
      return (prev + 1) % highlightImages.length;
    });
  };

  return (
    <div className="bg-[#f9fafb] px-4 sm:px-6 lg:px-8">
      <BreadCrumbNav />

      {/* Highlight Carousel */}
      <div className="mt-6 mb-12 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-[#1f4e5f]">
          Inara Living Highlights
        </h2>

        {/* Main Image */}
        <div className="w-full h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden mb-4 shadow-lg relative">
          <img
            src={highlightImages[selectedImage].src}
            alt={highlightImages[selectedImage].alt}
            className="object-cover w-full h-full transition-all duration-500"
            loading="lazy"
          />
         {/* Left Arrow */}
<button
  onClick={() => handleArrowClick("left")}
  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full bg-transparent border-2 border-white hover:bg-white hover:text-black transition-all duration-300 w-12 h-12 flex items-center justify-center"
  aria-label="Previous image"
>
  &#8592;
</button>

{/* Right Arrow */}
<button
  onClick={() => handleArrowClick("right")}
  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white p-3 rounded-full bg-transparent border-2 border-white hover:bg-white hover:text-black transition-all duration-300 w-12 h-12 flex items-center justify-center"
  aria-label="Next image"
>
  &#8594;
</button>


        </div>

        {/* Thumbnails Row */}
        <div className="flex overflow-x-auto space-x-3 pb-2">
          {highlightImages.map((img, idx) => (
            <img
              key={idx}
              src={img.src}
              alt={img.alt}
              onClick={() => openFullscreen(idx)}
              className={`w-24 sm:w-28 h-16 sm:h-20 object-cover rounded-lg cursor-pointer transition-transform duration-300 ${
                selectedImage === idx
                  ? "ring-4 ring-indigo-500 scale-105"
                  : "opacity-70 hover:opacity-100"
              }`}
              loading="lazy"
            />
          ))}
        </div>
      </div>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <div
            className="relative max-w-full max-h-full overflow-auto"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking image
          >
            <button
              className="absolute top-4 right-4 text-white text-3xl"
              onClick={closeFullscreen}
            >
              ✕
            </button>
            <img
              src={highlightImages[selectedImage].src}
              alt={highlightImages[selectedImage].alt}
              className="max-w-full max-h-screen object-contain"
              loading="lazy"
            />
          </div>
        </div>
      )}

      {/* Meal Plan Section */}
      <MealPlan />

      {/* Amenities Heading */}
      <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-[#1f4e5f]">
        Curated Amenities for Modern Living
      </h1>
      <p className="text-center text-[#4b5563] max-w-2xl mx-auto mb-12 text-sm sm:text-base">
        Thoughtfully designed spaces & services to make your everyday effortless, comfortable, and joyful.
      </p>

      {/* Playful Amenities Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {amenities.map((item, index) => (
          <div
            key={index}
            className="relative bg-white border border-transparent rounded-[2rem] p-6 shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out transform hover:-translate-y-1 group overflow-hidden"
          >
            {/* Gradient Ring Icon */}
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-tr from-indigo-100 to-pink-100 text-indigo-600 mb-4 shadow-md group-hover:scale-110 transition-transform duration-300">
              <item.icon className="w-6 h-6 text-indigo-500 group-hover:text-indigo-600" />
            </div>

            {/* Title */}
            <h3 className="text-lg sm:text-xl font-semibold text-[#1f4e5f] mb-2 group-hover:underline decoration-indigo-400 underline-offset-4 transition-all">
              {item.title}
            </h3>

            {/* Description */}
            <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>

            {/* Decorative Blurred Badge */}
            <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-indigo-100 rounded-full opacity-20 blur-2xl -z-10" />

            {/* Large Icon Watermark (Optional) */}
            <div className="absolute bottom-4 right-4 opacity-10 text-[60px] pointer-events-none -z-10">
              <item.icon />
            </div>
          </div>
        ))}
      </div>

      {/* WhatsApp Floating Widget */}
      <Whatsapp message="Hi! I would like to know more about the amenities at Inara Living." />
    </div>
  );
}
