import express from "express";
import {
  registerUser,
  loginUser,
  getUser,
} from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authmiddleware.js";
const router = express.Router();

router.post("/api/register", registerUser);
router.post("/api/login", loginUser);
router.get("/api/user", authMiddleware, getUser);

export default router;
