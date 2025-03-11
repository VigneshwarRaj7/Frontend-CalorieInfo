import React, { useState } from 'react'
import axios from 'axios'
import NutritionChart from '../NutritionChart/NutritionChart'
import Insights from '../../MiniComponents/Insights'

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
    // setNutritionData(null)
    setLoading(true)
    let token = localStorage.getItem("token")
    console.log(token)
    try {
     
      const response = await axios.post('http://127.0.0.1:5000/get_nutrition', {
        food: foodInput,
        weight: parseInt(weight,10),
      },{headers:{'Authorization':`Bearer ${token}`}})
      
     if(custom){
      const response2 = await axios.post('http://127.0.0.1:5000/get_custom', {
        food: foodInput,
        weight: parseInt(weight),
        custom: custom
      },{headers:{'Authorization':`Bearer ${token}`}})
       
       setCustomData(response2.data)
     }else{
      setCustomData(null)
     }


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
      
      <div    className={`${nutritionData ? " shadow-2xl relative z-10 mt-6  flex flex-col items-center mx-5 md:mx-12 " :" shadow-2xl relative z-10 flex flex-col items-center  mt-12 mx-5 md:mx-[450px]"}`}>
       
      
        <form  
          onSubmit={handleSubmit}
          className={`${nutritionData ? "w-full shadow-2xl bg-[#0A1B2A] bg-opacity-75 text-white p-5 rounded-3xl space-y-4 -mt-4" :"w-full shadow-2xl bg-[#0A1B2A] bg-opacity-75 text-white p-10 rounded-3xl space-y-4"}`}
        >
       {(!nutritionData) && <h1 className="text-3xl sm:text-4xl text-center font-bold text-white mb-6">
          Calorie Tracker
        </h1>}
        <div className={`${nutritionData ? "grid grid-cols-1 sm:grid-cols-3 gap-4 " :" "}`}>
          <div>
          <label htmlFor="food-input"  className={`${nutritionData ? " block font-medium  text-gray-400" :" block font-medium ml-0 m-2 text-gray-400"}`}>
            Enter a food or meal description
          </label>
          <input
            id="food-input"
            type="text"
            className={`${nutritionData ? "w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300 " :"w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300 mb-4"}`}
            placeholder="e.g., 'Chicken sandwich'"
            value={foodInput}
            onChange={(e) => setFoodInput(e.target.value)}
            required
          />
          </div>
          <div>
          <label htmlFor="weight"  className={`${nutritionData ? " block font-medium  text-gray-400" :" block font-medium ml-0 m-2 text-gray-400"}`}>
            Weight in grams (1–1000)
          </label>
          <input
            id="weight"
            type="number"
            min="1"
            max="1000"
            className={`${nutritionData ? "w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300 " :"w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300 mb-4"}`}
            placeholder="e.g., 200"
            value={weight}
            onChange={(e) => 
              setWeight(e.target.value)}
            required
          />
          </div>
          <div>
          <label htmlFor="customizations" className={`${nutritionData ? " block font-medium  text-gray-400" :" block font-medium ml-0 m-2 text-gray-400"}`}>
            Other questions
          </label>
          <input
            id="customizations"
            type="text"
            className={`${nutritionData ? "w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300 " :"w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300 "}`}
            placeholder="other queries like, is this healthy or not?"
            value={custom}
            onChange={(e) => 
            {  setCustom(e.target.value)
            
          }} 
          />
          </div>
        </div >

          <button
            type="submit"
            className="w-full py-3 bg-[#da8888] text-white font-bold rounded focus:outline-none"
            disabled={loading}
          >
            {loading ? 'Fetching...' : 'Submit'}
          </button>
        </form>

        
        <div className="w-full  mt-2 "> 
          {error && (
            <div className="p-4 bg-red-100 bg-opacity-10 text-red-500 rounded">
              {error}
            </div>
          )}

          {nutritionData && (
            <div className=''>
              <h2 className="text-3xl mt-2 font-bold text-center text-white">Nutrition Info</h2>   
              <div className=" py-4 md:flex md:flex-col-2  bg-[#0A1B2A] bg-opacity-75   text-white rounded-3xl shadow-3xl mt-4">
                
          
                        <div className="p-4 md:w-1/2 md:flex md:flex-col  text-white mt-4 ">
                        
                        <div className='md:flex md:flex-row '>
                          <div className='ml-20 md:ml-32 w-1/2 '>
                          
                              <ul className=" space-y-2 pl-4 text-gray-200 ">
                                {nutritionData.calories ? (
                                  <li>
                                    <strong>Calories:</strong> {nutritionData.calories} 
                                  </li>
                                ): " "}
                                {nutritionData.protein ? (
                                  <li>
                                    <strong>Protein:</strong> {nutritionData.protein} g
                                  </li>
                                ):""}
                                {nutritionData.carbs ? (
                                  <li>
                                    <strong>Carbs:</strong> {nutritionData.carbs} g
                                  </li>
                                ): ""}
                                {nutritionData.fat ? (
                                  <li>
                                    <strong>Fat:</strong> {nutritionData.fat} g
                                  </li>
                                ):""}
                                {nutritionData.fiber ? (
                                  <li>
                                    <strong>Fiber:</strong> {nutritionData.fiber} g
                                  </li>
                                ):""}

                                {nutritionData.vitamins &&
                                  nutritionData.vitamins.map((vitamin, index) => (
                                    <li key={index}><strong> 
                                      {vitamin.name}: {vitamin.value}
                                      </strong>
                                    </li>
                                  ))}
                              </ul>
                              </div>

                              {customData && (
                                <div className="mb-6 mt-4 md:mt-0 md:w-1/2">
                                <ul className=''>
                                    {Object.entries(customData).map(([key, value]) => ( 
                                      <li key={key}>
                                        <strong>{key}:</strong> {value.toString()}
                                      </li>
                                    ))}
                                </ul>
                                </div>
                              )}
                        </div>

                        <div className=' mx-auto ml-auto mr-auto md:mt-24'><Insights data={nutritionData}/></div>
                      

                        
                        </div>

        
                        <div className='md:w-1/2'>{
                            <NutritionChart data={nutritionData}/>
                          }
                        </div>
                
                
                
                
              </div>
            </div>
          )}
        </div>
      </div>
      

  )
}

export default CalorieTracker

// {`${nutritionData ? "" :""}`}