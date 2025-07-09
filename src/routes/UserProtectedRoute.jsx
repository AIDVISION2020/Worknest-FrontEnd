import { Navigate, Outlet } from 'react-router-dom';

const UserProtectedRoute = () => {
  const access = localStorage.getItem('access');
  return access ? <Outlet /> : <Navigate to="/login" replace />;
};

export default UserProtectedRoute;
