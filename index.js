const express = require("express");
const mongoose = require("mongoose");
const urlroute = require("./routes/url");
const app = express();
const port = 4000;
const cors = require("cors");
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/users")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use(express.json());

app.use("/url", urlroute);

app.get("/", (req, res) => {
  res.send("📌 URL Shortener API is running");
});

app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});
