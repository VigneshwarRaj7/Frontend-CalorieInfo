import React from 'react'

function Insights(props) {
    const nutritionData = props.data
    const { calories, protein, carbs, fat, fiber, vitamins } = nutritionData;

    const insights = [];
  

    (protein > 20) ? insights.push("🔹 High Protein Content 💪") : insights.push("🔹 Low Protein Content 💪");
    (carbs > 50) ? insights.push("🔹 High Carbohydrates - Energy Booster ⚡") : insights.push("🔹 Low Carbohydrates - Gracb a snickers ⚡") ;
    (fat > 15)  ? insights.push("🔹 High Fat - Consume Moderately 🥑"): insights.push("🔹 Low Fat - Consider a cheesy burger? 🥑");
    (calories > 200) ? insights.push("🔹 High Calories - Watch Your Intake 🍔") :insights.push("🔹 Low Calories - good for weightloss 🍔") ;
    (fiber > 5) ? insights.push("🔹 High Fiber - Good for gut") :insights.push("🔹 Low Fiber - Consider taking some") ;


  return (
    <div className='flex '>
    <ul className="list-none p-0 text-center">
      {insights.length > 0 ? (
        insights.map((insight, index) => (
          <div>
            <li
            key={index}
            className="text-lg mb-2 bg-gray-700 text-yellow-400 px-4 py-2 rounded-md inline-block"
          >
            {insight}
          </li>
          </div>
        ))
      ) : (
        <li className="text-lg italic text-gray-400">No special insights.</li>
      )}
    </ul></div>
  )
}

export default Insights