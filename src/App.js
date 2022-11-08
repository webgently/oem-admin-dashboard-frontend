import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
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
import AdminDashboard from './page/dashboard'
import Users from './page/register'
import AdminUpload from './page/upload'
import AdminService from './page/service'
import AdminCreditlist from './page/creditlist'
import AdminPricelist from './page/pricelist'
import AdminProfile from './page/profliesetting'
import AdminInvoice from './page/invoice'

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
