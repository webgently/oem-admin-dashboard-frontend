import React, { useEffect, useState } from 'react'
import {
   BrowserRouter as Router,
   Routes,
   Route,
   Navigate,
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
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
import AdminArchive from './page/AdminArchive'
import { setAccountData } from './features/account/account'
import soundSrc from './assets/mp3/ring.mp3'
import toast, { Toaster } from 'react-hot-toast'
import io from 'socket.io-client'

const socket = io(process.env.REACT_APP_BASE_URL)
export default function App() {
   const dispatch = useDispatch()
   // const account = useSelector((state) => state.account)
   // const [user, setUser] = React.useState(null)
   const [account, setAccount] = React.useState(null)
   const [playbackRate, setPlaybackRate] = useState(0.75)
   const [play] = useSound(soundSrc, {
      playbackRate,
      interrupt: true,
   })

   useEffect(() => {
      const user = localStorage.getItem('user')
      if (user) {
         let parse = JSON.parse(user)
         setAccount(parse)
      }
   }, [])

   useEffect(() => {
      if (account) {
         dispatch(setAccountData(account))
         socket.on(account?._id, async (e) => {
            toast.success(e.alertMsg)
            setPlaybackRate(playbackRate + 0.5)
            play()
         })

         socket.on('fileReply' + account?._id, async (e) => {
            toast.success(e.alertMsg)
            setPlaybackRate(playbackRate + 0.5)
            play()
         })

         socket.on('request' + account?._id, async (e) => {
            toast.success(e.alertMsg)
            setPlaybackRate(playbackRate + 0.5)
            play()
         })

         socket.on('answer' + account?._id, async (e) => {
            toast.success(e.alertMsg)
            setPlaybackRate(playbackRate + 0.5)
            play()
         })

         socket.on('privacy', async (e) => {
            if (account?._id !== e.adminId) {
               toast.success('OEMSERVICE privacy message is updated')
               setTimeout(() => {
                  window.location.href = '/policy'
               }, 1000)
            }
         })

         socket.on('news', async (e) => {
            if (account?._id !== e.adminId) {
               toast.success('OEMSERVICE news message is updated')
               setTimeout(() => {
                  window.location.href = '/dashboard'
               }, 1000)
            }
         })

         return () => {
            socket.off('connect')
            socket.off('disconnect')
            socket.off(account?._id)
            socket.off('fileReply' + account?._id)
            socket.off('request' + account?._id)
            socket.off('answer' + account?._id)
            socket.off('privacy')
            socket.off('news')
         }
      }
   }, [play, account])

   return (
      <Router>
         <React.Suspense>
            <Routes>
               {!account && (
                  <Route element={<Home />}>
                     <Route path="/" element={<Login />} />
                     <Route path="/*" element={<Navigate replace to="/" />} />
                     <Route path="/register" element={<Register />} />
                     <Route
                        path="/forgot-password"
                        element={<ForgotPassword />}
                     />
                     <Route
                        path="/reset-password/*"
                        element={<ResetPassword />}
                     />
                  </Route>
               )}
               {account && account?.permission == 'admin' && (
                  <Route element={<AdminSidebar />}>
                     <Route
                        path="/*"
                        element={<Navigate replace to="/admin_dashboard" />}
                     />
                     <Route
                        path="/admin_dashboard"
                        element={<AdminDashboard />}
                     />
                     <Route path="/admin_user" element={<Users />} />
                     <Route path="/admin_upload" element={<AdminUpload />} />
                     <Route path="/admin_service" element={<AdminService />} />
                     <Route
                        path="/admin_creditlist"
                        element={<AdminCreditlist />}
                     />
                     <Route
                        path="/admin_pricelist"
                        element={<AdminPricelist />}
                     />
                     <Route
                        path="/admin_profilsetting"
                        element={<AdminProfile />}
                     />
                     <Route path="/admin_invoice" element={<AdminInvoice />} />
                     <Route path="/admin_support" element={<AdminSupport />} />
                     <Route path="/admin_archive" element={<AdminArchive />} />
                  </Route>
               )}
               {account && account?.permission == 'user' && (
                  <Route element={<UserSidebar />}>
                     <Route path="/dashboard" element={<Dashboard />} />
                     <Route
                        path="/*"
                        element={<Navigate replace to="/dashboard" />}
                     />
                     <Route path="/upload" element={<Upload />} />
                     <Route path="/overview" element={<Overview />} />
                     <Route
                        path="/overviewCredit"
                        element={<OverviewCredit />}
                     />
                     <Route path="/buyCredit" element={<BuyCredit />} />
                     <Route path="/profile" element={<Profile />} />
                     <Route path="/support" element={<Support />} />
                     <Route path="/policy" element={<Policy />} />
                  </Route>
               )}
            </Routes>
            <Toaster />
         </React.Suspense>
      </Router>
   )
}
