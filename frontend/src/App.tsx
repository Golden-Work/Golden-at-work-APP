//import { useState } from 'react'
import "./App.css"
import "react-toastify/dist/ReactToastify.css"
import { ToastContainer } from "react-toastify"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
//import Header from './pages/Header';
import ResetPassword2 from "./pages/ResetPassword2"
import ResetPassword from "./pages/ResetPassword"
import EdicionDeDatos from "./pages/EdicionDeDatos"

import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />

        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          {/* <Route path="/Header" element={<Header/>} /> */}
          <Route path="/ResetPassword" element={<ResetPassword />} />
          <Route path="/ResetPassword2" element={<ResetPassword2 />} />
          <Route path="/EdicionDeDatos" element={<EdicionDeDatos />} />
          {/* Otras rutas de tu aplicación */}
          <Route path="/Home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
