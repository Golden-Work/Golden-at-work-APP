//import { useState } from 'react'
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
//import Header from './pages/Header';
import ResetPassword from "./pages/ResetPassword/ResetPassword"
import EdicionDeDatos from "./pages/EdicionDeDatos"
import ThemeContextProvider from "./contexts/MUIContext"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <ThemeContextProvider>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Register />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/edit" element={<EdicionDeDatos />} />
          {/* Otras rutas de tu aplicación */}
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </ThemeContextProvider>
  )
}

export default App
