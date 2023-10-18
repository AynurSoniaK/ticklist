import { useEffect, useState } from 'react'
import { UserContext, UserContextProvider } from './context/UserContext';
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/profile'
import TaskDetails from './pages/TaskDetails'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"

function App(): JSX.Element {

  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/taskDetails/:taskDetailsString" element={<TaskDetails />} />
          {/* <Route path="/profile" element={token ? <Profile /> : <Login />} />
      <Route path="/error" element={token ? <ErrorPage /> : <Login />} /> */}
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;