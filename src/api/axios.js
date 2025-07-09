import axios from "axios";

const BASE_URL = "http://localhost:8000/api"; // change if needed

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// REQUEST INTERCEPTOR
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// RESPONSE INTERCEPTOR
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const access = localStorage.getItem("access");
    const refresh = localStorage.getItem("refresh");

    const is401 = error.response?.status === 401;
    const isRetryable = !originalRequest._retry;
    const isAuthError =
      access || error.response?.data?.code === "token_not_valid";

    if (is401 && isRetryable && isAuthError && refresh) {
      originalRequest._retry = true;
      console.log("Refreshing token...");
      try {
        const res = await axios.post(`${BASE_URL}/token/refresh/`, {
          refresh: refresh,
        });

        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);
        console.log("Token refreshed successfully" + newAccess);
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed", refreshError);

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
