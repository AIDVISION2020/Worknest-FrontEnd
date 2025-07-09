import { Navigate, Outlet } from "react-router-dom";

const WorkerProtectedRoute = () => {
  const access = localStorage.getItem("access");
  return access ? <Outlet /> : <Navigate to="/" replace />;
};

export default WorkerProtectedRoute;
