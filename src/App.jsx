import React from 'react'
import {BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import User from './pages/User.jsx'
import Admin from './pages/Admin.jsx'
import Webcam from 'react-webcam'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
    </>
  );
}

export default App
