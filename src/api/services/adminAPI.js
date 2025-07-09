import axios from "axios";

const BASE_URL = "http://localhost:8000/user-admin"; // adjust if needed

export const getPendingWorkers = async () => {
  const token = localStorage.getItem("access");
  try {
    const response = await axios.get(`${BASE_URL}/pending-workers/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch pending workers:", error);
  }
};

export const getWorkerHistory = async () => {
  const token = localStorage.getItem("access");

  try {
    const response = await axios.get(`${BASE_URL}/worker-history/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  } catch (error) {
    console.error("Failed to fetch worker history:", error);
  }
};

export const updateWorkerStatus = async (workerId, action, reason = null) => {
  const token = localStorage.getItem("access");
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
  const body = action === "reject" ? { action, reason } : { action };
  const url =
    action === "approve"
      ? `${BASE_URL}/approve-worker/${workerId}/`
      : `${BASE_URL}/reject-worker/${workerId}/`;
  try {
    const response = await axios.post(url, body, { headers });
    return response;
  } catch (error) {
    console.error(`Failed to ${action} worker:`, error);
    throw error;
  }
};
