const express = require("express");
const cors = require("cors");

const deploymentRoutes = require("./routes/deployment.routes");

const app = express();

// Allow requests from React frontend
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Middleware
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "One-Click DevOps Deployment Platform API is running",
  });
});

// API routes
app.use("/api", deploymentRoutes);

module.exports = app;