// src/services/getProfile.js
import axios from "axios";
import axiosInstance from "../axios"; // Ensure this points to your axios instance

const API_URL = "http://localhost:8000/"; // Update if deployed

export const getUserProfile = async () => {
  const token = localStorage.getItem("access");
  if (!token) {
    throw new Error("No access token found. Please log in.");
  }
  try {
    const response = await axiosInstance.get(`${API_URL}api/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const updateUserProfile = async (profileData) => {
  const token = localStorage.getItem("access");

  try {
    const response = await axios.patch(
      `${API_URL}api/profile/update/`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const deleteUserProfile = async () => {
  const token = localStorage.getItem("access");

  try {
    const response = await axios.delete(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw error;
  }
};

export const getWorkerProfile = async () => {
  const token = localStorage.getItem("access");
  if (!token) {
    throw new Error("No access token found. Please log in.");
  }
  try {
    const response = await axios.get(`${API_URL}worker/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const updateWorkerProfile = async (profileData) => {
  const token = localStorage.getItem("access");

  try {
    const response = await axios.patch(
      `${API_URL}worker/profile/update/`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};

export const deleteWorkerProfile = async () => {
  const token = localStorage.getItem("access");

  try {
    const response = await axios.delete(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error deleting profile:", error);
    throw error;
  }
};

export const getAdminProfile = async () => {
  const token = localStorage.getItem("access");
  if (!token) {
    throw new Error("No access token found. Please log in.");
  }
  try {
    const response = await axios.get(`${API_URL}user-admin/profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw error;
  }
};

export const updateAdminProfile = async (profileData) => {
  const token = localStorage.getItem("access");

  try {
    const response = await axios.patch(
      `${API_URL}user-admin/profile/update/`,
      profileData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
