import { create } from "zustand";
import { API } from "../utils/api";
import toast from "react-hot-toast";

export const useNoteStore = create((set) => ({
  notes: [],
  selectedNote: null,

  isCreating: false,
  isFetchingAll: false,
  isFetchingOne: false,
  isUpdating: false,
  isDeletingOne: false,
  isDeletingSelected: false,
  hasMore: null,

  createNote: async (data) => {
    set({ isCreating: true });
    try {
      const res = await API.post("/notes/create-note", data);
      toast.success(res.data?.message);
    } catch (error) {
      toast.error(error.response.data?.message);
      throw error.response.data?.message;
    } finally {
      set({ isCreating: false });
    }
  },

  getAllNotes: async ({
    search = "",
    tags = [],
    sort = "latest",
    page = 1,
  } = {}) => {
    set({ isFetchingAll: true });
    try {
      const query = new URLSearchParams();
      if (search) query.append("search", search);
      if (tags.length) query.append("tags", tags);
      query.append("sort", sort);
      query.append("page", page);

      const res = await API.get(`/notes/all-notes?${query.toString()}`);
      set({
        notes: res.data?.notes,
        hasMore: res.data?.pagination.hasNextPage,
      });
    } catch (error) {
      toast.error(error.response.data?.message);
      throw error.response.data?.message;
    } finally {
      set({ isFetchingAll: false });
    }
  },

  getOneNote: async (id) => {
    set({ isFetchingOne: true });
    try {
      const res = await API.get(`/notes/note/${id}`);
      set({ selectedNote: res.data?.note });
    } catch (error) {
      toast.error(error.response.data?.message);
      throw error.response.data?.message;
    } finally {
      set({ isFetchingOne: false });
    }
  },

  updateNote: async (id, data) => {
    set({ isUpdating: true });
    try {
      const res = await API.patch(`/notes/update-note/${id}`, data);
      toast.success(res.data?.message);
    } catch (error) {
      toast.error(error.response.data?.message);
      throw error.response.data?.message;
    } finally {
      set({ isUpdating: false });
    }
  },

  deleteNote: async (id) => {
    set({ isDeletingOne: true });
    try {
      const res = await API.delete(`/notes/delete/${id}`);
      toast.success(res.data?.message);
    } catch (error) {
      toast.error(error.response.data?.message);
      throw error.response.data?.message;
    } finally {
      set({ isDeletingOne: false });
    }
  },

  deleteSelectedNotes: async (ids) => {
    set({ isDeletingSelected: true });
    try {
      const res = await API.delete("/notes/delete-selected", {
        data: { ids },
      });
      toast.success(res.data?.message);
    } catch (error) {
      toast.error(error.response.data?.message);
      throw error.response.data?.message;
    } finally {
      set({ isDeletingSelected: false });
    }
  },
}));
