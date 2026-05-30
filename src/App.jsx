import React from 'react'
import { Routes, Route } from 'react-router-dom'
import User from './pages/User.jsx'
import Login from './pages/Login.jsx'
import Navbar from './components/Navbar.jsx'
import Admin from './pages/Admin.jsx'
import Edit from './pages/Edit.jsx'

function App() {

  return (
    <>
    <main className='main-placeholder'>
      <Navbar />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/edit" element={<Edit />} />
      </Routes>
    </main>
    </>
  );
}

export default App
