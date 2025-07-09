import React, { useState, useEffect, useCallback } from 'react';
import { FaUser, FaUserCircle, FaSearch} from "react-icons/fa";
import { FiFilter } from "react-icons/fi";
import '../../../styles/pages/Dashboard.css'; // Add this file for custom styles if needed
import { logoutUser } from '../../../api/auth'; // Adjust the import path as necessary
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { getWorkerDet } from '../../../api/services/getWorkersDetails'; // Adjust the import path as necessary
import BookAppointmentModal from '../../../components/user/BookAppointmentModal'; // Adjust the import path as necessary
import MyBookings from '../../../components/user/MyBooking'; // Adjust the import path as necessary
import { getUserProfile } from '../../../api/services/getProfile';
import ClosestSortedWorkers from '../../../components/user/ClosestWorker';


export default function UserDashboard() {
  const [activeActivity, setActiveActivity] = useState(null);
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredWorkers, setFilteredWorkers] = useState([]);
  
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [minRate, setMinRate] = useState('');
  const [maxRate, setMaxRate] = useState('');
  const [minExp, setMinExp] = useState('');
  const [maxExp, setMaxExp] = useState('');

  const [showModal, setShowModal] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  const [profile, setProfile] = useState(null);
  const [loadingProf, setLoadingProf] = useState(true);
  
  const [userLat, setUserLat] = useState(13.0827); // Replace with detected value or state
  const [userLng, setUserLng] = useState(80.2707);

  const handleSortedUpdate = useCallback((sorted) => {
    setWorkers(sorted);
    setFilteredWorkers(sorted);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getUserProfile();
        setProfile(data);
        setUserLat(data.latitude);
        setUserLng(data.longitude);
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoadingProf(false);
      }
    };
    fetchProfile();
  }, []);

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
      await logoutUser(refresh);
      alert("Logout successful!");
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      localStorage.removeItem("access");
      localStorage.removeItem("refresh");
      navigate("/login");
    }
  };

  useEffect(() => {
      const fetchWorkerDet = async () => {
        try {
          const res = await getWorkerDet();
          setWorkers(res);
          setFilteredWorkers(res); // Initialize filtered workers with all workers
        } catch (error) {
          const err = error.response ? error.response.data : error.message;
          alert(`Error fetching workers: ${err}`);
          console.error("Error fetching workers", err);
        } finally {
          setLoading(false);
        }
      };
      fetchWorkerDet();
    }, []);

    useEffect(() => {
      if (searchTerm.trim() === '') {
        setFilteredWorkers(workers); // Show all if input is empty
      } else {
        const filtered = workers.filter(worker =>
          worker.profession?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredWorkers(filtered);
      }
    }, [searchTerm, workers]);


    const toggleFilterPanel = () => {
      setShowFilterPanel(!showFilterPanel);
    };

    const applyFilters = () => {
      filterWorkers(searchTerm, minRate, maxRate, minExp, maxExp);
      setShowFilterPanel(false);
    };

    const resetFilters = () => {
      setMinRate('');
      setMaxRate('');
      setMinExp(0);
      setMaxExp(0);
      filterWorkers(searchTerm, '', '', 0, 0);
      setShowFilterPanel(false);
    };

    const filterWorkers = (term, minR, maxR, minE, maxE) => {
      let filtered = workers.filter(worker => {
        const professionMatch = worker.profession.toLowerCase().includes(term.toLowerCase());
        const rate = parseFloat(worker.hourly_rate);
        const exp = parseInt(worker.experience_years);
        return (
          professionMatch &&
          (minR === '' || rate >= parseFloat(minR)) &&
          (maxR === '' || rate <= parseFloat(maxR)) &&
          (minE === 0 || exp >= parseInt(minE)) &&
          (maxE === 0 || exp <= parseInt(maxE))
        );
      });

      setFilteredWorkers(filtered);
    };

  return (
    <div className="app-layout">
      {/* Top Navigation */}
      <header className="header">
        <div className="nav-left">WorkNest</div>
        <div className="nav-right">
          <FaUser className="profile-img" />
          <div className="dropdown-menu">
            <span className='profile-dropdown'><Link to="/Profile">Profile</Link></span>  
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
        {activeActivity && activeActivity == "bookings" &&(
          <aside className="sidebar">
            <h3>{activeActivity} Panel</h3>
            <ul>
              <li>Option A</li>
              <li onClick={() => setActiveTab('bookings')}>My Bookings</li>
            </ul>
          </aside>
        )}
        {showFilterPanel && (
          <div className="filter-panel-modal">
            <h3 className="filter-title">Filter Options</h3>

            <div className="filter-group">
              <label className="filter-label">Hourly Rate (Min)</label>
              <input type="number" className="filter-input" value={minRate} onChange={(e) => setMinRate(e.target.value)} />
            </div>

            <div className="filter-group">
              <label className="filter-label">Hourly Rate (Max)</label>
              <input type="number" className="filter-input" value={maxRate} onChange={(e) => setMaxRate(e.target.value)} />
            </div>

            <div className="filter-group">
              <label className="filter-label">Experience (Min years)</label>
              <input type="number" className="filter-input" value={minExp} onChange={(e) => setMinExp(e.target.value)} />
            </div>

            <div className="filter-group">
              <label className="filter-label">Experience (Max years)</label>
              <input type="number" className="filter-input" value={maxExp} onChange={(e) => setMaxExp(e.target.value)} />
            </div>

            <div className="filter-button-group">
              <button className="apply-btn" onClick={applyFilters}>Apply Filters</button>
              <button className="reset-btn" onClick={resetFilters}>Reset</button>
            </div>
          </div>
        )}

        <ClosestSortedWorkers
          userLat={userLat}
          userLng={userLng}
          onUpdate={handleSortedUpdate}
        />

        {/* Main Content */}
        <main className="main-content" onClick={handleMainClick}>
          <h2>Welcome to your User dashboard!</h2>
          {activeTab === 'bookings' ? (
            <MyBookings />
            ) : (
              <>
            <div className="worker-search-container">
              <div className="worker-search-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  className="worker-search"
                  placeholder="Search profession..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="filter-container">
                <button className="filter-icon-btn" onClick={toggleFilterPanel}>
                  <FiFilter />
                </button>
              </div>
            </div>
            <div className="worker-grid">
              {filteredWorkers.map(worker => (
                <div className="worker-card" key={worker.worker_id || worker.id} onClick={() => setSelectedWorker(worker)}>
                  {worker.profile_pic ? (
                  <img
                    src={worker?.profile_pic}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/default-profile.png"; // make sure this file exists in /public folder
                    }}
                    alt="Profile"
                    className="worker-profile-pic"
                  />
                  ) : (
                    <img
                    src={"/default-profile.png"}
                    alt="Profile"
                    className="worker-profile-pic"
                  />
                  )}
                  <div className="worker-info">
                    <h4>Name : {worker.username}</h4>
                    <p>Profession : {worker.profession}</p>
                    <p>Hourly Rate : ₹{worker.hourly_rate}/hr</p>
                    {(worker.duration_text) && <p>ETA : {worker.duration_text}</p>}
                  </div>
                </div>
              ))}
            </div>
            {selectedWorker && (
              <div>
                <div className="worker-details">
                  <h3>{selectedWorker.username}</h3>
                  {selectedWorker.profile_pic ? 
                  (
                    <img src={selectedWorker.profile_pic} alt="Profile"  className="worker-profile-pic"/>
                  )
                  :(
                    <img src={"/default-profile.png"} alt="Profile"  className="worker-profile-pic"/>
                  )}
                  <p><strong>Profession:</strong> {selectedWorker.profession}</p>
                  <p><strong>Experience:</strong> {selectedWorker.experience_years} years</p>
                  <p><strong>Bio:</strong> {selectedWorker.bio}</p>
                  {(selectedWorker.location) && <p><strong>Location:</strong> {selectedWorker.location}</p>}
                  {(selectedWorker.distance_text) && <p><strong>Distance:</strong> {selectedWorker.distance_text}</p>}
                  <button className="book-appointment-btn" onClick={() => setShowModal(true)}>Book Appointment</button>
                  <button className="close-btn" onClick={() => setSelectedWorker(null)}>Close</button>
                </div>
                <div>
                  {showModal && (
                    <BookAppointmentModal
                      workerId={selectedWorker.worker_id}
                      onClose={() => setShowModal(false)}
                    />
                  )}
                </div>
              </div>
            )}
          </>
)}
        </main>
      </div>

      {/* Footer */}
      <footer className="footer">
        &copy; 2025 WorkNest. All rights reserved.
      </footer>
    </div>
  );
}
