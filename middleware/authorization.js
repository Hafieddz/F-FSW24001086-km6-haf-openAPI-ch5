const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Auth = require("../models/Auth");

const authorization = async (req, res, next) => {
  try {
    const bearerToken = req.headers.authorization;

    console.log(bearerToken);
    if (!bearerToken) throw new Error("Token tidak ada...");

    const token = bearerToken.split(" ")[1];

    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);

    const user = await User.findById(payload.id);

    if (user === null) throw new Error("Token tidak valid!");

    req.user = user;

    next();
  } catch (error) {
    res.status(400).json({
      status: "failed",
      message: error.message,
    });
  }
};

module.exports = authorization;
