import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const NutritionChart = () => {
  const nutritionData = {
    calories: 40,
    carbs: 0.5,
    fat: 2,
    fiber: 0,
    protein: 23,
    vitamins: [
      { name: "Vitamin A", value: 100 },
      { name: "Vitamin B12", value: 0.5 },
      { name: "Vitamin D", value: 20 },
      { name: "Riboflavin", value: 0.2 },
      { name: "Niacin", value: 1 },
      { name: "Vitamin E", value: 0.5 },
    ],
  };

  const { calories, protein, carbs, fat, fiber, vitamins } = nutritionData;

  // Convert vitamins list into label-value pairs
  const vitaminNames = vitamins.map((vitamin) => vitamin.name);
  const vitaminValues = vitamins.map((vitamin) => vitamin.value);

  // Main Nutrients Chart Data
  const mainNutrientsData = {
    labels: ["Calories", "Protein (g)", "Carbs (g)", "Fat (g)", "Fiber (g)"],
    datasets: [
      {
        label: "Nutrient Values",
        data: [calories, protein, carbs, fat, fiber],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4CAF50", "#9966FF"],
        borderRadius: 5,
      },
    ],
  };

  // Vitamins Chart Data
  const vitaminsData = {
    labels: vitaminNames,
    datasets: [
      {
        label: "Vitamin Values",
        data: vitaminValues,
        backgroundColor: "#36A2EB",
        borderRadius: 5,
      },
    ],
  };

  // Chart Options
  const chartOptions = {
    indexAxis: "y", // ✅ Makes it a horizontal bar chart
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.raw} per 100g`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { size: 14 }, color: "#fff" },
      },
      y: {
        ticks: { font: { size: 14 }, color: "#fff" },
      },
    },
  };

  // Insights Logic
  const insights = [];
  if (protein > 20) insights.push("🔹 High Protein Content 💪");
  if (carbs > 50) insights.push("🔹 High Carbohydrates - Energy Booster ⚡");
  if (fat > 15) insights.push("🔹 High Fat - Consume Moderately 🥑");
  if (calories > 200) insights.push("🔹 High Calories - Watch Your Intake 🍔");

  return (
    <div className="w-full md:w-4/5 mx-auto text-white font-sans bg-gray-900 p-6 rounded-lg shadow-md shadow-gray-700">
      {/* Title */}
      <h2 className="text-center text-2xl font-semibold tracking-wide mb-6">Nutrition Information</h2>

      {/* Main Nutrients Chart */}
      <div className="h-72 bg-gray-800 rounded-lg p-4 shadow-md shadow-gray-600 mb-8">
        <Bar data={mainNutrientsData} options={chartOptions} />
      </div>

      {/* Vitamin Content */}
      <h3 className="text-center text-2xl font-semibold tracking-wide mb-6">Vitamin Content</h3>
      <div className="h-64 bg-gray-800 rounded-lg p-4 shadow-md shadow-gray-600">
        <Bar data={vitaminsData} options={chartOptions} />
      </div>

      {/* Insights */}
      <h3 className="text-center text-xl font-medium mt-8 mb-4">Insights:</h3>
      <ul className="list-none p-0 text-center">
        {insights.length > 0 ? (
          insights.map((insight, index) => (
            <li
              key={index}
              className="text-lg mb-2 bg-gray-700 text-yellow-400 px-4 py-2 rounded-md inline-block"
            >
              {insight}
            </li>
          ))
        ) : (
          <li className="text-lg italic text-gray-400">No special insights.</li>
        )}
      </ul>
    </div>
  );
};

export default NutritionChart;

