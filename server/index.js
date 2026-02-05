/**
 * Main entrance of the backend server.
 * Handles middleware registration, database connection, and routing.
 */

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

// Initialize app
const app = express();

// Connect to Database
connectDB();

// Standard Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Full Stack Authentication API is running...");
});

// Authentication Routes
app.use("/api/auth", authRoutes);

// Global Error Handler Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong on the server!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

// Port configuration
const PORT = process.env.PORT || 5000;

// Listen for requests
app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV || 'production'} mode on http://localhost:${PORT}`);
});
