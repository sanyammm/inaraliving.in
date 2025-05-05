// components/MealPlan.tsx
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
  breakfast: <FaBreadSlice className="text-indigo-600 mr-2" />,
  lunch: <FaUtensils className="text-indigo-600 mr-2" />,
  snacks: <FaCoffee className="text-indigo-600 mr-2" />,
  dinner: <FaPizzaSlice className="text-indigo-600 mr-2" />,
};

export function MealPlan() {
  const [selectedDay, setSelectedDay] = useState<keyof typeof weeklyMeals>("Monday");

  return (
    <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 max-w-4xl mx-auto mt-12 mb-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-[#1f4e5f] text-center mb-6">
        Weekly Meal Plan 🍽️
      </h2>

      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {Object.keys(weeklyMeals).map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day as keyof typeof weeklyMeals)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
              selectedDay === day
                ? "bg-indigo-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      <motion.div
        key={selectedDay}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-4 text-gray-700"
      >
        {Object.entries(weeklyMeals[selectedDay]).map(([meal, item]) => (
          <div
            key={meal}
            className="flex items-center bg-gray-50 px-4 py-3 rounded-lg shadow-sm"
          >
            <span className="text-lg">{icons[meal as keyof typeof icons]}</span>
            <p className="text-sm sm:text-base font-medium">
              <span className="capitalize mr-2">{meal}:</span> {item}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
