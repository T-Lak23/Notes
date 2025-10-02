import { useUserStore } from "../../store/useUserStore";
import { Navigate } from "react-router-dom";

const RedirectedRoute = ({ children }) => {
  const { authUser } = useUserStore();
  return authUser ? <Navigate to={"/notes"} /> : children;
};

export default RedirectedRoute;
