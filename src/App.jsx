import React from 'react'
import {BrowserRouter as Router, Routers, Route, Navigate } from 'react-router-dom'
import User from './pages/user'
import Admin from './pages/Admin'
import './App.css'

function App() {

  return (
    <>
    <Router>
      <Routers>
        <Route path="/user" element={<User />} />
        <Route path="/admin" element={<Admin />} />
      </Routers>
    </Router>
    </>
  );
}

export default App
