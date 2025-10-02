import express from "express";
import { ENV } from "./config/env.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import userRoutes from "./routes/user.routes.js";
import notesRoutes from "./routes/notes.routes.js";
import { connectDB } from "./config/db.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();

app.use(
  cors({
    origin: ENV.RESEND_MAIL_FRONTEND_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/notes", notesRoutes);

app.use(globalErrorHandler);

app.listen(ENV.PORT, () => {
  connectDB();
  console.log("Listening on port", ENV.PORT);
});
