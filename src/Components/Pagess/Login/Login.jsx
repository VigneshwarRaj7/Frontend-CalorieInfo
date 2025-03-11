import React, { useState } from 'react'
import axios from 'axios'  // Uncomment for real API calls
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react';
import logo from '../../../assets/konviLogo1.png';
import weighingLogo from '../../../assets/weighingLogo.png'
import banner from '../../../assets/banner.png'

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
        
        const response = await axios.post('http://127.0.0.1:5000/api/auth/login', { email, password })
        const { token } = response.data
        
        localStorage.setItem('token', token)

        navigate('/') 
      } else {
      
        if (password !== confirmPassword) {
          throw new Error('Passwords do not match')
        }
        const response = await axios.post('http://127.0.0.1:5000/api/auth/register', { email, password })
        if (response.data.success)
     
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
    
    <div className="relative min-h-screen bg-gray-700">
      
      <div
            className="absolute h-screen w-full bg-auto bg-repeat"
            style={{ backgroundImage: `url(${banner})`,
            backgroundSize: '650px auto', 
            }}
          >
      </div>
      <div className="absolute inset-0 bg-[#] bg-opacity-60"></div>

     
      <div className="relative px-4 sm:px-8 py-6 flex items-center  justify-between">
        <img src={logo} className='m-4 w-40  rounded-lg shadow-2xl p-2 md:w-56 md:mx-20'></img>
        <img src={weighingLogo} className='w-16 mx-4 -mt-2  md:w-[100px] shadow-2xl md:mx-20 md:mt-2'></img>
      </div>

     
     
      <div className="relative shadow-2xl flex justify-center  items-center px-4 py-8 sm:py-20">
        <div className="max-w-md w-full bg-[#0A1B2A]  bg-opaci text-white p-8 sm:p-10 rounded-3xl">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">
            {isLoginMode ? 'Sign In' : 'Create Account'}
          </h2>

         
          {error && (
            <div className="mb-4 p-2 text-red-500 bg-red-100 bg-opacity-10 rounded">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
         
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-400 text-sm font-bold">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-gray-400 text-sm font-bold">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

      
            {!isLoginMode && (
              <div>
                <label htmlFor="confirm-password" className="block mb-1 text-gray-400 font-bold text-sm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirm-password"
                  className="w-full px-4 py-2 rounded bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-300 "
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            )}

  
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-[#da8888] text-sky-950 font-extrabold rounded"
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

        
          <div className="text-gray-400 font-bold hover:text-[#da8888] text-sm mt-6">
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