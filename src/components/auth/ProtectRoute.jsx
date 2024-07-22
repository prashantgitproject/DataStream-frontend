import { Navigate, Outlet } from "react-router-dom";


const ProtectRoute = ({ children, user, redirect = "/authenticate" }) => {
  if (!user) return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
};

const AdminRoute = ({ children, isAdmin, redirect = "/admin" }) => {
  if (!isAdmin) return <Navigate to={redirect} />;

  return children ? children : <Outlet />;
};

export { ProtectRoute, AdminRoute };
