import React, { useState, useEffect } from 'react';
import '../../../styles/pages/UserProfile.css';
import {
  FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaCalendarAlt, FaUserEdit, FaUserCog, FaUserCircle , FaCamera 
} from 'react-icons/fa';
import { getWorkerProfile, updateWorkerProfile } from '../../../api/services/getProfile';
import GoogleLocation from '../../../components/common/LocationDetector';
import Latitude from '../../../components/common/Latitude';
import Longitude from '../../../components/common/Longitude';


export default function WorkerProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('basic');
  const [editing, setEditing] = useState(false);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [showEditIcon, setShowEditIcon] = useState(false);
  const [formData, setFormData] = useState({
    location: '',
    dob: '',
    phone: '',
    gender:'',
    profession: '',
    bio: '',
    experience_years: 0,
    hourly_rate: '',
    latitude:'',
    longitude:'',
    pincode:''
  });
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getWorkerProfile();
        setProfile(data);
        setFormData({
          location: data.location || '',
          dob: data.dob || '',
          phone: data.phone || '',
          gender: data.gender || '',
          profession: data.profession || '',
          bio: data.bio || '',
          experienced_years: data.experience_years || 0,
          hourly_rate: data.hourly_rate || '',
          latitude:data.latitude||'',
          longitude:data.longitude||'',
          pincode:data.pincode||''
        });
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const form = new FormData();

    Object.keys(formData).forEach((key) => {
      form.append(key, formData[key]);
    });

    if (profilePicFile) {
      form.append("profile_pic", profilePicFile);
    }

    try {
      const res = await updateWorkerProfile(form);
      setProfile((prev) => ({ ...prev, ...res }));
      setEditing(false);
      setProfilePicFile(null);
    } catch (err) {
      console.error("Update failed", err);
    }
  };



  if (loading) return <p>Loading...</p>;
  if (!profile) return <p>No profile data found.</p>;

  return (
    <div className="worknest-profile-page">
      <div className="profile-header">
        <div className="profile-picture-container">
          {profile.profile_pic ? (
            <img
              src={`http://localhost:8000${profile?.profile_pic}`}
              alt="Profile"
              className="profile-picture"
            />

          ) : (
            <FaUserCircle className="avatar-icon" />
          )}
          
          {editing && (
            <>
              <label htmlFor="profile-pic-upload" className="upload-icon">
                <FaUserEdit />
              </label>
              <input
                type="file"
                id="profile-pic-upload"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => setProfilePicFile(e.target.files[0])}
              />
            </>
          )}
        </div>
        <div className="profile-info">
            <h1>{profile.username}</h1>
            <p className="role-badge">{profile.role}</p>
        </div>
      </div>

      <div className="profile-layout">
        <aside className="profile-tabs">
          <button className={tab === 'basic' ? 'active' : ''} onClick={() => setTab('basic')}>
            <FaUser /> Basic Info
          </button>
          <button className={tab === 'account' ? 'active' : ''} onClick={() => setTab('account')}>
            <FaUserCog /> Account
          </button>
          <button className={tab === 'settings' ? 'active' : ''} onClick={() => setTab('settings')}>
            <FaUserEdit /> Settings
          </button>
        </aside>

        <main className="profile-details">
          {tab === 'basic' && (
            <div className="info-group">
              <h2>Basic Information</h2>

              {!editing ? (
                <>
                  <div className="info-grid">
                    <div className="info-item"><FaUser /><label>Username:</label> <span>{profile.username}</span></div>
                    <div className="info-item"><FaMapMarkerAlt /><label>Location:</label> <span>{profile.location || 'Not Provided'}</span></div>
                    <div className="info-item"><FaCalendarAlt /><label>DOB:</label> <span>{profile.dob || 'Not Provided'}</span></div>
                    <div className="info-item"><FaEnvelope /><label>Email:</label> <span>{profile.email}</span></div>
                    <div className="info-item"><FaPhone /><label>Phone:</label> <span>{profile.phone || 'Not Provided'}</span></div>
                    <div className="info-item"><FaUser/><label>Gender:</label> <span>{profile.gender || 'Not Provided'}</span></div>
                    <div className="info-item"><FaUserEdit /><label>Profession:</label> <span>{profile.profession || 'Not Provided'}</span></div>
                    <div className="info-item"><FaUserEdit /><label>Bio:</label> <span>{profile.bio || 'Not Provided'}</span></div>
                    <div className="info-item"><FaUserEdit /><label>Experience (Years):</label> <span>{profile.experience_years || 'Not Provided'}</span></div>
                    <div className="info-item"><FaUserEdit /><label>Hourly Rate:</label> <span>{profile.hourly_rate || 'Not Provided'}</span></div>
                    <div className='info-item'><FaUser /> <label>Latitude:</label> <span>{profile.latitude || 'Not Provided'}</span></div>
                    <div className='info-item'><FaUser /> <label>Longitude:</label> <span>{profile.longitude || 'Not Provided'}</span></div>
                    <div className='info-item'><FaUser /> <label>Pincode:</label> <span>{profile.pincode || 'Not Provided'}</span></div>
                  </div>
                  <button onClick={handleEditToggle} className="edit-btn">Edit</button>
                </>
              ) : (
                <form className="edit-form" onSubmit={handleUpdate}>
                  <div className="info-grid">
                    <div className="info-item">
                      <label>location:</label>
                      <input name="location" value={formData.location} onChange={handleChange} />
                      <GoogleLocation onDetect={(address) =>
                        setFormData((prev) => ({
                          ...prev,
                          location: address,
                        }))
                      } />
                    </div>
                    <div className="info-item">
                      <label>Latitude:</label>
                      <input type="latitude" name="latitude" value={formData.latitude} onChange={handleChange} /> 
                      <Latitude onDetectLat={(lat) =>
                        setFormData((prev) => ({
                          ...prev,
                          latitude: lat,
                        }))
                      } />
                    </div>
                    <div className="info-item">
                      <label>Longitude:</label>
                      <input type="longitude" name="longitude" value={formData.longitude} onChange={handleChange} /> 
                      <Longitude onDetectLng={(lng) =>
                        setFormData((prev) => ({
                          ...prev,
                          longitude: lng,
                        }))
                      } />
                    </div>
                    <div className="info-item">
                      <label>Date of Birth:</label>
                      <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                    </div>
                    <div className="info-item">
                      <label>Phone:</label>
                      <input name="phone" value={formData.phone} onChange={handleChange} />
                    </div>
                    <div className="info-item">
                      <label>Gender:</label>
                      <input name="gender" value={formData.gender} onChange={handleChange} />
                    </div>
                    <div className="info-item">
                      <label>Profession:</label>
                      <input name="profession" value={formData.profession} onChange={handleChange} />
                    </div>
                    <div className="info-item">
                      <label>Bio:</label>
                      <textarea name="bio" value={formData.bio} onChange={handleChange} />
                    </div>
                    <div className="info-item">
                      <label>Experience (Years):</label>
                      <input type="years" name="experience_years" value={formData.experience_years} onChange={handleChange} />
                    </div>
                    <div className="info-item">
                      <label>Hourly Rate:</label>
                      <input type="number" name="hourly_rate" value={formData.hourly_rate} onChange={handleChange} /> 
                    </div>
                    <div className="info-item">
                      <label>Pincode:</label>
                      <input name="pincode" value={formData.pincode} onChange={handleChange} />
                    </div>
                      {console.log("Sending to backend:", formData)}
                  </div>
                  <button type="submit" className="save-btn">Save</button>
                  <button type="button" className="cancel-btn" onClick={handleEditToggle}>Cancel</button>
                </form>
              )}
            </div>
          )}

          {tab === 'account' && (
            <div className="info-group">
              <h2>Worker Account Info</h2>
              <div className="info-grid">
                
              </div>
            </div>
          )}

          {tab === 'settings' && (
            <div className="info-group">
              <h2>Settings</h2>
              <p>This section can include preferences and privacy settings.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
