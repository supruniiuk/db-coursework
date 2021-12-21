const Router = require("express");
const router = new Router();
const carControllers = require("../controllers/carControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, carControllers.getCars);
router.get("/types", authMiddleware, carControllers.getAllCarTypes);

router.get("/types/:id", authMiddleware, carControllers.getCarTypeById);

router.get("/:id",authMiddleware, carControllers.getCarById);
//router.delete("/:id", authMiddleware, carControllers.deleteCarById);
router.post("/", authMiddleware, carControllers.createCar);
router.put("/", authMiddleware, carControllers.updateCar);

module.exports = router;
