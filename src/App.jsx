// This file contains all the routes.
// Routing has been done in a way to provide Single Page Application
// All the child routes are enclosed in Layout in ProtectedRoute ensuring security.

import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './Components/Pagess/Login/Login'
import Home from './Components/Pagess/Home/Home'
import CalorieGuide from './Components/Pagess/Calories/CalorieTracker'
import ProtectedRoute from './Components/Utils/ProtectedRoute'
import Layout from './Components/Layout /Layout'
import NutritionChart from './Components/Pagess/NutritionChart/NutritionChart'
import Insights from './Components/MiniComponents/Insights'

function App() {
  return (
    <BrowserRouter>
      <Routes>  
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="calorie-tracker" element={<CalorieGuide />} />
          <Route path="nutrition-chart" element={<NutritionChart />} />
          <Route path="insights" element={<Insights />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App