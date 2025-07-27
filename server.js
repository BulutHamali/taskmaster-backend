import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import userRoutes from "./routes/users.js";
import projectRoutes from "./routes/projects.js";
import taskRoutes from "./routes/tasks.js";




dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Debug route for server
app.get("/debug", (req, res) => {
  console.log("DEBUG ROUTE HIT");
  res.send("Server is alive and responding");
});

// Mount user routes
console.log("Mounting /api/users routes...");
app.use("/api/users", userRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/projects", taskRoutes);

// Root route
app.get("/", (req, res) => {
  console.log("ROOT ROUTE HIT");
  res.send("API is running...");
});

// Global error handler (for debugging unexpected issues)
app.use((err, req, res, next) => {
  console.error("GLOBAL ERROR:", err.stack);
  res.status(500).send("Something broke!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
