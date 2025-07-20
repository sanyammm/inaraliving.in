import { useState } from "react";
import { FaBreadSlice, FaUtensils, FaCoffee, FaPizzaSlice } from "react-icons/fa";
import { motion } from "framer-motion";

const weeklyMeals = {
  Monday: {
    breakfast: "Poha & Tea",
    lunch: "Rajma Chawal, Salad",
    snacks: "Biscuits & Coffee",
    dinner: "Aloo Paratha & Curd",
  },
  Tuesday: {
    breakfast: "Upma & Coffee",
    lunch: "Paneer Sabzi, Roti, Rice",
    snacks: "Samosa & Tea",
    dinner: "Chole Bhature",
  },
  Wednesday: {
    breakfast: "Idli & Coconut Chutney",
    lunch: "Veg Biryani & Raita",
    snacks: "Maggie & Coffee",
    dinner: "Kadhi Chawal",
  },
  Thursday: {
    breakfast: "Bread Butter & Tea",
    lunch: "Mix Veg, Roti, Rice",
    snacks: "Namkeen & Juice",
    dinner: "Pav Bhaji",
  },
  Friday: {
    breakfast: "Paratha & Pickle",
    lunch: "Dal Makhani, Rice, Salad",
    snacks: "Tea & Bun Maska",
    dinner: "Veg Pulao & Boondi Raita",
  },
  Saturday: {
    breakfast: "Aloo Sandwich & Coffee",
    lunch: "Shahi Paneer, Naan",
    snacks: "Fries & Juice",
    dinner: "Veg Chowmein",
  },
  Sunday: {
    breakfast: "Chole Kulche",
    lunch: "Special Thali (Paneer, Rice, Sweet)",
    snacks: "Pastry & Cold Coffee",
    dinner: "Veg Pizza Night",
  },
};

const icons = {
  breakfast: <FaBreadSlice className="text-2xl text-amber-500" />,
  lunch: <FaUtensils className="text-2xl text-emerald-500" />,
  snacks: <FaCoffee className="text-2xl text-teal-500" />,
  dinner: <FaPizzaSlice className="text-2xl text-rose-500" />,
};

export function MealPlan() {
  const [selectedDay, setSelectedDay] = useState<keyof typeof weeklyMeals>("Monday");

  return (
    <div className="bg-gradient-to-br from-white via-sky-50 to-white rounded-3xl shadow-xl px-6 sm:px-12 py-10 sm:py-14 max-w-6xl mx-auto my-16 border border-gray-200">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1f4e5f] text-center mb-8">
        🍽️ Weekly Meal Plan at Inara
      </h2>

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

      {/* Animated Meal Cards */}
      <motion.div
        key={selectedDay}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 sm:grid-cols-2 gap-6"
      >
        {Object.entries(weeklyMeals[selectedDay]).map(([meal, item]) => (
          <div
            key={meal}
            className="bg-white border border-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300 flex items-start space-x-4"
          >
            <div className="shrink-0 mt-1">{icons[meal as keyof typeof icons]}</div>
            <div>
              <h3 className="capitalize text-lg font-semibold text-gray-800 mb-1">
                {meal}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">{item}</p>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Weekly Surprise Cart Section */}
<div className="bg-gradient-to-r from-pink-50 to-indigo-50 mt-16 rounded-3xl border border-indigo-100 px-6 sm:px-10 py-10 shadow-md max-w-6xl mx-auto text-center">
  <h3 className="text-2xl sm:text-3xl font-extrabold text-[#1f4e5f] mb-4">
    🎁 Weekly Surprise Cart
  </h3>
  <p className="text-gray-700 text-sm sm:text-base max-w-2xl mx-auto mb-6">
    Every week, we roll out a surprise snack cart filled with handpicked goodies 
    based on student favorites — think <span className="font-medium text-indigo-600">croissants, shakes, nachos, donuts,</span> and more!
    Let your taste buds lead the way 🧃🍩🧁
  </p>
  <div className="flex flex-wrap justify-center gap-4">
    {["Donut Day", "Cold Coffee Station", "Mocktail Bar", "French Fries Fiesta"].map((item, idx) => (
      <span
        key={idx}
        className="px-4 py-2 bg-white border border-indigo-200 rounded-full text-sm text-indigo-700 shadow-sm hover:bg-indigo-100 transition"
      >
        {item}
      </span>
    ))}
  </div>
</div>

    </div>
    
  );
}
