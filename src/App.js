import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useSound from 'use-sound'
import Home from './component/Home'
import Login from './component/Login'
import Register from './component/Register'
import ForgotPassword from './component/ForgotPassword'
import ResetPassword from './component/ResetPassword'
// --------user------------
import UserSidebar from './component/UserSidebar'
import Dashboard from './page/user/Dashboard'
import Upload from './page/user/Upload'
import Overview from './page/user/Overview'
import OverviewCredit from './page/user/OverviewCredit'
import BuyCredit from './page/user/BuyCredit'
import Profile from './page/user/Profile'
import Support from './page/user/Support'
import Policy from './page/user/Policy'
// --------admin------------
import AdminSidebar from './component/AdminSidebar'
import AdminDashboard from './page/AdminDashboard'
import Users from './page/AdminRegister'
import AdminUpload from './page/AdminUpload'
import AdminService from './page/AdminService'
import AdminCreditlist from './page/AdminCreditlist'
import AdminPricelist from './page/AdminPricelist'
import AdminProfile from './page/AdminProfliesetting'
import AdminInvoice from './page/AdminInvoice'
import AdminSupport from './page/AdminSupport'
import { setAccountData } from './features/account/account'
import soundSrc from './assets/mp3/ring.mp3'
import toast, { Toaster } from 'react-hot-toast'
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_BASE_URL)
export default function App() {
   const dispatch = useDispatch()
   const [playbackRate, setPlaybackRate] = useState(0.75)
   const [play] = useSound(soundSrc, {
      playbackRate,
      interrupt: true,
   })

   useEffect(() => {
      const account = JSON.parse(localStorage.getItem('user'))
      if (account) dispatch(setAccountData(account))
      socket.on(account._id, async (e) => {
         toast.success(e.alertMsg)
         setPlaybackRate(playbackRate + 0.5)
         play()
      })

      socket.on('fileReply' + account._id, async (e) => {
         toast.success(e.alertMsg)
         setPlaybackRate(playbackRate + 0.5)
         play()
      })

      socket.on('request' + account._id, async (e) => {
         toast.success(e.alertMsg)
         setPlaybackRate(playbackRate + 0.5)
         play()
      })

      socket.on('answer' + account._id, async (e) => {
         toast.success(e.alertMsg)
         setPlaybackRate(playbackRate + 0.5)
         play()
      })

      return () => {
         socket.off('connect')
         socket.off('disconnect')
         socket.off(account._id)
         socket.off('fileReply' + account._id)
         socket.off('request' + account._id)
         socket.off('answer' + account._id)
      }
   }, [play])

   return (
      <Router>
         <Routes>
            <Route element={<Home />}>
               <Route path="/" element={<Login />} />
               <Route path="/register" element={<Register />} />
               <Route path="/forgot-password" element={<ForgotPassword />} />
               <Route path="/reset-password/*" element={<ResetPassword />} />
            </Route>
            <Route element={<UserSidebar />}>
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/upload" element={<Upload />} />
               <Route path="/overview" element={<Overview />} />
               <Route path="/overviewCredit" element={<OverviewCredit />} />
               <Route path="/buyCredit" element={<BuyCredit />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="/support" element={<Support />} />
               <Route path="/policy" element={<Policy />} />
            </Route>
            <Route element={<AdminSidebar />}>
               <Route path="/admin_dashboard" element={<AdminDashboard />} />
               <Route path="/admin_user" element={<Users />} />
               <Route path="/admin_upload" element={<AdminUpload />} />
               <Route path="/admin_service" element={<AdminService />} />
               <Route path="/admin_creditlist" element={<AdminCreditlist />} />
               <Route path="/admin_pricelist" element={<AdminPricelist />} />
               <Route path="/admin_profilsetting" element={<AdminProfile />} />
               <Route path="/admin_invoice" element={<AdminInvoice />} />
               <Route path="/admin_support" element={<AdminSupport />} />
            </Route>
         </Routes>
         <Toaster />
      </Router>
   )
}
