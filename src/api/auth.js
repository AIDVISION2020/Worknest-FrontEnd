import axios from "axios";
import axiosInstance from "./axios";

const BASE_URL = "http://localhost:8000";

export const registerUser = async (userData) => {
  const res = await axios.post(`${BASE_URL}/api/register/`, userData);
  return res.data;
};

export const loginUser = async (formData) => {
  const res = await axios.post(`${BASE_URL}/api/login/`, formData);
  return res.data;
};

export const logoutUser = async (refresh) => {
  const res = await axiosInstance.post(
    `${BASE_URL}/api/logout/`,
    { refresh: refresh },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  );
  return res.data;
};

export const registerWorker = async (userData) => {
  const res = await axios.post(`${BASE_URL}/worker/register/`, userData);
  return res.data;
};

export const loginWorker = async (formData) => {
  const res = await axios.post(`${BASE_URL}/worker/login/`, formData);
  return res.data;
};

export const logoutWorker = async (refresh) => {
  const res = await axios.post(
    `${BASE_URL}/worker/logout/`,
    { refresh: refresh },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
    }
  );
  return res.data;
};

export const registerAdmin = async (userData) => {
  const res = await axios.post(`${BASE_URL}/user-admin/register/`, userData);
  return res.data;
};

export const loginAdmin = async (formData) => {
  const res = await axios.post(`${BASE_URL}/user-admin/login/`, formData);
  return res.data;
};
