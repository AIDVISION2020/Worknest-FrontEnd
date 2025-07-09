import React,{useState, useEffect} from "react";
import { Link,useNavigate } from "react-router-dom";
import { FaUser,FaLock } from "react-icons/fa";
import "../../../styles/pages/LoginForm.css"; // Adjust the path as necessary
import axios from "axios";
import { loginWorker } from "../../../api/auth"; // Adjust the import path as necessary
import {getWorkerDet} from '../../../api/services/getWorkersDetails';


const WorkerLoginForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ username: "", password: "" });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [workers,setWorkers] = useState([]);
    const [selectedWorker, setSelectedWorker] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchWorkerDet = async () => {
        try {
          const res = await getWorkerDet();
          setWorkers(res);
        } catch (error) {
          const err = error.response ? error.response.data : error.message;
          alert(`Error fetching workers: ${err}`);
          console.error("Error fetching workers", err);
        }
    };
    useEffect(() => {
        try{
            fetchWorkerDet();
        }catch (error) {
          const err = error.response ? error.response.data : error.message;
          alert(`Error fetching workers: ${err}`);
          console.error("Error fetching workers", err);
        }finally{
            setLoading(false)
        }
    }, []);
    //fetchWorkerDet();
    const handleSubmit = async (e) => {
        e.preventDefault();
        //fetchWorkerDet();
        try {
            const res = await loginWorker(formData);
            localStorage.setItem("access", res.access);
            localStorage.setItem("refresh", res.refresh);
            localStorage.setItem("username", res.username);
            //localStorage.setItem("email", res.email);
            setFormData({ username: "", password: "" }); // Simulate a delay for user experience
            alert("Login successful!");
            
            const username=localStorage.getItem("username")
            //const email=localStorage.getItem("email")
            console.log("Username:", username);
            console.log("hello")
            console.log("Workers:", workers);
            const matchedWorker = workers.find(
                (worker) =>
                    worker.username === username
            );
            if (matchedWorker) {
                setSelectedWorker(matchedWorker);
                console.log("Matched Worker:", matchedWorker.username);
                if (!matchedWorker.is_verified) {
                    console.log("is_verified: "+ matchedWorker.is_verified)
                    const token = localStorage.getItem("access");
                    const resme = await axios.get("http://localhost:8000/worker/me/", {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    const workerId = resme.data.id;
                    alert("Please complete your verification first.");
                    navigate("/worker/verification", { state: { workerId } });
                } else {
                    navigate("/worker/dashboard");
                }
                console.log("Selected Worker:", selectedWorker);
            }
            else {
                alert("Worker not found.");
            }
            //navigate("/worker/dashboard"); // later you can conditionally redirect based on role
        } catch (error) {
            const err = error;
            //alert(err.non_field_errors[0]);
            console.error(err); 
            alert("Login failed: " + err.data);
        }
    };

    return(
        <div className="center-wrapper">
        <div className="wrapper">
            <form onSubmit={handleSubmit}>
                <h1> WorkerLogin</h1>
                <div className="input-box">
                    <input type="text" id="username" name="username" placeholder="Enter your workername" value={formData.username}
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
                    <p>Don't have an account? <Link to="/worker/register">Register here</Link></p>
                </div>
            </form>
        </div>
        </div>
    );
};

export default WorkerLoginForm;