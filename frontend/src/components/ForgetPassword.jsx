import { useState } from "react";
import AuthLayout from "./AuthLayout";
import { useUserStore } from "../store/useUserStore";
import ButtonAuth from "./ButtonAuth";
import GoBackFromPassReset from "./guards/GoBackFromPassReset";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const { passwordRequest, isRequestPassChange, authUser } = useUserStore();
  const [email, setEmail] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const handleSendResetEmail = async (e) => {
    e.preventDefault();
    try {
      console.log("email", email);
      const status = await passwordRequest(email);
      if (status === 200) navigate(`${authUser ? "/profile" : "/login"}`);
    } catch (error) {
      setError(error);
    }
  };
  return (
    <div>
      <AuthLayout
        handleSubmit={handleSendResetEmail}
        formHeading={"Reset Password"}
        formSubHeading={"Enter valid email to receive password reset link"}
      >
        <input
          type="email"
          placeholder="your@mail.com"
          className="bg-input placeholder:text-muted-foreground text-main-foreground px-4 py-3 rounded-lg border border-border"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError(null);
          }}
          autoComplete="off"
        />

        {error && <p className="text-red-500 text-xs text-center">{error}</p>}

        <ButtonAuth disabled={isRequestPassChange || error}>Confirm</ButtonAuth>
        <GoBackFromPassReset>Go Back</GoBackFromPassReset>
      </AuthLayout>
    </div>
  );
};

export default ForgetPassword;
