import jwt from "jsonwebtoken";
import { ENV } from "../config/env.js";
import { sendError } from "./errResponse.js";

export const generateToken = (userId, res) => {
  try {
    const token = jwt.sign({ userId }, ENV.JWT_SECRET, { expiresIn: "7d" });

    if (!token) sendError(404, "Token not found");

    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: ENV.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    next(error);
  }
};
