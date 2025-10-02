import ApiError from "./apiError.js";

export const sendError = (statusCode, message) => {
  //   next(new ApiError(statusCode, message));
  throw new ApiError(statusCode, message);
};
