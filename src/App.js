import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './component/login'
import Header from './component/header'
import Sidebar from './component/user/sidebar'
import Dashboard from './page/user/dashboard'
import Upload from './page/user/upload'
import Overview from './page/user/overview'
import OverviewCredit from './page/user/overviewCredit'
import BuyCredit from './page/user/buyCredit'
import Profile from './page/user/profile'
// --------admin------------
import AdminDashboard from './page/AdminDashboard'
import Users from './page/AdminRegister'
import AdminUpload from './page/AdminUpload'
import AdminService from './page/AdminService'
import AdminCreditlist from './page/AdminCreditlist'
import AdminPricelist from './page/AdminPricelist'
import AdminProfile from './page/AdminProfliesetting'
import AdminInvoice from './page/AdminInvoice'

export default function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route element={<Sidebar />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/upload" element={<Upload />} />
                    <Route path="/overview" element={<Overview />} />
                    <Route
                        path="/overviewCredit"
                        element={<OverviewCredit />}
                    />
                    <Route path="/buyCredit" element={<BuyCredit />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route element={<Header />}>
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
                </Route>
            </Routes>
        </Router>
    )
}
