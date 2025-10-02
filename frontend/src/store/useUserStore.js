import { create } from "zustand";
import { API } from "../utils/api";
import toast from "react-hot-toast";

export const useUserStore = create((set) => ({
  authUser: null,
  isAuthLoading: true,
  isLoggingIn: false,
  isRegistering: false,
  isUpdating: false,
  isRequestPassChange: false,

  getLoggedInUser: async () => {
    try {
      const res = await API.get("/users/user");
      set({ authUser: res.data?.user });
    } catch (error) {
      //   console.log(error);
      set({ authUser: null });
    } finally {
      set({ isAuthLoading: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await API.post("/users/login", data);
      set({ authUser: res.data?.user });
      toast.success(res.data?.message);
    } catch (error) {
      toast.error(error.response.data?.message);
      throw error.response.data?.message;
    } finally {
      set({ isLoggingIn: false });
    }
  },
  register: async (data) => {
    set({ isRegistering: true });
    try {
      const res = await API.post("/users/register", data);
      set({ authUser: res.data?.user });
      toast.success(res.data?.message);
    } catch (error) {
      toast.error(error.response.data?.message);
      throw error.response.data?.message;
    } finally {
      set({ isRegistering: false });
    }
  },

  updateUser: async (data) => {
    set({ isUpdating: true });
    try {
      const res = await API.patch("/users/update-user", data);
      set({ authUser: res.data?.user });
      toast.success(res.data?.message);
    } catch (error) {
      toast.error(error.response.data?.message);
      throw error.response.data?.message;
    } finally {
      set({ isUpdating: false });
    }
  },

  logout: async () => {
    set({ isLoggingOut: true });
    try {
      const res = await API.post("/users/logout");
      toast.success(res.data?.message);
      set({ authUser: null });
    } catch (error) {
      toast.error(error.response.data?.message);
      throw error.response.data?.message;
    } finally {
      set({ isLoggingOut: false });
    }
  },

  passwordRequest: async (email) => {
    set({ isRequestPassChange: true });
    try {
      const res = await API.post("/users/password-request", { email });
      //   console.log(res);
      toast.success(res.data?.message);
      return res.status;
    } catch (error) {
      toast.error(error.response.data?.message);
      throw error.response.data?.message;
    } finally {
      set({ isRequestPassChange: false });
    }
  },
  resetPassword: async (data) => {
    set({ isPasswordResetting: true });
    try {
      const res = await API.patch("/users/reset-password", data);
      toast.success(res.data?.message);
      return res.status;
    } catch (error) {
      toast.error(error.response.data?.message);
      //   console.log("failed", error);

      throw error.response.data?.message;
    } finally {
      set({ isPasswordResetting: false });
    }
  },
}));
