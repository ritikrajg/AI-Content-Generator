import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  freeSubscription,
  stripePayment,
  verifyPayment,
} from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/upgrade", protect, stripePayment);

router.post("/verify/:paymentId", protect, verifyPayment);

router.post("/freeplan", protect, freeSubscription);

export default router;
