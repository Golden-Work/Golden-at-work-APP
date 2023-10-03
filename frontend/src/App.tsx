//import { useState } from 'react'
import './App.css';
import Home from './pages/Home';
import Login from './pages/Login'; 
import Register from './pages/Register'; 
//import Header from './pages/Header'; 
import ResetPassword2 from './pages/ResetPassword2';
import ResetPassword from './pages/ResetPassword';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />
      {/* <Route path="/Header" element={<Header/>} /> */}
      <Route path="/ResetPassword" element={<ResetPassword/>} />
      <Route path="/ResetPassword2" element={<ResetPassword2/>} />
        {/* Otras rutas de tu aplicación */}
      </Routes>

      </BrowserRouter>
    </>
  );
}

export default App
