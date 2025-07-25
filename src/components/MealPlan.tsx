import { useState } from "react";
import { motion } from "framer-motion";

// Image sources
const images = [
  "/images/menuinara-1.png", //0 Inara Ki Rasoi (Kitchen Name)
  "/images/menuinara-2.png", //1 Kitchen Instructions
  "/images/menuinara-3.png", //2 Sunday
  "/images/menuinara-4.png", //3 Monday
  "/images/menuinara-5.png", //4 Tuesday
  "/images/menuinara-6.png", //5 Wednesday
  "/images/menuinara-7.png", //6 Thursday
  "/images/menuinara-8.png", //7 Friday
  "/images/menuinara-9.png", //8 Saturday
];

const weeklyMeals = {
  Monday: { mealImg: images[3] },
  Tuesday: { mealImg: images[4] },
  Wednesday: { mealImg: images[5] },
  Thursday: { mealImg: images[6] },
  Friday: { mealImg: images[7] },
  Saturday: { mealImg: images[8] },
  Sunday: { mealImg: images[2] },
};

export function MealPlan() {
  const [selectedDay, setSelectedDay] = useState<keyof typeof weeklyMeals>("Monday");
  const [imageLoaded, setImageLoaded] = useState(false); // To track image load

  return (
    <div className="bg-gradient-to-br from-white via-sky-50 to-white rounded-3xl shadow-xl px-6 sm:px-12 py-10 sm:py-14 max-w-6xl mx-auto my-16 border border-gray-200">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1f4e5f] text-center mb-8">
        🍽️ Weekly Meal Plan at Inara
      </h2>

      {/* Kitchen Name and Kitchen Instructions Images Side by Side */}
      <div className="mb-10 grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Kitchen Name Image */}
        <div className="flex justify-center">
          <img
            src={images[0]}
            alt="Inara Ki Rasoi"
            className="max-w-full h-auto rounded-lg"
          />
        </div>

        {/* Kitchen Instructions Image */}
        <div className="flex justify-center">
          <img
            src={images[1]}
            alt="Kitchen Instructions"
            className="max-w-full h-auto rounded-lg"
          />
        </div>
      </div>

      {/* Day Buttons */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {Object.keys(weeklyMeals).map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day as keyof typeof weeklyMeals)}
            className={`px-4 py-2 text-sm sm:text-base rounded-full font-semibold transition-all shadow-sm ${
              selectedDay === day
                ? "bg-indigo-600 text-white shadow-md"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Animated Meal Image for Selected Day */}
      <motion.div
        key={selectedDay}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{
          opacity: imageLoaded ? 1 : 0, 
          scale: imageLoaded ? 1 : 0.95
        }} // Smooth scale and opacity transition
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex justify-center items-center mb-10"
      >
        {/* Meal Image */}
        <div className="w-full sm:w-10/12 md:w-8/12 lg:w-6/12 flex justify-center items-center relative">
          {/* Placeholder (Skeleton Loader) */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" />
          )}
          <img
            src={weeklyMeals[selectedDay].mealImg}
            alt={`${selectedDay} Meal`}
            className="w-full h-auto sm:h-auto md:h-auto object-cover rounded-lg"
            onLoad={() => setImageLoaded(true)} // Set image as loaded
          />
        </div>
      </motion.div>

      {/* Weekly Surprise Cart Section */}
      <motion.div
        key="surpriseCart"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="bg-gradient-to-r from-pink-50 to-indigo-50 mt-16 rounded-3xl border border-indigo-100 px-6 sm:px-10 py-10 shadow-md max-w-6xl mx-auto text-center"
      >
        <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1f4e5f] mb-4">
          🎁 Weekly Surprise Cart
        </h3>
        <p className="text-gray-700 text-sm sm:text-base max-w-2xl mx-auto mb-6">
          Every week, we roll out a surprise snack cart filled with handpicked
          goodies based on student favorites — think{" "}
          <span className="font-medium text-indigo-600">
            croissants, shakes, nachos, donuts,
          </span>{" "}
          and more! Let your taste buds lead the way 🧃🍩🧁
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            "Desi Chaat",
            "Theeka Gol Gappa",
            "Donut Day",
            "Cold Coffee Station",
            "Mocktail Bar",
            "French Fries Fiesta",
            "Nacho Night",
            "Croissant Craze",
            "Shakes & Smoothies",
            "Pizza Party",
            "Pasta Perfection",
          ].map((item, idx) => (
            <span
              key={idx}
              className="px-4 py-2 bg-white border border-indigo-200 rounded-full text-sm text-indigo-700 shadow-sm hover:bg-indigo-100 transition"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
