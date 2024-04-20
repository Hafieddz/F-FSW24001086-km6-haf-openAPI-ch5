const router = require("express").Router();
const authController = require("../controllers/authController");
const authorization = require("../middleware/authorization");
const checkRole = require("../middleware/checkRole");

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router
  .route("/admin/register")
  .post(authorization, checkRole("Super Admin"), authController.registerAdmin);

module.exports = router;
