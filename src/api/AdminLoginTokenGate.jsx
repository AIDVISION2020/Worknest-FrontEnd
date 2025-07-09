import { useSearchParams, Navigate } from "react-router-dom";
import AdminRegForm from "../pages/Auth/AdminAuth/AdminLoginForm"; // Adjust the import path as necessary


const AdminLoginTokenGate = () => {
  const [params] = useSearchParams();
  const token = params.get("token");

  // The frontend should match the backend one for gatekeeping
  const allowedToken = process.env.REACT_APP_ADMIN_ACCESS_TOKEN;

  if (token !== allowedToken) {
    return <Navigate to="/" />; // Redirect to home or 404
  }

  return <AdminRegForm />; // Your existing login JSX
};

export default AdminLoginTokenGate;
