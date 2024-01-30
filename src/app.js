const express = require("express");
const cors = require("cors");

const userRouter = require("./users/routes/user.routes");
const blogsRouter = require("./blogs/routes/blogs.routes");
const eventsRouter = require("./companyevents/routes/events.routes");
require("dotenv").config();

const morgan = require("morgan");

const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

app.use(express.json({ limit: "5mb" }));

app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Welcome to Blog app 🔥 two",
  });
});

app.use("/api/v1/users", userRouter);
app.use("/api/v1/blogs", blogsRouter);
app.use("/api/v1/events", eventsRouter);
app.all("*", (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

module.exports = app;
