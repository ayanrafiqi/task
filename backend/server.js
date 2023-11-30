const express = require("express");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const marksRoutes = require("./routes/marksRoutes");

require("dotenv").config();
require("./config/db").connectDB();

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("api is running");
});

app.use("/api/teachers", teacherRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/marks", marksRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `server is running in ${process.env.NODE} mode Successfully on Port ${PORT}`
  );
});
