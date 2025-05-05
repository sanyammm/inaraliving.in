import BreadCrumbNav from "../components/BreadCrumbNav";
import Whatsapp from "../components/Whatsapp"; // Ensure this path is correct


export function CommunitiesPage() {
  const communities = [
    {
      id: "1",
      name: "Student Community",
      description:
        "A vibrant network of DU students bonding over academics, events, and shared experiences.",
      imageUrl:
        "https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=800&q=80",
      whatsappLink: "https://chat.whatsapp.com/LwX5lAF0IFpESEe7VaeUOA",
    },
    {
      id: "2",
      name: "Working Professionals",
      description:
        "A supportive ecosystem for young professionals to collaborate, network, and grow.",
      imageUrl:
        "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80",
      whatsappLink: "https://chat.whatsapp.com/FIIc9d31jip3b3Kzp2Dvmm",
    },
    {
      id: "3",
      name: "Women’s Community",
      description:
        "A safe, empowering space for women to connect, support, and thrive together.",
      imageUrl:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
      whatsappLink: "https://chat.whatsapp.com/B84dIHBvwjk7Fn1oXryMMh",
    },
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      review:
        "Living at Inara PG has been amazing! The events and friendships made here are unforgettable.",
      imageUrl:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80",
      role: "Student, DU North Campus",
    },
    {
      name: "Anjali Verma",
      review:
        "The roommate matching feature helped me find a true friend! Highly recommend Inara Living.",
      imageUrl:
        "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=500&q=80",
      role: "Working Professional",
    },
  ];

  const pastEvents = [
    {
      title: "Navratri Night 2024",
      description:
        "An evening full of dandiya, music, and vibrant traditional energy.",
      imageUrl:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80",
    },
    {
      title: "Weekend Getaway to Mussoorie",
      description:
        "Relaxing hill escape with breathtaking views and new friendships.",
      imageUrl:
        "https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80",
    },
  ];

  return (
    <div className="bg-[#f9fafb]">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <BreadCrumbNav />
      </div>

      {/* Page Title */}
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1f4e5f]">
        Community at Inara Living
      </h1>

      {/* Community Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-6 mb-16">
        {communities.map((community) => (
          <div
            key={community.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden border border-gray-200"
          >
            <img
              src={community.imageUrl}
              alt={community.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-[#1f4e5f] mb-2">
                {community.name}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                {community.description}
              </p>
              <a
                href={community.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-[#1f4e5f] px-4 py-2 rounded-full hover:bg-[#4f46e5] transition block text-center shadow-lg"
              >
                Join WhatsApp Group
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <section className="bg-white py-16">
        <h2 className="text-3xl font-bold text-center text-[#1f4e5f] mb-10">
          Resident Stories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-[#f1f5f9] rounded-lg shadow p-6 flex items-start gap-4"
            >
              <img
                src={t.imageUrl}
                alt={t.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <h3 className="text-lg font-semibold text-[#1f4e5f]">
                  {t.name}
                </h3>
                <p className="text-sm text-gray-500 italic">{t.role}</p>
                <p className="mt-2 text-gray-700 text-sm">{t.review}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Past Events */}
      <section className="bg-white py-16">
        <h2 className="text-3xl font-bold text-center text-[#1f4e5f] mb-10">
          Event Highlights
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto px-6">
          {pastEvents.map((event, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden shadow border border-gray-200"
            >
              <img
                src={event.imageUrl}
                alt={event.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#1f4e5f] mb-2">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-600">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Community Perks Section */}
      <section className="py-8 bg-[#1f4e5f] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            Perks of the Inara Community
          </h2>
          <p className="text-sm sm:text-base mb-6">
            Enjoy exclusive features like roommate matching & referral rewards!
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-gradient-to-r from-[#ec4899] to-[#f43f5e] px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:from-[#f43f5e] hover:to-[#ec4899] text-white font-semibold transition-all duration-300 w-full sm:w-auto">
              Refer a Friend
            </button>
            <button className="bg-gradient-to-r from-white to-gray-100 text-[#1f4e5f] px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:from-[#ec4899] hover:to-[#f43f5e] hover:text-white font-semibold transition-all duration-300 w-full sm:w-auto">
              Find a Roommate
            </button>
          </div>
        </div>
      </section>
          {/* WhatsApp Floating Widget */}
      <Whatsapp message="Hi! I would like to know more about the communities at Inara Living." />
    </div>
  );
}
