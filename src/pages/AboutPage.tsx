import BreadCrumbNav from "../components/BreadCrumbNav";
import Whatsapp from "../components/Whatsapp"; // Import the WhatsApp component

export function AboutPage() {
  const testimonials = [
    {
      name: "Aditi Sharma",
      review:
        "Inara Living has been a game-changer for me! I’ve never felt more safe & comfortable in a PG.",
      imageUrl:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=500",
    },
    {
      name: "Priya",
      review:
        "The community events and the friendly environment make Inara Living feel like home.",
      imageUrl:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=500",
    },
  ];

  return (
    <div className="bg-[#f9fafb]">
      {/* Breadcrumb Navigation */}
      <div className="px-6">
        <BreadCrumbNav />
      </div>

      {/* Page Title */}
      <h1 className="text-4xl font-bold text-center mb-12 text-[#1f4e5f]">
        About Us
      </h1>

      {/* Introduction Section */}
      <div className="max-w-5xl mx-auto px-6 text-center mb-12">
        <p className="text-lg text-[#4b5563] leading-relaxed">
          Welcome to{" "}
          <span className="font-bold text-[#ec4899]">Inara Living</span> – A
          home away from home. We provide safe, comfortable, and fully managed
          accommodations for students and working professionals.
        </p>
      </div>

      {/* Mission & Vision Section */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 gap-12 mb-12">
        {[
          {
            title: "Our Mission",
            text: "We redefine community living by providing safe, comfortable, and vibrant spaces for students and professionals.",
            icon: "🎯",
          },
          {
            title: "Our Vision",
            text: "Finding a PG should be as easy as finding a home. We aim to make that a reality.",
            icon: "🚀",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 text-center hover:shadow-xl transition-all duration-300"
          >
            <div className="text-4xl mb-3">{item.icon}</div>
            <h2 className="text-2xl font-bold text-[#1f4e5f] mb-2">
              {item.title}
            </h2>
            <p className="text-[#4b5563] leading-relaxed">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Core Values Section */}
      <div className="max-w-7xl mx-auto px-6 mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#1f4e5f]">
          Our Core Values
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              title: "Safety First",
              text: "24/7 security & biometric access.",
              icon: "🛡️",
            },
            {
              title: "Community Living",
              text: "A place to connect & grow.",
              icon: "🤝",
            },
            {
              title: "Comfort & Convenience",
              text: "Fully furnished rooms.",
              icon: "🏠",
            },
            {
              title: "Inclusivity",
              text: "Welcoming all backgrounds.",
              icon: "🌍",
            },
            {
              title: "Transparency",
              text: "Clear pricing, no hidden fees.",
              icon: "🔍",
            },
            {
              title: "Sustainability",
              text: "Eco-friendly & energy efficient.",
              icon: "🌱",
            },
          ].map((value, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 text-center hover:shadow-xl transition-all duration-300"
            >
              <div className="text-4xl mb-3">{value.icon}</div>
              <h3 className="text-xl font-bold text-[#1f4e5f] mb-2">
                {value.title}
              </h3>
              <p className="text-[#4b5563]">{value.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Our Journey Section */}
      <div className="max-w-5xl mx-auto px-6 text-center mb-12">
        <h2 className="text-3xl font-bold text-[#1f4e5f] mb-4">Our Journey</h2>
        <p className="text-lg text-[#4b5563] leading-relaxed">
          <span className="font-bold text-[#ec4899]">Inara Living</span> started
          with a simple goal – to redefine PG accommodations.
        </p>
      </div>

      {/* Resident Testimonials Section */}
      <div className="bg-white py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-[#1f4e5f]">
          Resident Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-[#f9fafb] rounded-lg shadow-lg p-6 flex flex-col sm:flex-row items-center sm:space-x-4 text-center sm:text-left hover:shadow-xl transition-all duration-300"
            >
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover mb-4 sm:mb-0"
              />
              <div>
                <h3 className="text-xl font-bold text-[#1f4e5f]">
                  {testimonial.name}
                </h3>
                <p className="text-[#4b5563]">{testimonial.review}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call-to-Action Section */}
      <div className="bg-[#1f4e5f] text-white py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Book a Visit</h2>
          <p className="text-lg mb-8 leading-relaxed">
            Ready to experience <span className="font-bold">Inara Living</span>?
            Schedule a visit now and see how we redefine community living!
          </p>
          <a
            href={`https://wa.me/917454943021?text=Hi%20Inara%20Living,%20I%20would%20like%20to%20schedule%20a%20visit%20to%20your%20property.%20Please%20let%20me%20know%20the%20available%20slots.`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-gradient-to-r from-[#ec4899] to-[#f43f5e] text-white font-semibold rounded-full shadow-lg hover:shadow-xl hover:from-[#f43f5e] hover:to-[#ec4899] transition-all duration-300"
          >
            Schedule a Visit
          </a>
        </div>
      </div>

      {/* WhatsApp Floating Widget */}
      <Whatsapp message="Hi! I would like to know more about Inara Living." />
    </div>
  );
}
