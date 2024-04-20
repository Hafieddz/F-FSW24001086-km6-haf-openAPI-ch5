const router = require("express").Router();
const carController = require("../controllers/carController");
const upload = require("../middleware/upload");
const authorization = require("../middleware/authorization");
const checkRole = require("../middleware/checkRole");

router.route("/").get(authorization, carController.getCars);

router
  .route("/")
  .post(
    authorization,
    checkRole("Admin"),
    upload.single("image"),
    carController.createCar
  );

router
  .route("/:id")
  .patch(
    authorization,
    checkRole("Admin"),
    upload.single("image"),
    carController.updateCar
  );

router
  .route("/:id")
  .delete(authorization, checkRole("Admin"), carController.deleteCar);

router.route("/:id").get(carController.getCarById);

module.exports = router;
