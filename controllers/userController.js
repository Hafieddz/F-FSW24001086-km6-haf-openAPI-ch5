const User = require("../models/User");

const getUsers = async (req, res) => {
  if (req.user.role !== "Super Admin")
    throw new Error("Akses tidak diterima...");

  try {
    let query = {};
    if (req.query) {
      query = req.query;
    }
    const users = await User.find();

    res.status(200).json({
      status: "success",
      totalData: users.length,
      data: {
        users,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const currentUser = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

module.exports = {
  getUsers,
  currentUser,
};
