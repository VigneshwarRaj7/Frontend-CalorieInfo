import React, { useState } from 'react'
import axios from 'axios'

function CalorieTracker() {
  const [foodInput, setFoodInput] = useState('')
  const [weight, setWeight] = useState('')
  const [custom,setCustom] = useState('')
  const [nutritionData, setNutritionData] = useState(null)
  const [customData,setCustomData] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setNutritionData(null)
    setLoading(true)
    console.log(e)
    try {
      // Example: POST request to your Flask endpoint '/api/nutrition'
      // that expects { food: "chicken sandwich", weight: 100 }
      setCustomData(null)
      const response = await axios.post('http://127.0.0.1:5000/get_nutrition', {
        food: foodInput,
        weight: parseInt(weight),
      })
      console.log(response)
      if(custom){
        try{
          
          const response2 = await axios.post('http://127.0.0.1:5000/get_custom', {
            food: foodInput,
            weight: parseInt(weight),
            custom: custom
          })
           console.log(response2)
           setCustomData(response2.data)
           console.log(customData)
        }
        catch(err){
          setError(err.response.data.error || 'Could not fetch nutrition data.')
        }
      }

      // Suppose the Flask API returns something like:
      // { calories: 300, protein: 20, carbs: 25, fat: 10, ... }
      setNutritionData(response.data)
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || 'Could not fetch nutrition data.')
      } else {
        setError('Network or server error.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-black">
      {/* Optional background overlay for that Netflix vibe */}
      <div className="absolute inset-0 bg-black bg-opacity-70" />

      {/* Page content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-600 mb-6">
          Calorie Tracker
        </h1>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-black bg-opacity-75 text-white p-6 rounded shadow space-y-4"
        >
          <label htmlFor="food-input" className="block font-medium text-gray-400">
            Enter a food or meal description
          </label>
          <input
            id="food-input"
            type="text"
            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="e.g., 'Chicken sandwich'"
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
            required
          />

          <label htmlFor="weight" className="block font-medium text-gray-400">
            Weight in grams (1–1000)
          </label>
          <input
            id="weight"
            type="number"
            min="1"
            max="1000"
            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="e.g., 200"
            value={weight}
            onChange={(e) => 
              setWeight(e.target.value)}
            required
          />

          <label htmlFor="customizations" className="block font-medium text-gray-400">
            Other questions
          </label>
          <input
            id="customizations"
            type="text"
            className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
            placeholder="other queries like, is this healthy or not?"
            value={custom}
            onChange={(e) => 
              setCustom(e.target.value)}
            
          />

          <button
            type="submit"
            className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Submit'}
          </button>
        </form>

        {/* Display error or results */}
        <div className="w-full max-w-md mt-6">
          {error && (
            <div className="p-4 bg-red-100 bg-opacity-10 text-red-500 rounded">
              {error}
            </div>
          )}

          {nutritionData && (
            <div className="p-4 bg-black bg-opacity-75 text-white rounded shadow mt-4">
              <h2 className="text-xl font-bold mb-2 text-red-600">
                Nutrition Info
              </h2>
              <ul className="list-disc list-inside text-gray-200 space-y-1">
           
                {nutritionData.calories && (
                  <li>
                    <strong>Calories:</strong> {nutritionData.calories}
                  </li>
                )}
                {nutritionData.protein && (
                  <li>
                    <strong>Protein:</strong> {nutritionData.protein} g
                  </li>
                )}
                {nutritionData.carbs && (
                  <li>
                    <strong>Carbs:</strong> {nutritionData.carbs} g
                  </li>
                )}
                {nutritionData.fat && (
                  <li>
                    <strong>Fat:</strong> {nutritionData.fat} g
                  </li>
                )}
                {
                    nutritionData.vitamins && (nutritionData.vitamins.map((vitamin,index)=>(
                      <li key={index}>
                          {vitamin.name}:{vitamin.value}
                      </li>)
                    ))
                }
               { customData && (
                  <div className="mt-4">
                    <h2 className="text-xl font-bold mb-2 text-red-600">Custom Info</h2>
                    <ul className="list-disc list-inside text-gray-200 space-y-1">
                      {Object.entries(customData).map(([key, value]) => (
                        <li key={key}>
                          <strong>{key}:</strong> {value.toString()}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CalorieTracker