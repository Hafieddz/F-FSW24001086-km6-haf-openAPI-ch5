const router = require("express").Router();
const userController = require("../controllers/userController");
const authorization = require("../middleware/authorization");

router.route("/").get(authorization, userController.getUsers);
router.route("/current_user").get(authorization, userController.currentUser);

module.exports = router;
