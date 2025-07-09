import React,{useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaUser,FaLock } from "react-icons/fa";
import "../../../styles/pages/LoginForm.css"; // Adjust the path as necessary
import axios from "axios";
import { loginAdmin } from "../../../api/auth"; // Adjust the import path as necessary


const AdminLoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await loginAdmin(formData);
            localStorage.setItem("access", res.access);
            localStorage.setItem("refresh", res.refresh);
            localStorage.setItem("username", res.username);
            localStorage.setItem("email", res.email);
            setFormData({ username: "", password: "" }); // Simulate a delay for user experience
            alert("Login successful!");
            navigate("/user-admin/dashboard"); // later you can conditionally redirect based on role
        } catch (ValidationError) {
            const err = ValidationError.response.data;
            alert(err.non_field_errors[0]);
            console.error(err); 
            //alert("Login failed: " + err.data);
        }
    };

    return(
        <div className="center-wrapper">
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Admin Login</h1>
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
                        <label><input type="checkbox"/>Remember me</label>
                        <a href="#">Forgot Password?</a>
                    </div>
                    <button type="submit">Login</button>
                    <div className="registration-link">
                        <p>Don't have an account? <Link to="/register">Register here</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AdminLoginForm;