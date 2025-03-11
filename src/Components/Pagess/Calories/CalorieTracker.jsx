import React, { useState } from "react";

const CalorieTracker = () => {
  const [formData, setFormData] = useState({
    weight: "",
    age: "",
  });

  const [calories, setCalories] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setCalories(null);
    let token = localStorage.getItem("token")
    try {
      const response = await fetch("http://127.0.0.1:5000/get_calorieGoal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setCalories(data.calories_per_day);
      } 
    } catch (err) {
      setError("Failed to connect to the backend.");
    }

    setLoading(false);
  };

  return (
    <div className=" text-white">
      <div className="ml-auto mr-auto mt-20 w-11/12  md:w-1/2 shadow-2xl bg-[#0A1B2A]  text-white p-8 md:p-10 rounded-3xl space-y-4 ">
        <h2 className="text-2xl font-semibold text-center mb-6">
          Calorie Requirement Calculator
        </h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
        
          <div>
            <label className="block mb-1 text-gray-300">Weight in kg</label>
            <input
              type="number"
              min="1"
              max="200"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-red-300"
              required
            />
          </div>

       
          <div>
            <label className="block mb-1 text-gray-300">Age in years</label>
            <input
              type="number"
              name="age"
              min="1"
              max="100"
              value={formData.age}
              onChange={handleChange}
              className="w-full p-2 bg-gray-700 text-white  rounded-md focus:outline-none focus:ring-2 focus:ring-red-300 "
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#da8888] text-white font-bold rounded focus:outline-none"
            disabled={loading}
          >
            {loading ? "Calculating..." : "Get Calorie Requirement"}
          </button>
        </form>

        {/* Display Result */}
        {calories !== null && (
          <div className="mt-6 p-4 bg-blue-400 rounded-lg text-center text-lg font-semibold">
            Daily Calorie Requirement: {calories} kcal
          </div>
        )}

        {/* Display Error */}
        {error && (
          <div className="mt-4 p-4 bg-red-700 text-white rounded-lg text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalorieTracker;