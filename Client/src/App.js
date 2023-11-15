// src/App.js
import React from 'react';
import Login from './Login';
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import UserProfile from "./userProfile"
import UpdateProfile from './profile';
function App() {
  const router =createBrowserRouter([
    {path:'/',element:<Login/>},
    {path:"/page",element:<UserProfile/>},
  {path:"/profile",element:<UpdateProfile/>}])
  return <RouterProvider router={router}/>
    
 
}

export default App;
