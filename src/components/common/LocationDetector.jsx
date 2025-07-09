import React, { useState } from "react";
import axios from "axios";

const GoogleLocation = ({ onDetect }) => {

  const GOOGLE_API_KEY = process.env.REACT_APP_GOOGLE_API_KEY; // Replace with yours

  const handleDetect = async () => {
    try {
      // Get Lat/Lng from Geolocation API
      const geoRes = await axios.post(
        `https://www.googleapis.com/geolocation/v1/geolocate?key=${GOOGLE_API_KEY}`,
        { considerIp: true }
      );
      const { lat, lng } = geoRes.data.location;

      // Get Address from Geocoding API
      const addressRes = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
      );
      const formatted = addressRes.data.results[0]?.formatted_address;

      // Send address back to parent
      if (formatted) onDetect(formatted);
    } catch (err) {
      console.error("Location detection failed:", err);
      alert("Unable to detect location. Check your API key or billing.");
    }
  };


  return (
    <button type="button" className="detect-location-btn" onClick={handleDetect}>
      📍 Detect My Location
    </button>
  );
};

export default GoogleLocation;