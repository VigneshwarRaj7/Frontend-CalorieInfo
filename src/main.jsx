import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { createBrowserRouter } from 'react-router-dom';

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




// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
