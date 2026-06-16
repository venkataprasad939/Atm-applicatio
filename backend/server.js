const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

connectDB();

const app = express();

app.use(
  cors({
    origin: "https://atm-application-inky.vercel.app",
  })
);

// const allowedOrigins = [
//   "https://your-app.vercel.app",
//   "http://localhost:5173",
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       if (!origin || allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//   })
// );
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack);

  res.status(500).json({
    message: err.message,
  });
});
app.use("/api/atm", require("./routes/atmRoutes"));

app.listen(process.env.PORT || 5000, () => {
  console.log("Server Running");
});