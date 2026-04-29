import express from "express";
import { connecteddb } from "./config/db.js";
import { pool } from "./config/sqldb.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
// import { createUserTable } from "./sqlTable/User.js";

const app = express();
const port = 8000;

app.use(express.json());
connecteddb();

app.use("/", authRoutes);
// createUserTable();
app.get("/", (req, res) => {
  res.send("App is running");
});

app.listen(port, () => {
  console.log(`🚀 Server started on http://localhost:${port}`);
});
