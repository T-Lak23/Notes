import { useNavigate, useParams } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";
import { useUserStore } from "../store/useUserStore";
import { useState } from "react";
import toast from "react-hot-toast";
import ButtonAuth from "../components/ButtonAuth";
import { Eye, EyeOff } from "lucide-react";

export const ResetPassword = () => {
  const { resetPassword, isPasswordResetting } = useUserStore();
  const [newPassword, setNewPassword] = useState("");
  const [passwordPreview, setPasswordPreview] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { token } = useParams();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const data = { token, newPassword };
      const status = await resetPassword(data);
      if (status === 200) {
        toast.success("Login with new credentials");
        navigate("/login");
      }
    } catch (error) {
      setError(error);
      if (error === "Reset token expired, Try again")
        navigate("/forgot-password");
    }
  };
  return (
    <AuthLayout
      handleSubmit={handleResetPassword}
      formHeading={"Change Password"}
      formSubHeading={"Enter your new password to change it"}
    >
      <div className="relative flex flex-col gap-1">
        <label className="text-[14px] font-semibold" htmlFor="password">
          New Password
        </label>
        <input
          type={!passwordPreview ? "password" : "text"}
          id="password"
          placeholder="********"
          className="bg-input placeholder:text-muted-foreground text-main-foreground px-4 py-3 rounded-lg border border-border"
          value={newPassword}
          onChange={(e) => {
            setNewPassword(e.target.value);
            setError(null);
          }}
          autoComplete="off"
        />
        <div
          className="absolute right-5 top-10 cursor-pointer"
          onClick={() => setPasswordPreview((prev) => !prev)}
        >
          {" "}
          {!passwordPreview ? <EyeOff size={20} /> : <Eye size={20} />}
        </div>
      </div>
      <ButtonAuth disabled={isPasswordResetting || error}>
        Reset Password
      </ButtonAuth>
    </AuthLayout>
  );
};

// export default ResetPassword;
