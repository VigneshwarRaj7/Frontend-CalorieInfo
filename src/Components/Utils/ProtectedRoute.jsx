import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token')
  if (!token) {
    return <Navigate to="/login" replace />
  }

  // If there's a token, render the protected layout/pages
  return children
}

export default ProtectedRoute