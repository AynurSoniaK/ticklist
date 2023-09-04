import { useEffect, useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

function App(): JSX.Element {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      {/* <Route path="/profile" element={token ? <Profile /> : <Login />} />
      <Route path="/error" element={token ? <ErrorPage /> : <Login />} /> */}
      <Route path="*" element={<Login />} />
    </Routes>
  </BrowserRouter>
);
}

export default App;