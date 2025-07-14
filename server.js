import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connectDb } from "./db/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
dotenv.config();
//Importing Routes
import userRoutes from "./routes/user.router.js";
import genAiRoute from "./routes/geminiai.router.js";
import paymentRoutes from "./routes/payment.route.js";
import path from "path"
connectDb(); //Database
const port = process.env.PORT || 5000;
//Express Initialized
const app = express();

// Security Middlewares
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "https://js.stripe.com"],
      objectSrc: ["'none'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      imgSrc: ["'self'", "data:", "https:"],
      connectSrc: ["'self'", "https://js.stripe.com"],
      frameSrc: ["'self'", "https://js.stripe.com"],
    },
  },
}));
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
}));
//Middlewares
app.use(express.json());
app.use(cors({
  origin: process.env.FRONTEND_URL?.split(",") || [],
  credentials: true
}));
app.use(cookieParser());

//Routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/ai", genAiRoute);
app.use("/api/v1/payment", paymentRoutes);
if (process.env.NODE_ENV === "production") {
  const dirPath = path.resolve();
  app.use(express.static("./frontend/dist"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(dirPath, "./frontend/dist", "index.html"));
  });
}
// Main API route (optional, for health check)
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to AI Content Generator Server" });
});
// Error Handling Middlewares (should be after all routes)
app.use(notFound);
app.use(errorHandler);

//Server Start
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
