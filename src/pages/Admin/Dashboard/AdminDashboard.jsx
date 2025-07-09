import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../styles/pages/Dashboard.css'; // Add this file for custom styles if needed
import { FaUser } from "react-icons/fa";
import { logoutWorker } from '../../../api/auth'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import PendingWorkers from '../../../components/admin/PendingWorkers';
import WorkerHistory from '../../../components/admin/WorkerHistory';


export default function AdminDashboard() {
  const [activeActivity, setActiveActivity] = useState(null);
  const [activeTab, setActiveTab] = useState('pending');
  const navigate = useNavigate();

  const handleActivityClick = (activity) => {
    setActiveActivity(activity === activeActivity ? null : activity); // toggle sidebar
  };

  const handleMainClick = () => {
    if (activeActivity) setActiveActivity(null);
  };

  const handleLogout = async () => {
      const refresh = localStorage.getItem("refresh");
      try {
        await logoutWorker(refresh);
        alert("Logout successful!");
      } catch (err) {
        console.error("Logout failed:", err);
      } finally {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        navigate("/");
      }
    };

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <header className="header">
        <div className="nav-left" >
          <Link to="/" className="nav-logo-link">WorkNest</Link>
        </div>
        <div className="nav-right">
          <FaUser className="profile-img" />
          <div className="dropdown-menu">
            <span className='profile-dropdown'><Link to="/user-admin/profile">Profile</Link></span>
            <span onClick={handleLogout}>Logout</span>
          </div>
        </div>
      </header>

      <div className="dashboard-body">
        {/* Activity Bar */}
        <div className="activity-bar">
          <button onClick={() => handleActivityClick('dashboard')}>🏠</button>
          <button onClick={() => handleActivityClick('bookings')}>📦</button>
        </div>

        {/* Sidebar */}
        {activeActivity && (activeActivity == "dashboard") && (
          <aside className="sidebar">
            <h3>{activeActivity} Panel</h3>
            <ul>
              <li onClick={() => setActiveTab('pending')}>Pending Requests</li>
              <li onClick={() => setActiveTab('history')}>Approved/Rejected Requests</li>
            </ul>
          </aside>
        )}

        {/* Main Content */}
        <main className="main-content" onClick={handleMainClick}>
          <h1>Admin Dashboard</h1>
          {activeTab === 'pending' ? <PendingWorkers /> : <WorkerHistory />}
          
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 WorkNest. All rights reserved.
      </footer>
    </div>
  );
}
