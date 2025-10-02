import express from "express";
import { verifyToken } from "../middlewares/verifyToken.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import {
  loginSchema,
  registerSchema,
} from "../validations/user.validations.js";
import {
  getLoggedInUser,
  logout,
  requestPasswordReset,
  resetPassword,
  userLogin,
  userRegister,
  userUpdate,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
const router = express.Router();

router.post("/login", validate(loginSchema), userLogin);
router.post(
  "/register",
  upload.single("user"),
  validate(registerSchema),
  userRegister
);

router.post("/logout", verifyToken, logout);
router.patch("/update-user", verifyToken, upload.single("user"), userUpdate);
router.post("/password-request", requestPasswordReset);
router.patch("/reset-password", resetPassword);

router.get("/user", verifyToken, getLoggedInUser);

export default router;
