import { useUserStore } from "../store/useUserStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProfileShow = () => {
  const { authUser, getLoggedInUser, isAuthLoading } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) getLoggedInUser();
  }, []);

  if (isAuthLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Loading profile...</p>
      </div>
    );

  if (!authUser)
    return (
      <div className="text-center text-muted-foreground mt-10">
        No user data available
      </div>
    );

  return (
    <div className="max-w-xl mx-auto p-6 sm:p-8 mt-6 bg-card border border-border rounded-2xl shadow">
      <div className="flex flex-col items-center gap-4 text-center">
        <img
          src={authUser.profilePic || "/default-avatar.png"}
          alt="Profile"
          className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover border border-border"
        />
        <h2 className="text-2xl font-semibold text-card-foreground">
          {authUser.name}
        </h2>
        <p className="text-muted-foreground">{authUser.email}</p>

        <button
          onClick={() => navigate("/profile/edit")}
          className="mt-4 px-6 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-blue-700 transition"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default ProfileShow;
