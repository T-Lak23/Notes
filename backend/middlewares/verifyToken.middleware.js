import jwt from "jsonwebtoken";
import { sendError } from "../utils/errResponse.js";
import { User } from "../models/user.model.js";
import { ENV } from "../config/env.js";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.cookies?.token;
    if (!token) return sendError(400, "No token provided");

    const decoded = jwt.verify(token, ENV.JWT_SECRET);
    if (!decoded) return sendError(400, "Unauthorized");

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return sendError(400, "User not authorized");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
