import { useState, useEffect } from "react";

// Spotlight Section Component
function Spotlight() {
  const testimonials = [
    {
      name: "Aditi Sharma",
      comment:
        "Inaरa Living has been a game-changer for me! I’ve never felt more safe and comfortable in a PG.",
      imageUrl:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=500",
    },
    {
      name: "Priya Singh",
      comment:
        "The community events and the friendly environment make Inaरa Living feel like home.",
      imageUrl:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=500",
    },
    {
      name: "Neha Verma",
      comment:
        "The amenities and the cleanliness are top-notch. I couldn’t have asked for a better place to stay.",
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=500",
    },
    {
      name: "Sakshi Mehta",
      comment:
        "Inaरa Living has a vibrant community that makes every day exciting!",
      imageUrl:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=500&q=500",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically change the testimonial every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000); // 5 seconds
    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <section className="text-center py-6 bg-[#f9fafb]">
      <h2 className="text-4xl font-bold text-[#1f4e5f] mb-6">
        The <span className="text-[#ec4899]">spotlight</span> on us
      </h2>
      <p className="text-[#4b5563] mb-12 px-6 max-w-3xl mx-auto">
        We don’t just provide second homes—we create experiences worth talking
        about. Hear from the amazing women who call our PG their home.
      </p>

      {/* Testimonial Carousel */}
      <div className="relative max-w-xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center text-center">
          <img
            src={testimonials[currentIndex].imageUrl}
            alt={testimonials[currentIndex].name}
            className="w-16 h-16 rounded-full object-cover mb-4"
          />
          <h3 className="text-lg font-semibold text-[#1f4e5f] mb-2">
            {testimonials[currentIndex].name}
          </h3>
          <p className="text-sm text-[#4b5563]">
            {testimonials[currentIndex].comment}
          </p>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex
                  ? "bg-[#ec4899]"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Spotlight;
