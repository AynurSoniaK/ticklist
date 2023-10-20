import { useContext } from 'react'
import { UserContext, UserContextProvider } from './context/UserContext';
import './App.css'
import Home from './pages/Home'
import Register from './pages/Register'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Profile from './pages/profile'
import TaskDetails from './pages/TaskDetails'
import {
  Routes,
  Route,
  Navigate,
} from "react-router-dom"

function App(): JSX.Element {

  const userContext = useContext(UserContext)

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            userContext.user ? (
              <Dashboard />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            userContext.user ? (
              <Profile />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route
          path="/taskDetails/:taskDetailsString"
          element={
            userContext.user ? (
              <TaskDetails />
            ) : (
              <Navigate to="/signin" replace />
            )
          }
        />
        <Route path="*" element={<Register />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;