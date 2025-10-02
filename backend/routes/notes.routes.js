import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import {
  createNote,
  deletedANote,
  deleteSelected,
  getAllNotes,
  getOneNote,
  updateNote,
} from "../controllers/notes.controller.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createNoteSchema } from "../validations/notes.validation.js";
const router = express.Router();

router.post(
  "/create-note",
  verifyToken,
  validate(createNoteSchema),
  createNote
);
router.get("/all-notes", verifyToken, getAllNotes);
router.delete("/delete-selected", verifyToken, deleteSelected);
router.patch("/update-note/:id", verifyToken, updateNote);
router.get("/note/:id", verifyToken, getOneNote);
router.delete("/delete/:id", verifyToken, deletedANote);

export default router;
