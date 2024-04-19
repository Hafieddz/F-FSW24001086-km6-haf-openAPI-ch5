const router = require("express").Router();
const carRoutes = require("./carRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

router.use("/api/v1/cars", carRoutes);
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/auth", authRoutes)

module.exports = router;
