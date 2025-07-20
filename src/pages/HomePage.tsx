import { useRef, useEffect } from "react";
import { Building2, Wifi, Shield, Utensils } from "lucide-react";
import Spotlight from "./Spotlight";
import Footer from "./Footer";
import Whatsapp from "../components/Whatsapp"; // Import the Whatsapp component
import HeroSection from "./HeroSection";
import { FaHome, FaMapMarkerAlt } from "react-icons/fa";

export function HomePage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const video = videoRef.current;
        if (!video) return;

        if (entry.isIntersecting) {
          video.play().catch((e) => {
            console.warn("Video playback prevented:", e);
          });
        } else {
          video.pause();
        }
      },
      { threshold: 0.5 } // Adjust visibility threshold as needed
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current);
      }
    };
  }, []);

  return (
    <div className="space-y-4 bg-[#f9fafb]">
      {/* Hero Section */}
      <HeroSection />

      {/* Community Living Section */}
      <div className="flex flex-col-reverse sm:flex-row items-center gap-10 px-6">
        <div className="sm:w-1/2 text-center sm:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1f4e5f] mb-6">
            Your{" "}
            <span className="text-[#ec4899] underline-effect">
              Community Living
            </span>{" "}
            Experience Starts Here
          </h2>
          <p className="text-[#4b5563] mb-4">
            Discover <strong className="text-[#ec4899]">Inara Living</strong>,
            where comfort meets convenience.
          </p>
          <p className="text-[#4b5563] mb-4">
            Bring a box full of hopes, dreams, ambitions… and of course, your
            personal belongings. Everything else - furniture, appliances, food -
            has already been taken care of.
          </p>
          <p className="text-[#4b5563]">
            Enjoy furnished rooms, high-speed internet, and vibrant communal
            areas.
          </p>
        </div>
        <div className="sm:w-1/2 flex gap-4 py-5">
          <div className="w-1/2">
            <img
              src="/images/15_1.jpg"
              alt="Community Living"
              className="w-full h-[500px] sm:h-[550px] rounded-lg shadow-md object-cover"
            />
          </div>
          <div className="w-1/2 flex flex-col justify-between gap-4">
            <img
              src="/images/16.jpg"
              alt="Shared Spaces"
              className="w-full h-[240px] sm:h-[265px] rounded-lg shadow-md object-cover"
            />
            <img
              src="/images/19.jpg"
              alt="Comfortable Rooms"
              className="w-full h-[240px] sm:h-[265px] rounded-lg shadow-md object-cover"
            />
          </div>
        </div>
      </div>

      {/* Info Banner Section */}
      <div className="relative bg-gradient-to-b from-gray-200 via-[#ec4899]/60 to-[#1f4e5f]/60 text-white py-8 px-4 sm:py-10 sm:px-6 text-center  w-full shadow-lg overflow-hidden">
        <h3 className="text-2xl sm:text-3xl font-bold mb-4 drop-shadow-md">
          Not Just Four Walls and a Roof
        </h3>
        <p className="text-base sm:text-lg max-w-2xl mx-auto mb-6 drop-shadow-sm">
          Come over and experience how a place to stay can be so much more.
        </p>
        <a
          href="/rooms"
          className="bg-white text-[#1f4e5f] px-6 py-2 sm:px-7 sm:py-2.5 rounded-full shadow-md hover:bg-[#ec4899] hover:text-white transition-all text-sm sm:text-base"
        >
          Explore More
        </a>
      </div>

      {/* Advantages Section */}
      <section className="py-12 px-4 sm:py-16 sm:px-10 relative z-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Subtle intro text */}
          <div className="col-span-full mb-0 text-center">
            <p className="text-sm text-[#6b7280] italic select-none user-select-none">
              See what life at Inara looks like from the inside out…
            </p>
          </div>

          {/* Video Section */}
          <div className="relative group">
            <div className="relative z-10 rounded-xl overflow-hidden shadow-xl transform group-hover:scale-105 transition duration-500">
              <iframe
                width="100%"
                height="800px"
                src="https://www.youtube.com/embed/qh11pt4utP4?autoplay=1&mute=1&loop=1&playlist=qh11pt4utP4"
                title="YouTube video"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="rounded-xl border-4 border-white"
              ></iframe>
            </div>
          </div>

          {/* Text Content */}
          <div className="text-center md:text-left">
            <h2 className="text-4xl sm:text-5xl font-bold text-[#1f4e5f] mb-6">
              Discover the{" "}
              <span className="text-[#ec4899] underline-effect">
                Inara Living
              </span>{" "}
              Advantages
            </h2>
            <p className="text-[#4b5563] text-sm sm:text-base md:text-lg leading-relaxed mb-4 sm:mb-6 max-w-xl mx-auto md:mx-0">
              Choosing{" "}
              <span className="font-semibold text-[#ec4899]">Inara Living</span>{" "}
              means opting for a lifestyle that blends comfort, convenience, and
              community — all under one thoughtfully designed roof.
            </p>
            <ul className="text-[#374151] space-y-3 sm:space-y-4 text-sm sm:text-base max-w-md mx-auto md:mx-0">
              <li className="flex items-center gap-3">
                <FaHome className="text-[#1f4e5f]" />
                Fully furnished, modern rooms
              </li>
              <li className="flex items-center gap-3">
                <FaMapMarkerAlt className="text-[#1f4e5f]" />
                Prime location near Delhi University
              </li>
            </ul>
            <div className="mt-6 sm:mt-8">
              <a
                href="/rooms"
                className="inline-block bg-[#1f4e5f] text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-medium hover:bg-[#ec4899] transition"
              >
                Explore Rooms
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <div className="py-2 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-[#1f4e5f]">
          Why Choose Us?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4 sm:px-6">
          {[
            {
              icon: Building2,
              title: "Prime Location",
              desc: "Near DU campus & transport",
            },
            {
              icon: Wifi,
              title: "High-Speed WiFi",
              desc: "Fast and reliable internet",
            },
            {
              icon: Shield,
              title: "24/7 Security",
              desc: "Peace of mind always",
            },
            {
              icon: Utensils,
              title: "Meals Included",
              desc: "Delicious home-cooked food",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-4 sm:p-6 rounded-xl border shadow-sm hover:shadow-md transition"
            >
              <div className="p-3 mb-3 inline-flex items-center justify-center rounded-full bg-[#1f4e5f]/10">
                <item.icon className="text-[#1f4e5f] w-6 h-6" />
              </div>
              <h4 className="text-base sm:text-lg font-semibold text-[#1f4e5f] mb-2">
                {item.title}
              </h4>
              <p className="text-sm text-[#4b5563]">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Spotlight Section */}
      <div className="px-6">
        <Spotlight />
      </div>

      {/* Google Map Section */}
      <div className="text-center px-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-[#1f4e5f]">
          Visit Us
        </h2>
        <div className="w-full max-w-4xl mx-auto h-[300px] mb-7">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3499.8123634138433!2d77.20485599999999!3d28.695259000000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd9325a067b5%3A0x63dcbc73b06cc9cd!2sInara%20Living%20%E2%80%93%20Girls%20PG%20in%20Hudson%20Lane%20%7C%20North%20Campus%20%7C%20Near%20GTB%20Nagar%20Metro%20Station!5e0!3m2!1sen!2sin!4v1746098766343!5m2!1sen!2sin"
            className="w-full h-full rounded-lg shadow-md"
            allowFullScreen
            loading="lazy"
          ></iframe>
        </div>
        <a
          href="https://wa.me/917454943021?text=I%20want%20to%20book%20a%20room%20visit%20at%20Inara%20Living"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#1f4e5f] text-white px-7 py-3 rounded-full hover:bg-[#ec4899] transition"
        >
          Book a Visit
        </a>
      </div>

      {/* WhatsApp Floating Widget */}
      <Whatsapp message="Hello! I would like to know more about Inara Living and book a visit." />

      {/* Footer */}
      <Footer />
    </div>
  );
}
