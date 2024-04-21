const router = require("express").Router();
const swaggerUI = require("swagger-ui-express");
const swaggerDocs = require("../docs/api-docs.json");

const carRoutes = require("./carRoutes");
const userRoutes = require("./userRoutes");
const authRoutes = require("./authRoutes");

router.use("/api_docs", swaggerUI.serve);
router.use("/api_docs", swaggerUI.setup(swaggerDocs));

router.use("/api/v1/cars", carRoutes);
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/auth", authRoutes);

module.exports = router;
