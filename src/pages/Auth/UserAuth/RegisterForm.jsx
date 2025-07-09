import React,{useState} from "react";
import { FaUser,FaLock, FaEnvelope} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import "../../../styles/pages/RegisterForm.css"; // Adjust the path as necessary
import axios from "axios";
import { registerUser } from "../../../api/auth"; // Adjust the import path as necessary


function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      alert('Registered successfully!');
      navigate('/login'); // Redirect to login page after successful registration
    } catch (error) {
      alert(error.response.data);
    }
  };


    return(
        <div className="center-wrapper">
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1>Register</h1>
                <div className="input-box">
                    <input type="text" id="email" name="email" placeholder="Enter your Email" value={formData.email}
        onChange={handleChange} required />
                    <FaEnvelope className="icon" />
                </div>
                <div className="input-box">
                    <input type="text" id="username" name="username" placeholder="Enter your username" value={formData.username}
        onChange={handleChange} required />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input type="password" id="password" name="password" placeholder="Enter your password" value={formData.password}
        onChange={handleChange} required/>
                    <FaLock className="icon" />
                </div>
                <div className="remember-forgot">
                    <label><input type="checkbox"/>I agree to the terms & conditions</label>
                </div>
                <button type="submit">Register</button>
                <div className="registration-link">
                    <p>Already have an account? <Link to="/login">Login</Link></p>
                </div>
            </form>
        </div>
        </div>
    );
};

export default RegisterForm;