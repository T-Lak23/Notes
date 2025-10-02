import { useUserStore } from "../../store/useUserStore";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useUserStore();
  return authUser ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
