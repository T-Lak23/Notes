import { useNavigate } from "react-router-dom";
import { useUserStore } from "../../store/useUserStore";

const GoBackFromPassReset = ({ children, to }) => {
  const { authUser } = useUserStore();
  const navigate = useNavigate();
  const handleNavigate = () => {
    authUser ? navigate("/profile") : navigate("/login");
  };
  return (
    <button
      type="button"
      onClick={handleNavigate}
      className="bg-secondary-foreground rounded-lg cursor-pointer text-primary-foreground font-medium flex items-center gap-2 px-4 py-3 justify-center"
    >
      {children}
    </button>
  );
};

export default GoBackFromPassReset;
