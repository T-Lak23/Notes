import { useState, useEffect } from "react";
import { useUserStore } from "../store/useUserStore";
import ProfilePicUpload from "../components/ProfilePicUpload";
import { useNavigate } from "react-router-dom";

const ProfileEdit = () => {
  const { authUser, getLoggedInUser, updateUser, isUpdating, isAuthLoading } =
    useUserStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    profilePic: null,
  });

  useEffect(() => {
    if (!authUser) getLoggedInUser();
    else
      setForm({
        name: authUser.name || "",
        email: authUser.email || "",
        profilePic: authUser.profilePic
          ? { previewUrl: authUser.profilePic }
          : null,
      });
  }, [authUser]);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", form.name);
    data.append("email", form.email);
    if (form.profilePic?.file) data.append("profilePic", form.profilePic.file);

    await updateUser(data);
    navigate("/profile");
  };

  if (isAuthLoading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );

  return (
    <div className="max-w-xl mx-auto p-6 sm:p-8 mt-6 bg-card border border-border rounded-2xl shadow">
      <h2 className="text-xl sm:text-2xl font-semibold text-card-foreground mb-6 text-center">
        Edit Profile
      </h2>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <div className="flex justify-center mb-4">
          <ProfilePicUpload
            value={form.profilePic}
            onChange={(val) =>
              setForm((prev) => ({ ...prev, profilePic: val }))
            }
            size={120}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="name"
            className="text-secondary-foreground font-medium"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="border border-border rounded-xl px-4 py-2 bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="text-secondary-foreground font-medium"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="border border-border rounded-xl px-4 py-2 bg-input text-card-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <button
          type="submit"
          disabled={isUpdating}
          className="mt-4 px-6 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUpdating ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default ProfileEdit;
