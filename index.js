const express = require("express");
const Connentdb = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const doctorRoutes = require("./routes/doctorRoutes.js");
const app = express();
const port = 8000;
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());

Connentdb();

app.use(express.json());

app.use("/", authRoutes);
app.use("/", doctorRoutes);

app.get("/", (req, res) => {
  res.send("App is running");
});

app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});
