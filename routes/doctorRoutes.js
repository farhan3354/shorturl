import express from "express";
import { authMiddleware } from "../middleware/authmiddleware.js";
import { createDoctor, getDoctors } from "../controllers/doctorProfile.js";
const router = express.Router();

router.post("/api/create", createDoctor);
router.get("/api/get", getDoctors);

export default router;
