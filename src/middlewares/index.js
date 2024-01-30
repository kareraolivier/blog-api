const { User } = require("../../models");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const protect = (req, res, next) => {
  try {
    const token = req.access_token;
    console.log("Access token", token);
    if (!token) {
      return res.status(403).json({
        status: "fail",
        message: "No token found",
      });
    }
    const data = jwt.verify(token, process.env.JWT_SECRET);

    console.log("decoded data", data);
    if (data?.user) {
      req.user = data?.user;
    }

    return next();
  } catch (err) {
    console.log(err.stack);
    return res.status(403).json({
      status: "Error",
      message: err.message,
    });
  }
};

const requireSignin = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: {
        uuid: decoded.user.uuid,
      },
    });

    if (!user) {
      return res.status(401).json({
        status: "fail",
        message: "Un Authorised",
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log(error.stack);
    return res.status(500).json({
      status: "error",
      message: "validation error",
    });
  }
};
module.exports = { requireSignin, protect };
