import { useState } from "react";
import { useUserStore } from "../store/useUserStore";
import { useNavigate } from "react-router-dom";
import { ArrowRightFromLine, Eye, EyeOff } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import ButtonAuth from "../components/ButtonAuth";
import ProfilePicUpload from "../components/ProfilePicUpload";

const Register = () => {
  const { register, isRegistering } = useUserStore();
  const naviagte = useNavigate();
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState(null);
  const [passwordPreview, setPasswordPreview] = useState(false);
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError(null);
    try {
      const formData = new FormData();
      formData.append("name", registerData.name);
      formData.append("email", registerData.email);
      formData.append("password", registerData.password);
      if (registerData.image?.file) {
        formData.append("user", registerData.image?.file);
      }
      await register(formData);
      setRegisterData({ name: "", email: "", password: "", image: null });
      naviagte("/notes");
    } catch (error) {
      setRegisterError(error);
    }
  };

  return (
    <AuthLayout
      formHeading={"Join Us Today"}
      formSubHeading={"Register to create your account"}
      handleSubmit={handleRegister}
      to={"/login"}
      footerText={"Already have an account?"}
      footerLink={"Login"}
    >
      <div className="flex justify-center">
        <ProfilePicUpload
          value={registerData.image}
          onChange={(image) => setRegisterData((prev) => ({ ...prev, image }))}
          size={100}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-[14px] font-semibold" htmlFor="name">
          Name
        </label>
        <input
          type="text"
          id="name"
          placeholder="John Doe"
          className="bg-input placeholder:text-muted-foreground text-main-foreground px-4 py-3 rounded-lg border border-border"
          value={registerData.name}
          onChange={(e) => {
            setRegisterData((prev) => ({ ...prev, name: e.target.value }));
            setRegisterError(null);
          }}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[14px] font-semibold" htmlFor="email">
          Email
        </label>
        <input
          type="email"
          id="email"
          placeholder="your@mail.com"
          className="bg-input placeholder:text-muted-foreground text-main-foreground px-4 py-3 rounded-lg border border-border"
          value={registerData.email}
          onChange={(e) => {
            setRegisterData((prev) => ({ ...prev, email: e.target.value }));
            setRegisterError(null);
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
          value={registerData.password}
          onChange={(e) => {
            setRegisterData((prev) => ({ ...prev, password: e.target.value }));
            setRegisterError(null);
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

      {registerError && (
        <p className="text-red-500 text-xs text-center">{registerError}</p>
      )}

      <ButtonAuth disabled={isRegistering || registerError}>
        <ArrowRightFromLine size={18} />{" "}
        {isRegistering ? "isRegistering..." : "Register"}
      </ButtonAuth>
    </AuthLayout>
  );
};

export default Register;
