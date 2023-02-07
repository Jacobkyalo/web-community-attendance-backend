const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const Attendance = require("./model/attendance");

const app = express();
const port = process.env.PORT || 5000;

// middlewares
app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: "POST",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connectDatabase;
const connectDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, () => {
      console.log("Database connected successfully");
    });
  } catch (err) {
    console.error(err);
  }
};
connectDatabase();

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

// listen for server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
