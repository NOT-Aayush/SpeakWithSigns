import React from 'react'
import { Routes, Route } from 'react-router-dom'
import User from './pages/User.jsx'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import Admin from './pages/Admin.jsx'

function App() {

  return (
    <>
    <main className='main-placeholder'>
      <Navbar />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </main>
    </>
  );
}

export default App
