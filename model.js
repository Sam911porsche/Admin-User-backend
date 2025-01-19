const mongoose = require("mongoose");
const { Schema } = mongoose;

const mobileSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true, default: "user" }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mobile", mobileSchema);
