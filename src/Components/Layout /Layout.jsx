import React, { useState } from 'react'
import { Link, useNavigate, Outlet } from 'react-router-dom'

import logo from '../../assets/Logo2.svg';

function Layout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* NavBar */}
      <nav className="bg-blue-600 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-[80px] md:h-24">
            
            {/* Left: App Title */}
            <div className="flex-shrink-0">
              <Link to="/" className="font-bold text-xl ">
                <img src={logo} className='w-[60px] md:w-20 '></img>
              </Link>
            </div>

            {/* Hamburger Button (Mobile) */}
            <div className="flex md:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                {/* Simple hamburger icon */}
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

            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8 text-[#C0D26F] text-base  md:text-lg font-semibold">
              <Link to="/" className="hover:text-gray-200">
                Home
              </Link>
              <Link to="/calorie-tracker" className="hover:text-gray-200">
                Calorie Tracker
              </Link>
              <button
                onClick={handleLogout}
                className="hover:text-gray-200"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Mobile dropdown menu */}
        {menuOpen && (
          <div className="md:hidden bg-blue-500">
            <Link
              to="/"
              className="block px-4 py-2 hover:bg-blue-400"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/calorie-tracker"
              className="block px-4 py-2 hover:bg-blue-400"
              onClick={() => setMenuOpen(false)}
            >
              Calorie Tracker
            </Link>
            <button
              onClick={() => {
                setMenuOpen(false)
                handleLogout()
              }}
              className="block w-full text-left px-4 py-2 hover:bg-blue-400"
            >
              Logout
            </button>
          </div>
        )}
      </nav>

      {/* Outlet: Renders child routes (Home, CalorieTracker) */}
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  )
}

export default Layout