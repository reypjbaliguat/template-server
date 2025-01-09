const express = require("express");
const colors = require("colors");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

connectDB();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use("/api/v1/auth", authRoutes);

app.listen(port, () => console.log(`Server is listening to ${port}`));
