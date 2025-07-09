import React, { useState } from "react";
import axios from "axios";

const Longitude = ({ onDetectLng }) => {

  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY; // Replace with yours

  const handleDetect = async () => {
    try {
      // Get Lat/Lng from Geolocation API
      const geoRes = await axios.post(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`,
        { considerIp: true }
      );
      const { lat, lng } = geoRes.data.location;
      onDetectLng(lng)
    }catch (err) {
      console.error("Longitude detection failed:", err);
      alert("Unable to detect longitude. Check your API key or billing.");
    }
    };
  return (
    <button type="button" className="detect-longitude-btn" onClick={handleDetect}>
      📍 Detect My Longitude
    </button>
  );
}
export default Longitude;