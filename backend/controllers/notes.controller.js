import { Notes } from "../models/notes.model.js";
import { User } from "../models/user.model.js";
import { sendError } from "../utils/errResponse.js";
import { sanitizeInput } from "../utils/sanitizer.js";

export const createNote = async (req, res, next) => {
  try {
    const { title, content, isPinned = false, tags } = req.body;
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedContent = sanitizeInput(content);
    const sanitizedTags = Array.isArray(tags)
      ? tags.map((tag) => sanitizeInput(tag))
      : [];

    if (!sanitizedTitle.trim()) return sendError(400, "Title is required");

    const user = await User.findById(req.user._id);
    if (!user) return sendError(404, "User not found");

    const newNote = new Notes({
      title: sanitizedTitle,
      content: sanitizedContent,
      isPinned,
      tags: sanitizedTags,
      author: user._id,
    });
    await newNote.save();

    res.status(201).json({
      message: "New note added",
      note: newNote,
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, tags, isPinned } = req.body;
    const sanitizedTitle = sanitizeInput(title);
    const sanitizedContent = sanitizeInput(content);
    const sanitizedTags = Array.isArray(tags)
      ? tags.map((tag) => sanitizeInput(tag))
      : [];
    if (!title && !content && !tags && typeof isPinned !== "boolean")
      return sendError(400, "Atleast one change required to update a note");

    const user = await User.findById(req.user._id);
    if (!user) return sendError(404, "User not found");
    const noteToEdit = await Notes.findOne({ _id: id, author: user._id });
    if (!noteToEdit) return sendError(400, "Unauthorized");

    const updatedNote = await Notes.findByIdAndUpdate(
      noteToEdit._id,
      {
        title: sanitizedTitle ? sanitizedTitle : noteToEdit.title,
        content: sanitizedContent ? sanitizedContent : noteToEdit.content,
        isPinned:
          typeof isPinned === "boolean" ? isPinned : noteToEdit.isPinned,
        tags: Array.isArray(tags) ? sanitizedTags : noteToEdit.tags,
      },
      { new: true }
    );

    res.status(200).json({
      message: "A note has updated",
      note: updatedNote,
    });
  } catch (error) {
    next(error);
  }
};

export const getOneNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findById(req.user._id);
    if (!user) return sendError(404, "User not found");

    const requestedNote = await Notes.findOne({ _id: id, author: user._id });
    if (!requestedNote) return sendError(404, "Note not found");

    res.status(200).json({
      message: "A note is found",
      note: requestedNote,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;
    const skip = (page - 1) * limit;

    const sortOrder = req.query.sort === "oldest" ? 1 : -1;
    const search = req.query.search?.trim();
    const tags = req.query.tags ? req.query.tags.split(",") : [];

    const query = { author: req.user._id };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ];
    }

    if (tags.length > 0) query.tags = { $in: tags };

    const totalNotes = await Notes.countDocuments(query);
    const notes = await Notes.find(query)
      .sort({ createdAt: sortOrder })
      .skip(skip)
      .limit(limit);

    if (!notes)
      return res.status(200).json({
        message: "Notes not found!",
        notes: [],
      });

    const totalPages = Math.ceil(totalNotes / limit);
    res.status(200).json({
      message: "All notes found!",
      //   notPinnedNotes: notes.filter((note) => !note.isPinned) || [],
      //   pinnedNotes: notes.filter((note) => note.isPinned) || [],
      notes,
      pagination: {
        totalNotes,
        totalPages,
        currentPage: page,
        hasNextPage: page < totalPages,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deletedANote = async (req, res, next) => {
  try {
    const { id } = req.params;

    const noteToDelete = await Notes.findOneAndDelete({
      _id: id,
      author: req.user._id,
    });
    if (!noteToDelete) return sendError(404, "This note cannot be deleted");

    res.status(200).json({
      message: "You deleted a note",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteSelected = async (req, res, next) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids) || ids.length === 0)
      return sendError(400, "Invalid or empty ID list");

    const deletedNotes = await Notes.deleteMany({
      _id: { $in: ids },
      author: req.user._id,
    });

    if (deletedNotes.deletedCount === 0)
      return sendError(404, "No notes matched for deletion");

    res.status(200).json({
      message: "Selected notes deleted",
      deletedCount: deletedNotes.deletedCount,
    });
  } catch (error) {
    next(error);
  }
};
