const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// connectDatabase;
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "attendance",
});

connection.connect((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Database connected successfully");
});

// submit attendance
app.post("/attendance", async (req, res) => {
  const { firstname, lastname, year, message } = req.body;
  if (!(firstname || lastname || year || message)) {
    res.status(400).json({ message: "Please fill all the fields!" });
  } else {
    let sql = "INSERT INTO attendees SET ?";
    await connection.query(
      sql,
      { firstname, lastname, year, message },
      (err, result) => {
        if (err) throw err;
        res.status(200).json({ message: "Attendance submitted successfully!" });
      }
    );
  }
});

// listen for server
app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
