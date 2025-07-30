const express = require("express");
const {
  handleshorturl,
  handleanali,
  handleRedirect,
} = require("../controllers/url");
const router = express.Router();

router.post("/", handleshorturl);
router.get("/anala/:shortId", handleanali);
router.get("/:shortId", handleRedirect);

module.exports = router;
