// src/routes/ProtectedRoute.jsx
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LoginForm from "../pages/Auth/UserAuth/LoginForm";
import RegisterForm from "../pages/Auth/UserAuth/RegisterForm";
import WorkerLoginForm from "../pages/Auth/WorkerAuth/WorkerLoginForm";
import WorkerRegisterForm from "../pages/Auth/WorkerAuth/WorkerRegisterForm";
import React from "react";
import UserDashboard from "../pages/User/Dashboard/UserDashboard";
import WorkerDashboard from "../pages/Worker/Dashboard/WorkerDashboard";
import LandingPage from "../pages/Landing/LandingPage";
import UserProtectedRoute from "./UserProtectedRoute";
import WorkerProtectedRoute from "./WorkerProtectedRoute";
import UserProfile from "../pages/User/Profile/UserProfile";
import WorkerProfile from "../pages/Worker/Profile/WorkerProfile";
import AdminRegTokenGate from "../api/AdminRegTokenGate";
import AdminLoginTokenGate from "../api/AdminLoginTokenGate";
import AdminLoginForm from "../pages/Auth/AdminAuth/AdminLoginForm";
import AdminProtectedRoute from "./AdminProtectedRoute";
import AdminDashboard from "../pages/Admin/Dashboard/AdminDashboard";
import AdminProfile from "../pages/Admin/Profile/AdminProfile";
import VerificationPage from "../components/worker/VerificationPage"; 


export default function AppRouter() {
  return (
    <Router>
        <Routes>
            <Route path="/" element={<LandingPage/>} />
            {/* User routes */ }
            <Route path="/login" element={<LoginForm/>} /> 
            <Route path="/register" element={<RegisterForm/>} />
            <Route element={<UserProtectedRoute />}>
              <Route path="/dashboard" element={<UserDashboard/>} />
            </Route>  
            <Route path="/Profile" element={<UserProfile/>} />
            {/* Worker routes */}
            <Route path="/worker/login" element={<WorkerLoginForm/>} />
            <Route path="/worker/register" element={<WorkerRegisterForm/>} /> 
            <Route path="/worker/verification" element={<VerificationPage />} />
            <Route element={<WorkerProtectedRoute />}>
              <Route path="/worker/dashboard" element={<WorkerDashboard/>} />
            </Route>
            <Route path="/worker/Profile" element={<WorkerProfile/>} />
            {/* Admin routes */}
            <Route path="/user-admin/register" element={<AdminRegTokenGate />} />
            <Route path="/user-admin/login" element={<AdminLoginForm />} />
            <Route element={<AdminProtectedRoute />}>
              <Route path="/user-admin/dashboard" element={<AdminDashboard/>} />
            </Route>
            <Route path="/user-admin/Profile" element={<AdminProfile/>} />
        </Routes>  
    </Router>
  );
}