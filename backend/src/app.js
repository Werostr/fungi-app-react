var createError = require("http-errors");
const mongoose = require("mongoose");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");

mongoose
  .connect("mongodb://127.0.0.1:27017/fungi-elysium")
  .then(() => {
    console.log("CONNECTED TO MONGODB");
  })
  .catch((error) => {
    console.log("CONNECTION ERROR:", error.message);
  });

const fungiRouter = require("./controllers/fungiRouter");
const reviewsRouter = require("./controllers/reviewsRouter");
const usersRouter = require("./controllers/usersRouter");
const testAPIRouter = require("./controllers/testAPI");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api/fungi", fungiRouter);
app.use("/api/fungi/:id/reviews", reviewsRouter);
app.use("/api/users", usersRouter);
app.use("/testAPI", testAPIRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
