const Router = require("express");
const router = new Router();
const carControllers = require("../controllers/carControllers");

router.get("/", carControllers.getCars);
router.get("/types", carControllers.getAllCarTypes);
router.get("/types/:id", carControllers.getCarTypeById);

router.get("/:id", carControllers.getCarById);
router.delete("/:id", carControllers.deleteCarById);
router.post("/", carControllers.createCar);
router.put("/", carControllers.updateCar);

module.exports = router;
