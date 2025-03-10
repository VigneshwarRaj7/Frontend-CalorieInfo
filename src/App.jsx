import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Pagess/Login/Login'
import Home from './Components/Pagess/Home/Home'
import CalorieTracker from './Components/Pagess/Calories/CalorieTracker'
import ProtectedRoute from './Components/Utils/ProtectedRoute'
import Layout from './Components/Layout /Layout'
import NutritionChart from './Components/Pagess/NutritionChart/NutritionChart'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public route */}
        
        <Route path="/login" element={<Login />} />
         
         
        {/* Protected routes use Layout (with NavBar) */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          {/* Child routes inside Layout */}
          <Route index element={<Home />} />
          <Route path="calorie-tracker" element={<CalorieTracker />} />
          <Route path="nutrition-chart" element={<NutritionChart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App