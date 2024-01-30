const AppError = require("./appError");

const handleJsonWebTokenError = () => {
  return new AppError("Invalid token, please login again!", 401);
};

export const handleJwtExpiredError = () => {
  return new AppError("Your Token has expired please login again !");
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    err: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR 🔥", err);

    res.status(500).json({
      status: "error",
      message: "Some thing wnet very wrong!",
    });
  }
};

export const errorHandler = (err, req, res, next) => {
  //console.log(err.stack);

  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (process.env.NODE_ENV === "development") {
    // console.log(process.env.NODE_ENV);

    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    // console.log(process.env.NODE_ENV);
    let error = err;

    //console.log(error.name)
    //console.log(process.env.NODE_ENV)
    if (error.name === "jsonWebTokenError") error = handleJsonWebTokenError();
    if (error.name === "TokenEpiredError") error = handleJwtExpiredError();

    sendErrorProd(error, res);
  }
};
