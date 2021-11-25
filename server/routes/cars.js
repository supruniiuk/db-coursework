const Router = require("express");
const router = new Router();
const carCotrollers = require("../controllers/carControllers");

router.get("/", carCotrollers.getCars);
router.get("/:id", carCotrollers.getCarById);
router.post("/", carCotrollers.createCar);

module.exports = router;
