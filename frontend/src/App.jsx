import React, { useEffect } from 'react'
import Navbar from './components/Navbar'
import {Routes,Route, Navigate} from "react-router-dom"
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import ProfilePage from './pages/ProfilePage'
import SettingsPage from './pages/SettingsPage'
import { useAuthstore } from './store/useAuthstore.js'
import {Loader} from "lucide-react"
import {Toaster} from "react-hot-toast"
import { useThemestore } from './store/useThemestore.js'

const App = () => {
  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthstore()
  const {theme}=useThemestore()
  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  
  console.log(authUser)

  if (isCheckingAuth && !authUser) return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"/>
    </div>
  )
  return (
    <div data-theme={theme}>
      <Navbar/>
      <Toaster/>
      <Routes>
        <Route path='/' element={authUser?<HomePage />:<Navigate to="/login"/>} />
        <Route path='/signup' element={!authUser?<SignUpPage />:<Navigate to="/"/>} />
        <Route path='/login' element={!authUser?<LoginPage />:<Navigate to="/"/>} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/profile' element={authUser?<ProfilePage />:<Navigate to="/login"/>} />
      </Routes>

    </div>
  )
}

export default App
