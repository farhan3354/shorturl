const express = require("express");
const { authMiddleware } = require("../middleware/authmiddleware");
const { createDoctor, getDoctors } = require("../controllers/doctorProfile");
const router = express.Router();

router.post("/api/create", createDoctor);
router.get("/api/get", getDoctors);

module.exports = router;
