const router = require("express").Router();
const carController = require("../controllers/carController");
const upload = require("../middleware/upload");
const authorization = require("../middleware/authorization");

router.route("/").get(carController.getCars);

router
  .route("/")
  .post(authorization, upload.single("image"), carController.createCar);

router
  .route("/:id")
  .patch(authorization, upload.single("image"), carController.updateCar);

router.route("/:id").delete(authorization, carController.deleteCar);
router.route("/:id").get(carController.getCarById);

module.exports = router;
