import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import IntroductionPage from './components/IntroductionPage'
import { createBrowserRouter,RouterProvider } from "react-router-dom";


function App() {
  const router = createBrowserRouter([
    {
      path:"/",
      element:<IntroductionPage/>
    },{
      path:"/login",
      element:<Login/>
    }
  ])

  return (
    <>
     
      
      <RouterProvider router={router}/>
      
    </>
  )
}

export default App;
