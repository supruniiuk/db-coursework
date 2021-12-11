const Router = require("express");
const router = new Router();
const orderControllers = require("../controllers/orderControllers");

router.get("/", orderControllers.getOrders);
router.post("/", orderControllers.createOrder);
router.delete("/:id", orderControllers.deleteOrderById);
router.get("/:id", orderControllers.getOrderById);
router.put("/dispatcher/:id",orderControllers.updateOrderByDispatcher)
router.put("/driver/:id",orderControllers.updateOrderByDriver)
router.put("/grade/client/:id",orderControllers.gradeOrderByClient)
router.put("/grade/driver/:id",orderControllers.gradeOrderByDriver)

module.exports = router;
