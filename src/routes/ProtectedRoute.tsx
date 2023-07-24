import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../redux/hookx";

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { token } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  if (!token) {
    return <Navigate to="/sign-in" state={{ path: pathname }} />;
  }

  return children;
};

export default ProtectedRoute;
