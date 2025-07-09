import React, { useState } from "react";
import axios from "axios";
import "../../styles/pages/VerificationPage.css"; // Adjust the path as necessary
import { useLocation } from "react-router-dom";
//import "./verification.css"; // Add styles for layout

const VerificationPage = (workerId) => {
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");
  const location = useLocation();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a file.");
      return;
    }
    alert("File selected: " + file.name);
    const formData = new FormData();
    formData.append("verification_document", file);

    try {
      const workerId = location.state?.workerId;
      const token = localStorage.getItem("access");
      const res = await axios.post(`http://localhost:8000/worker/upload-verification/${workerId}/`, formData, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        }
      });

      setStatus("Uploaded successfully! Wait for admin approval.");
    } catch (err) {
      console.error(err);
      setStatus("Upload failed. Try again.");
    }
  };

  return (
    <div className="center-wrapper">
      <div className="verification-container">
        <h2>Document Verification</h2>
        <p>Upload your verification document (PDF only):</p>

        <div className="file-input-wrapper">
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          <button className="upload-btn" onClick={handleUpload}>Upload</button>
        </div>
      </div>
    </div>
  );
};

export default VerificationPage;
