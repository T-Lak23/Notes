import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { ArrowRightFromLine, Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import ButtonAuth from "../components/ButtonAuth";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const { login, isLoggingIn } = useUserStore();
  const naviagte = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState(null);
  const [passwordPreview, setPasswordPreview] = useState(false);
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError(null);
    try {
      await login(loginData);
      setLoginData({ email: "", password: "" });
      naviagte("/notes");
    } catch (error) {
      setLoginError(error);
    }
  };

  return (
    <AuthLayout
      formHeading={"Welcome Back!"}
      formSubHeading={"Log in to manage your notes"}
      handleSubmit={handleLogin}
      to={"/register"}
      footerText={"Don't have an account?"}
      footerLink={"Register"}
    >
      <div className="flex flex-col gap-1">
        <label className="text-[14px] font-semibold" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="your@mail.com"
          className="bg-input placeholder:text-muted-foreground text-main-foreground px-4 py-3 rounded-lg border border-border"
          value={loginData.email}
          onChange={(e) => {
            setLoginData((prev) => ({ ...prev, email: e.target.value }));
            setLoginError(null);
          }}
          autoComplete="off"
        />
      </div>
      <div className="relative flex flex-col gap-1">
        <label className="text-[14px] font-semibold" htmlFor="password">
          Password
        </label>
        <input
          type={!passwordPreview ? "password" : "text"}
          id="password"
          placeholder="********"
          className="bg-input placeholder:text-muted-foreground text-main-foreground px-4 py-3 rounded-lg border border-border"
          value={loginData.password}
          onChange={(e) => {
            setLoginData((prev) => ({ ...prev, password: e.target.value }));
            setLoginError(null);
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
      <Link className="text-right my-3 font-medium" to={"/forgot-password"}>
        Forgot Password?
      </Link>

      {loginError && (
        <p className="text-red-500 text-xs text-center">{loginError}</p>
      )}

      <ButtonAuth disabled={isLoggingIn || loginError}>
        <ArrowRightFromLine size={18} />{" "}
        {isLoggingIn ? "Logging in..." : "Login"}
      </ButtonAuth>
    </AuthLayout>
  );
};

export default Login;
