// const express = require("express");
// const dotenv = require("dotenv");
// const connectDB = require("./config/db");
// const hashRoutes = require("./routes/hashRoutes");
// const authRoutes = require("./routes/authRoutes");
// const path = require("path");

// dotenv.config();

// // connect database
// connectDB();

// const app = express();

// // IMPORTANT middleware
// app.use(express.json());

// // ==============================
// // SERVE FRONTEND FILES
// // ==============================

// // serve static frontend folder
// app.use(express.static(path.join(__dirname, "frontend")));

// // ==============================
// // API ROUTES
// // ==============================

// app.use("/api", authRoutes);
// app.use("/api/hash", hashRoutes);

// // ==============================
// // ROOT ROUTE → open index.html
// // ==============================

// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "frontend", "index.html"));
// });

// // ==============================
// // START SERVER
// // ==============================

// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log("Server running on port", PORT);
//   console.log("Frontend: http://localhost:5000");
//   console.log("API: http://localhost:5000/api");
//   console.log("ENV TEST:", process.env.JWT_SECRET);
// });

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const hashRoutes = require("./routes/hashRoutes");
const authRoutes = require("./routes/authRoutes");
const testRoutes = require("./routes/testroutes"); // ✅ NEW LINE ADDED
const path = require("path");

dotenv.config();

// connect database
connectDB();

const app = express();

// IMPORTANT middleware
app.use(express.json());

// ==============================
// SERVE FRONTEND FILES
// ==============================

// serve static frontend folder
app.use(express.static(path.join(__dirname, "frontend")));

// ==============================
// API ROUTES
// ==============================

app.use("/api", authRoutes);
app.use("/api/hash", hashRoutes);
app.use("/api/test", testRoutes); // ✅ NEW ROUTE ADDED


// ==============================
// ROOT ROUTE → open index.html
// ==============================

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "index.html"));
});

// ==============================
// START SERVER
// ==============================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
  console.log("Frontend: http://localhost:5000");
  console.log("API: http://localhost:5000/api");
  console.log("Test API: http://localhost:5000/api/test"); // ✅ NEW LOG
  console.log("ENV TEST:", process.env.JWT_SECRET);
});