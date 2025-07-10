import express from "express";
import { geminiAi } from "../controllers/geminiai.controller.js";
import { protect } from "../middleware/authMiddleware.js";
import { checkApiLimit } from "../middleware/apiMiddileware.js";

const router = express.Router();

router.post("/generate", protect, checkApiLimit, geminiAi);

export default router;
