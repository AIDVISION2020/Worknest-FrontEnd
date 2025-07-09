import React, { useState } from "react";
import axios from "axios";

const Latitude = ({ onDetectLat }) => {

  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY; // Replace with yours

  const handleDetect = async () => {
    try {
      // Get Lat/Lng from Geolocation API
      const geoRes = await axios.post(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`,
        { considerIp: true }
      );
      const { lat, lng } = geoRes.data.location;
      onDetectLat(lat)
    }catch (err) {
      console.error("Latitude detection failed:", err);
      alert("Unable to detect latitude. Check your API key or billing.");
    }
    };
  return (
    <button type="button" className="detect-latitude-btn" onClick={handleDetect}>
      📍 Detect My Latitude
    </button>
  );
}
export default Latitude;