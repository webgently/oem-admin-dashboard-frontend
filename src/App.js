import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './component/Login'
import Header from './component/AdminSidebar'
import UserSidebar from './component/UserSidebar'
import Dashboard from './page/user/Dashboard'
import Upload from './page/user/Upload'
import Overview from './page/user/Overview'
import OverviewCredit from './page/user/OverviewCredit'
import BuyCredit from './page/user/BuyCredit'
import Profile from './page/user/Profile'
import Support from './page/user/Support'
// --------admin------------
import AdminDashboard from './page/AdminDashboard'
import Users from './page/AdminRegister'
import AdminUpload from './page/AdminUpload'
import AdminService from './page/AdminService'
import AdminCreditlist from './page/AdminCreditlist'
import AdminPricelist from './page/AdminPricelist'
import AdminProfile from './page/AdminProfliesetting'
import AdminInvoice from './page/AdminInvoice'
import AdminSupport from './page/AdminSupport'

export default function App() {
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
            <Route element={<Header />}>
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
      </Router>
   )
}
