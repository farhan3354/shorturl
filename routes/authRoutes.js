const express = require("express");
const {
  registerUser,
  loginUser,
  getUser,
} = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authmiddleware");
const router = express.Router();

router.post("/api/register", registerUser);
router.post("/api/login", loginUser);
router.get("/api/user", authMiddleware, getUser);

module.exports = router;
