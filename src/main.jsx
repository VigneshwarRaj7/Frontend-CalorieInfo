import { StrictMode } from 'react'

import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';


import './index.css';
import App from './App.jsx';
import Home from './Components/Pagess/Home/Home.jsx';
import CaloriesConsumed from './Components/Pagess/Calories/CalorieTracker.jsx';
import Login from './Components/Pagess/Login/Login.jsx';

const root= ReactDOM.createRoot(document.getElementById('root'))

root.render(
  <StrictMode>
    <App />
  </StrictMode>,
);


