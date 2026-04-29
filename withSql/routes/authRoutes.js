import express from "express";
const router = express.Router();
import {
  createUser,
  deleteRoom,
  getDoctor,
  getIdDoctor,
  getUser,
  login,
} from "../controllers/authController.js";

router.get("/api", (req, res) => {
  res.send("api is running");
});

router.get("/api/doctors", getDoctor);

router.get("/api/doctor/:id", getIdDoctor);

router.delete("/api/doctor/:id", deleteRoom);

router.post("/api/createuser", createUser);

router.post("/api/login", login);

router.get("/api/user", getUser);

export default router;
