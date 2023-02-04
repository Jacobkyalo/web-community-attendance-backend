const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    year: Number,
    message: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Attendance", attendanceSchema);
