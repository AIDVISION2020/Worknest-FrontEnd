import { useSearchParams, Navigate } from "react-router-dom";
import AdminRegisterForm from "../pages/Auth/AdminAuth/AdminRegisterForm"; // Adjust the import path as necessary


const AdminRegTokenGate = () => {
  const [params] = useSearchParams();
  const token = params.get("token");
  // The frontend should match the backend one for gatekeeping
  const allowedToken = process.env.REACT_APP_ADMIN_REGISTRATION_TOKEN;
  if (token !== allowedToken) {
    return <Navigate to="/" />; // Redirect to home or 404
  }

  return <AdminRegisterForm />; // Your existing login JSX
};

export default AdminRegTokenGate;
