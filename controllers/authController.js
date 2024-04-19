const Auth = require("../models/Auth");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Auth.findOne({ email }).populate("userId");
    if (!user) throw new Error("Email / Password tidak ada...");

    const isPassword = bcrypt.compareSync(password, user.password);
    if (!isPassword) throw new Error("Email / Password tidak ada...");

    console.log(user.userId.id);

    const token = jwt.sign(
      {
        id: user.userId.id,
        role: user.userId.role,
      },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: process.env.JWT_EXPIRE_TIME,
      }
    );

    res.status(200).json({
      status: "success",
      message: "Anda berhasil login!",
      data: {
        email,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const register = async (req, res) => {
  try {
    const { name, age, address, email, password, confirmPassword } = req.body;

    if (req.body.role) throw new Error("Tidak ada akses untuk membuat role...");

    const isUserAvailable = await Auth.findOne({ email });

    if (isUserAvailable) throw new Error("Email sudah digunakan...");
    if (password !== confirmPassword) throw new Error("Password harus sama...");

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);

    const createUser = await User.create({
      name,
      age,
      address,
    });

    const createAuth = await Auth.create({
      email,
      password: hashedPassword,
      userId: createUser._id,
    });

    res.status(200).json({
      status: "success",
      message: "Account created successfully!",
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};

const registerAdmin = async (req, res) => {
  try {
    console.log(req.user);
    if (req.user.role !== "Super Admin")
      throw new Error("Akses tidak diterima...");
    const { name, email, password, confirmPassword, age, address } = req.body;

    const isUserAvailable = await Auth.findOne({ email });

    if (isUserAvailable) throw new Error("Email sudah digunakan...");
    if (password !== confirmPassword) throw new Error("Password harus sama...");

    const saltRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    const role = "Admin";

    const createUser = await User.create({
      name,
      age,
      address,
      role,
    });

    const createAuth = await Auth.create({
      email,
      password: hashedPassword,
      userId: createUser._id,
    });

    res.status(200).json({
      status: "success",
      message: "Account created successfully",
      data: {
        Auth: createAuth,
        User: createUser,
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
  login,
  register,
  registerAdmin,
};
