const mongoose = require("mongoose");

const Urlschema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirecturl: {
      type: String,
      required: true,
    },
    visiturl: [{ timestamp: { type: Number } }],
  },
  { timestamps: true }
);

const Url = mongoose.model("url", Urlschema);

module.exports = Url;
