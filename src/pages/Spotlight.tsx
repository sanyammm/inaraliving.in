import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";

const testimonials = [
  {
    name: "Aditi Sharma",
    role: "Resident",
    quote:
      "Inara Living has been a game-changer for me! I’ve never felt more safe and comfortable in a PG.",
    image: "/images/profile1.jpg",
  },
  {
    name: "Priya Singh",
    role: "Resident",
    quote:
      "The community events and the friendly environment make Inara Living feel like home.",
    image: "/images/profile2.jpg",
  },
  {
    name: "Neha Verma",
    role: "Resident",
    quote:
      "The amenities and the cleanliness are top-notch. I couldn’t have asked for a better place to stay.",
    image: "/images/profile3.jpg",
  },
  {
    name: "Sakshi Mehta",
    role: "Resident",
    quote:
      "Inara Living has a vibrant community that makes every day exciting!",
    image: "/images/profile4.jpg",
  },
  {
    name: "Niharika Mehta",
    role: "Resident",
    quote:
      "Inara Living isn’t just a place to stay—it’s where I found a vibrant, supportive community that brings joy to everyday life. There’s always something exciting happening here!",
    image: "/images/profile5.jpg",
  },
];

export default function SpotlightCarousel() {
  return (
    <section className="w-full bg-[#f9fafb] py-16 sm:py-24">
      {/* Header */}
      <div className="text-center px-4">
        <h2 className="text-4xl font-bold text-[#1f4e5f] mb-3">
          The <span className="text-[#ec4899]">spotlight</span> on us
        </h2>
        <p className="text-[#4b5563] max-w-2xl mx-auto text-base sm:text-lg">
          We don’t just provide second homes—we create experiences worth talking about. Hear from the amazing women who call our PG their home.
        </p>
      </div>

      {/* Carousel */}
      <div className="mt-12 px-4">
        <Swiper
          effect="coverflow"
          grabCursor
          centeredSlides
          slidesPerView="auto"
          loop
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 120,
            modifier: 2.5,
            slideShadows: false,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
        >
          {testimonials.map((t, idx) => (
            <SwiperSlide
              key={idx}
              className="w-[90%] sm:w-[640px] max-w-[640px]"
            >
              <div className="relative glossy flex flex-col sm:flex-row rounded-2xl overflow-hidden shadow-2xl backdrop-blur-md bg-[#1f4e5f] border border-white/30 transition-transform hover:scale-[1.02] relative">
                {/* Image */}
                <div className="w-full sm:w-1/2 h-[250px] sm:h-[400px]">
                  <img
                    src={t.image}
                    alt={`Photo of ${t.name}`}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Glossy Text Content */}
                <div className="w-full sm:w-1/2 p-6 sm:p-8 bg-transparent text-white flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl sm:text-2xl font-semibold mb-1 text-white">
                      {t.name}
                    </h3>
                    <p className="text-sm text-pink-100 mb-4">[{t.role}]</p>
                    <blockquote className="text-sm sm:text-base leading-relaxed text-white/90">
                      “{t.quote}”
                    </blockquote>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        
      </div>
    </section>
  );
}
