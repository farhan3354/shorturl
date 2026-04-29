import express from "express";
import {
  handleshorturl,
  handleanali,
  handleRedirect,
} from "../controllers/url";
const router = express.Router();

router.post("/", handleshorturl);
router.get("/anala/:shortId", handleanali);
router.get("/:shortId", handleRedirect);

export default router;
