const router = require("express").Router();
const userController = require("../controllers/userController");
const authorization = require("../middleware/authorization");
const checkRole = require("../middleware/checkRole");

router
  .route("/")
  .get(authorization, checkRole("Super Admin"), userController.getUsers);

router.route("/current_user").get(authorization, userController.currentUser);

module.exports = router;
