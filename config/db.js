const mongoose = require("mongoose");

const Connentdb = () => {
  mongoose
    .connect("mongodb://localhost:27017/doctor")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error("MongoDB connection error:", err));
};

module.exports = Connentdb;
