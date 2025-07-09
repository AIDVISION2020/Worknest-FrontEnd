import React, { useEffect } from 'react';
import axios from 'axios';

export default function ClosestSortedWorkers({ userLat, userLng, onUpdate }) {
  useEffect(() => {
    const fetchSortedWorkers = async () => {
      if (!userLat || !userLng) return;
      const token=localStorage.getItem('access');
      try {
        const response = await axios.post(
          "http://localhost:8000/worker/closest-workers/",
          { lat: userLat, lng: userLng },
          {
            headers: {
                Authorization: `Bearer ${token}`
            },
      },
        );

        onUpdate(response.data); // only call once after fetch
      } catch (error) {
        console.error("Failed to fetch closest workers:", error);
      }
    };

    fetchSortedWorkers(); // only fires once on lat/lng change
  }, [userLat, userLng, onUpdate]);

  return null; // this is just a logic-only helper component
}
