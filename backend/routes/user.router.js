import express from "express";
import {
  authUser,
  deleteHistory,
  deleteProfile,
  getProfile,
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/user.controller.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router
  .route("/")
  .get(protect, getProfile)
  .put(protect, updateProfile)
  .delete(protect, deleteProfile);

router.get("/auth", authUser);

//Deleting history
router.post("/delete-content/:id", deleteHistory);

export default router;
