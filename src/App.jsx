import React from 'react'
import { Routes, Route } from 'react-router-dom'
import User from './pages/User.jsx'
import Admin from './pages/Admin.jsx'
import Navbar from './components/Navbar.jsx'

function App() {

  return (
    <>
    <main className='main-placeholder'>
      <Navbar />
      <Routes>
        <Route path="/" element={<User />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </main>
    </>
  );
}

export default App
