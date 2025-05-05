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

export function AmenitiesPage() {
  const amenities = [
    {
      icon: BedDouble,
      title: "Fully Furnished Rooms",
      description: "Beds, wardrobes, study desks — ready to move in.",
    },
    {
      icon: Fan,
      title: "Air Conditioning & Fans",
      description: "Comfortable in all seasons. Optional heating too.",
    },
    {
      icon: Wifi,
      title: "WiFi + Power Backup",
      description: "High-speed internet & no power cuts. Ever.",
    },
    {
      icon: DoorOpen,
      title: "Attached Bathrooms",
      description: "Clean, private bathrooms in every room.",
    },
    {
      icon: Utensils,
      title: "Homemade Meals",
      description: "4 fresh meals daily. Tea & snacks included.",
    },
    {
      icon: Coffee,
      title: "Tea & Coffee Station",
      description: "Available all day for your caffeine fix.",
    },
    {
      icon: ShieldCheck,
      title: "Security + CCTV",
      description: "24/7 guards, cameras & biometric entry.",
    },
    {
      icon: Sparkles,
      title: "Housekeeping + Laundry",
      description: "Daily cleaning, laundry & dustbin service.",
    },
    {
      icon: Users,
      title: "Social Lounge",
      description: "Chill zone with couches, co-working, and more.",
    },
    {
      icon: Dumbbell,
      title: "Fitness Area / Yoga",
      description: "Stretch or lift – stay healthy at home.",
    },
    {
      icon: Tv,
      title: "TV + Entertainment",
      description: "Watch, stream, and unwind together.",
    },
    {
      icon: Bus,
      title: "Metro & Pickup Access",
      description: "5 mins from DU Metro. Optional pick/drop.",
    },
  ];

  return (
    <div className="bg-[#f9fafb] px-4 sm:px-6 lg:px-8">
      <BreadCrumbNav />

      {/* Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-[#1f4e5f]">
        All the Amenities You Need
      </h1>
      <p className="text-center text-[#4b5563] max-w-2xl mx-auto mb-10 text-sm sm:text-base">
        From fully furnished rooms to fresh meals, we've got every comfort
        covered so you can focus on what matters.
      </p>

      {/* Amenities Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {amenities.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex items-center mb-3">
              <item.icon className="w-6 h-6 text-indigo-600 mr-3" />
              <h2 className="font-semibold text-[#1f4e5f] text-lg">
                {item.title}
              </h2>
            </div>
            <p className="text-[#4b5563] text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Meal Plan Section */}
      <MealPlan />

      {/* CTA */}
      <div
        className="py-12 bg-[#1f4e5f] text-white text-center mt-16 rounded-lg"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=800&q=80")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="bg-[#1f4e5f]/70 p-6 sm:p-10 rounded-lg max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            Comfort. Convenience. Community.
          </h2>
          <p className="mb-5 text-sm sm:text-base">
            Join a space that feels like home. Limited spots left — book your
            room today!
          </p>
          <button className="bg-[#ec4899] text-white px-6 py-3 rounded-lg hover:bg-white hover:text-[#1f4e5f] transition font-medium">
            Book Now
          </button>
        </div>
      </div>

      {/* WhatsApp Floating Widget */}
      <Whatsapp message="Hi! I would like to know more about the amenities at Inara Living." />
    </div>
  );
}
