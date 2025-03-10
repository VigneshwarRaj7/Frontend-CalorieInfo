import React, { useState } from 'react'
import axios from 'axios'  // Uncomment for real API calls
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import logo from '../../../assets/Logo2.svg';

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true)

  // Shared form states
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('') // for registration
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token')
    }
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (isLoginMode) {
        // -----------------------
        // Login Logic
        // -----------------------
        const response = await axios.post('http://127.0.0.1:5000/api/auth/login', { email, password })
        const { token } = response.data
        
        localStorage.setItem('token', token)

        navigate('/') // go to protected home
      } else {
        // -----------------------
        // Registration Logic
        // -----------------------
        // 1) Validate password matches confirmPassword
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match')
        }
        const response = await axios.post('http://127.0.0.1:5000/api/auth/register', { email, password })
        if (response.data.success)
           // Simulate success
           {alert('Registered successfully!')
            setIsLoginMode(true)}
      }
    } catch (err) {
      if (err.response) {
        setError(err.response.data.error || 'Something went wrong.')
      } else {
        setError(err.message || 'Network or server error.')
      }
    } finally {
      setIsLoading(false)
    }
  }
 
  const toggleMode = () => {
    setIsLoginMode(!isLoginMode)
    setError(null)
    setPassword('')
    setConfirmPassword('')
  }

  return (
    
    <div className="relative min-h-screen bg-black">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60"></div>

      {/* Netflix-like Logo at the top */}
      <div className="relative px-4 sm:px-8 py-6 flex items-center justify-between">
        <img src={logo} className='w-16  md:w-28 '></img>
        <h1 className="text-[#C0D26F] text-xl md:text-3xl font-semibold">CALORIE TRACKER</h1>

      </div>

      {/* Centered form container */}
      <div className="relative flex justify-center items-center px-4 py-8 sm:py-20">
        <div className="max-w-md w-full bg-black bg-opacity-75 text-white p-8 sm:p-10 rounded">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            {isLoginMode ? 'Sign In' : 'Create Account'}
          </h2>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2 text-red-500 bg-red-100 bg-opacity-10 rounded">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-400 text-sm">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block mb-1 text-gray-400 text-sm">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm Password if Registering */}
            {!isLoginMode && (
              <div>
                <label htmlFor="confirm-password" className="block mb-1 text-gray-400 text-sm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-600"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-red-600 hover:bg-red-700 text-white font-semibold rounded"
              disabled={isLoading}
            >
              {isLoading
                ? isLoginMode
                  ? 'Signing in...'
                  : 'Creating Account...'
                : isLoginMode
                  ? 'Sign In'
                  : 'Create Account'}
            </button>
          </form>

          {/* Toggle between Login/Register */}
          <div className="text-gray-400 text-sm mt-6">
            {isLoginMode ? (
              <p>
                New to Calorie Tracker?{' '}
                <button onClick={toggleMode} className="text-white hover:underline">
                  Create an account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button onClick={toggleMode} className="text-white hover:underline">
                  Sign In
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login