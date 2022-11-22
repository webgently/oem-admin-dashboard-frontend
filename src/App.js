import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Login from './component/Login'
// --------user------------
import UserSidebar from './component/UserSidebar'
import Dashboard from './page/user/Dashboard'
import Upload from './page/user/Upload'
import Overview from './page/user/Overview'
import OverviewCredit from './page/user/OverviewCredit'
import BuyCredit from './page/user/BuyCredit'
import Profile from './page/user/Profile'
import Support from './page/user/Support'
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
import toast, { Toaster } from 'react-hot-toast'
import io from 'socket.io-client'
const socket = io(process.env.REACT_APP_BASE_URL)

export default function App() {
   const dispatch = useDispatch()
   useEffect(() => {
      const account = JSON.parse(localStorage.getItem('user'))
      let deleteId = ''
      if (account) dispatch(setAccountData(account))
      socket.on(account._id, async (e) => {
         toast.success(e.alertMsg)
         deleteId = account._id
      })

      socket.on('fileReply' + account._id, async (e) => {
         toast.success(e.alertMsg)
         deleteId = 'fileReply' + account._id
      })

      socket.on('request' + account._id, async (e) => {
         toast.success(e.alertMsg)
         deleteId = 'request' + account._id
      })

      socket.on('answer' + account._id, async (e) => {
         toast.success(e.alertMsg)
         deleteId = 'answer' + account._id
      })

      return () => {
         socket.off('connect')
         socket.off('disconnect')
         socket.off(deleteId)
      }
   }, [])
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<UserSidebar />}>
               <Route path="/dashboard" element={<Dashboard />} />
               <Route path="/upload" element={<Upload />} />
               <Route path="/overview" element={<Overview />} />
               <Route path="/overviewCredit" element={<OverviewCredit />} />
               <Route path="/buyCredit" element={<BuyCredit />} />
               <Route path="/profile" element={<Profile />} />
               <Route path="/support" element={<Support />} />
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
