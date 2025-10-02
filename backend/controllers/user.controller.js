import { User } from "../models/user.model.js";
import { sendError } from "../utils/errResponse.js";
import { sanitizeInput } from "../utils/sanitizer.js";
import bcrypt from "bcrypt";
import cloudinary from "../config/cloudinary.js";
import fs from "node:fs/promises";
import { generateToken } from "../utils/generateToken.js";
import { emailHandler } from "../utils/emailHandler.js";
import { ENV } from "../config/env.js";
import jwt from "jsonwebtoken";
export const userRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const file = req?.file;
    const sanitizedName = sanitizeInput(name).trim();
    const sanitizedEmail = sanitizeInput(email)?.trim().toLowerCase();
    if (!sanitizedName.trim() || !sanitizedEmail.trim() || !password)
      return sendError(400, "All fields are required");
    if (password.length < 6)
      return sendError(400, "Password must be atleast 6 characters long");

    const existingUser = await User.findOne({ email });
    if (existingUser) return sendError(400, "User is already registered");
    let imageURL;
    let imageId;

    if (file) {
      const result = await cloudinary.uploader.upload(file?.path, {
        folder: "project-users",
      });
      imageURL = result.secure_url;
      imageId = result.public_id;
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) return sendError(400, "Password is required");

    const newUser = new User({
      profilePic: imageURL,
      profilePicId: imageId,
      name: sanitizedName,
      email: sanitizedEmail,
      password: hashedPassword,
    });
    await newUser.save();
    generateToken(newUser._id, res);
    if (file?.path) {
      await fs
        .unlink(file.path)
        .catch((err) => console.log("File cleanup failed:", err.message));
    }
    res.status(201).json({
      user: { ...newUser._doc, password: undefined },
      message: "You are registered",
    });
  } catch (error) {
    if (req.file?.path) {
      await fs.unlink(req.file?.path, (error) => {
        if (error) console.log("Cleanup failed:", error);
      });
    }
    next(error);
  }
};

export const userLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const sanitizedEmail = sanitizeInput(email)?.trim().toLowerCase();
    if (!sanitizedEmail.trim() || !password.trim())
      return sendError(400, "All fileds are required");
    const user = await User.findOne({ email: sanitizedEmail });
    if (!user) return sendError(404, "Invalid credentials");
    const comparePassword = await bcrypt.compare(password, user.password);
    if (!comparePassword) return sendError(400, "Invalid credentials");

    generateToken(user._id, res);

    res.status(200).json({
      message: "You are logged in",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    next(error);
  }
};

export const userUpdate = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    const file = req.file;

    const sanitizedName = sanitizeInput(name)?.trim();
    const sanitizedEmail = sanitizeInput(email)?.trim().toLowerCase();

    if (!sanitizedName && !sanitizedEmail && !file)
      return sendError(400, "Please provide at least one field to update");

    const user = await User.findById(req.user._id);
    if (!user) return sendError(404, "Unauthorized, user not found");

    if (file) {
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "project-users",
      });

      if (user.profilePicId) {
        await cloudinary.uploader.destroy(user.profilePicId);
      }

      user.profilePic = result.secure_url;
      user.profilePicId = result.public_id;
    }

    if (sanitizedName) user.name = sanitizedName;
    if (sanitizedEmail) user.email = sanitizedEmail;

    await user.save();

    if (file?.path) await fs.unlink(file.path);

    res.status(200).json({
      message: "Profile updated successfully",
      user: { ...user._doc, password: undefined },
    });
  } catch (error) {
    if (req.file?.path) {
      await fs
        .unlink(req.file.path)
        .catch((err) => console.log("Cleanup failed:", err));
    }
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const user = await User.findOne(req.user._id);
    if (!user) return sendError(404, "Unauthenticated");
    res.clearCookie("token").json({ message: "You are logged out" });
  } catch (error) {
    next(error);
  }
};

export const getLoggedInUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) sendError(400, "Unauthorized user");
    res.status(200).json({ message: "User authenticated", user });
  } catch (error) {
    next(error);
  }
};

export const requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return sendError(404, "User not found");

    const token = jwt.sign({ userId: user._id }, ENV.JWT_RESET_SECRET, {
      expiresIn: "5m",
    });

    const resetLink = `${ENV.RESEND_MAIL_FRONTEND_URL}/reset-password/${token}`;

    await emailHandler(user.email, user.name, resetLink);

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) return sendError(400, "Missing fields");
    if (newPassword.length < 6)
      sendError(400, "Password must have atleast 6 characters");

    const decoded = jwt.verify(token, ENV.JWT_RESET_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) return sendError(404, "User not found");

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res
      .status(200)
      .clearCookie("token")
      .json({ message: "Password updated successfully" });
  } catch (error) {
    if (error.name === "TokenExpiredError")
      return res
        .status(400)
        .json({ message: "Reset token expired, Try again" });
    next(error);
  }
};
