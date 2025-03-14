import React, { useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'

import KonviLogo from '../../assets/konviLogo1.png';

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-800">
    
      <nav className=" md:mt-4 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[80px] md:h-24">
            
          
            <div className="f-0">
              <Link to="/" className="font-bold text-xl ">
                <img src={KonviLogo} className='m-4 w-40  rounded-lg shadow-2xl p-2 md:w-56 md:mx-20  '></img>
              </Link>
            </div>

        
            <div className="flex md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
        
                <svg
                  className="h-10 w-10"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                </svg>
              </button>
            </div>

         
            <div className="hidden md:flex space-x-8 text-white text-base  md:text-lg font-semibold">
              <Link to="/" className="hover:bg-red-300 bg-[#0A1B2A] border-red-300" id='btn'>
                Home
              </Link>
              <Link to="/calorie-tracker" className="hover:bg-red-300  border-red-300 bg-[#0A1B2A]" id='btn'>
                Calorie Guide
              </Link>
              <button
                onClick={handleLogout}
                className="hover:bg-red-300 bg-[#0A1B2A]  border-red-300" id='btn'
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden text-center">
            <Link
              to="/"
              className="block px-4 py-2 "
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/calorie-tracker"
              className="block px-4 py-2 "
              onClick={() => setMenuOpen(false)}
            >
              Calorie Tracker
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false)
                handleLogout()
              }}
              className="block w-full  px-4 py-2 "
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout