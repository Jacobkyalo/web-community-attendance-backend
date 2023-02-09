const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

const Attendance = require("./model/attendance");

const app = express();
const PORT = process.env.PORT || 5000;

// middlewares
app.use(
  cors({
    origin: "https://web-community-attendance.netlify.app",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// submit attendance
app.post("/attendance", async (req, res) => {
  const { firstname, lastname, year, message } = req.body;

  if (!(firstname || lastname || year || message)) {
    res.status(400).json({ message: "Please fill all the fields!" });
  } else {
    await Attendance.create({
      firstname,
      lastname,
      year,
      message,
    });
    res.status(200).json({ message: "Attendance submitted successfully!" });
  }
});

// connectDatabase
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// app listen
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});
