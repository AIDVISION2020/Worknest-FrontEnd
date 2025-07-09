import axios from "axios";

const API_URL = "http://localhost:8000/"; // Update if deployed

export const getWorkerDet = async () => {
  try {
    const response = await axios.get(`${API_URL}worker/all_workers_det/`);
    if (response.status !== 200) {
      throw new Error("Failed to fetch profile data");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};
