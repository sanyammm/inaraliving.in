import { useState, useEffect } from "react";
import {
  FaBed,
  FaWifi,
  FaUtensils,
  FaShieldAlt,
  FaBroom,
  FaGamepad,
  FaCouch,
  FaBookOpen,
  FaTshirt,
  FaTools,
  FaHourglass,
} from "react-icons/fa";
import { FaHelmetSafety, FaTrophy } from "react-icons/fa6";


const slides = [
  {
    image: "/images/24.jpg",
    headline: "Premium Student Accommodation",
    subheadline: "Fully-furnished homes with all-inclusive amenities",
    cta: "Explore Properties",
    features: [
      { icon: <FaShieldAlt />, text: "24/7 Security" },
      { icon: <FaBroom />, text: "Housekeeping" },
      { icon: <FaWifi />, text: "High-speed WiFi" },
    ],
  },
  {
    image:
      "/images/22.jpg",
    headline: "Live With Your Tribe",
    subheadline: "Vibrant community spaces designed for connections",
    cta: "Book a Tour",
    features: [
      { icon: <FaCouch />, text: "Common Lounges" },
      { icon: <FaGamepad />, text: "Game Zones" },
      { icon: <FaBookOpen />, text: "Study Areas" },
    ],
  },
  {
    image:
      "/images/20.jpg",
    headline: "All-Inclusive Living",
    subheadline: "No hidden charges. Everything included in one rent",
    cta: "View Pricing",
    features: [
      { icon: <FaUtensils />, text: "Meal Plans" },
      { icon: <FaTshirt />, text: "Laundry" },
      { icon: <FaTools />, text: "Maintenance" },
    ],
  },
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { icon: <FaBed className="text-white stroke-[#D4AF37] stroke-[40px]"/>, value: "100+", label: "Beds Prebooked" },
    { icon: <FaHourglass className="text-white stroke-[#D4AF37] stroke-[40px]"/>, value: "80%", label: "Rooms Filled in Prelaunch" },
    {
      icon: <FaTrophy className="text-white stroke-[#D4AF37] stroke-[40px]"/>,
      value: "#1",
      label: "Choice of SRCC & Hansraj Students",
    },
    {
      icon: <FaHelmetSafety className="text-white stroke-[#D4AF37] stroke-[40px]"/>,
      value: "4.9★",
      label: "Rated for Comfort & Safety",
    },
  ];

  return (
    <div className="relative w-full h-[90vh] sm:h-screen overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0 w-full h-full">
        <img
          src={slides[currentSlide].image}
          alt={slides[currentSlide].headline}
          className="w-full h-full object-cover transition-opacity duration-1000"
          style={{ filter: "brightness(0.7)" }}
          loading="eager"
        />
        <div className="absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-0 h-full flex flex-col">
        {/* Main content */}
        <div className="flex-grow flex flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24 pb-16 sm:pb-24">
          <div className="max-w-2xl">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4 leading-tight">
              {slides[currentSlide].headline}
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-200 mb-6 sm:mb-8">
              {slides[currentSlide].subheadline}
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
              {slides[currentSlide].features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center bg-white/30 text-white px-3 py-1 sm:px-4 sm:py-2 rounded-full text-sm sm:text-base"
                >
                  <span className=" mr-1 sm:mr-2">{feature.icon}</span>
                  {feature.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Desktop CTA - Gold & Navy Theme */}
      <div className="hidden lg:block absolute right-6 md:right-12 lg:right-24 top-1/2 transform -translate-y-1/2 z-0 min-w-[320px] w-[22rem]">
        <div className="bg-[#0F172A]/85 backdrop-blur-sm p-5 rounded-xl border border-[#D4AF37]/20 shadow-lg w-73">
          <div className="space-y-3">
            <a
              href="/rooms"
              className="block w-full bg-[#D4AF37] hover:bg-[#B89930] text-[#0F172A] font-medium py-3 px-4 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02] text-center"
            >
              Ready to Move? Start Here
            </a>

            <button
              className="w-full border-2 border-[#D4AF37]/50 text-[#D4AF37] font-medium py-3 px-4 rounded-lg transition-all duration-300 hover:bg-[#D4AF37]/10 hover:border-[#D4AF37]/70"
              onClick={() =>
                window.open(
                  `https://wa.me/917454943021?text=${encodeURIComponent(
                    "Hi! I saw your student accommodation website and would like more information about availability. Please contact me."
                  )}`,
                  "_blank"
                )
              }
            >
              Request Callback
            </button>
          </div>
          <p className="text-xs text-[#D4AF37]/70 mt-4 text-center font-light tracking-wide">
            *Exclusive offers for early applicants
          </p>
        </div>
      </div>

      {/* Mobile CTA */}
      {/* Option 1: Gold & Navy (Most Premium) */}
      <div className="lg:hidden absolute bottom-20 left-0 right-0 px-3 z-0">
        <div className="bg-[#0F172A]/85 backdrop-blur-sm p-3 rounded-lg border border-[#D4AF37]/20 shadow-md mx-auto max-w-xs">
          <div className="flex flex-col sm:flex-row gap-2">
            <a
              href="/rooms"
              className="flex-1 bg-[#D4AF37] hover:bg-[#B89930] text-[#0F172A] font-medium py-2 px-3 rounded-md text-sm transition-all duration-200 shadow-sm hover:shadow-md text-center"
            >
              Ready to Move? Start Here
            </a>
            <button
              className="flex-1 border border-[#D4AF37]/40 text-[#D4AF37] font-medium py-2 px-3 rounded-md text-sm transition-all duration-200 hover:bg-[#D4AF37]/10"
              onClick={() =>
                window.open(
                  `https://wa.me/917454943021?text=${encodeURIComponent(
                    "Hi! I saw your student accommodation website and would like more information about availability. Please contact me."
                  )}`,
                  "_blank"
                )
              }
            >
              Request CallBack
            </button>
          </div>
          <p className="text-[10px] text-[#D4AF37]/80 mt-2 text-center">
            *Exclusive offers for early applicants
          </p>
        </div>
      </div>

      {/* Quick stats bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-md sm:py-3 overflow-hidden">
        <div className="container mx-auto">
          {/* Desktop view - normal grid */}
          <div className="hidden sm:grid grid-cols-4 gap-2 text-white px-4">
            {stats.map((stat, idx) => (
              <div
                key={`desktop-${idx}`}
                className="flex items-center justify-center"
              >
                <span className=" mr-2 text-lg sm:text-xl">{stat.icon}</span>
                <div className="flex items-baseline">
                  <span className="font-bold text-sm sm:text-base mr-1">
                    {stat.value}
                  </span>
                  <span className="text-xs sm:text-sm">{stat.label}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile marquee */}
          <div className="sm:hidden relative h-10 overflow-hidden text-white">
            <div className="absolute top-0 left-0 h-full flex items-center marquee">
              <div className="flex items-center marquee-content">
                {[...stats, ...stats].map((stat, idx) => (
                  <div
                    key={`mobile-${idx}`}
                    className="flex items-center mx-4 shrink-0"
                  >
                    <span className=" mr-2 text-lg ">{stat.icon}</span>
                    <div className="flex items-baseline">
                      <span className="font-bold text-sm mr-1">
                        {stat.value}
                      </span>
                      <span className="text-xs">{stat.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
 
      {/* Dots Slider */}
      <div className="absolute bottom-14 sm:bottom-16 left-0 right-0 flex justify-center gap-2 z-0">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
              currentSlide === idx ? "bg-white/80" : "bg-white/40"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
