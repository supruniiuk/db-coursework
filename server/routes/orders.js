const Router = require("express");
const router = new Router();
const orderControllers = require("../controllers/orderControllers");

router.get("/", orderControllers.getOrders);
router.post("/", orderControllers.createOrder);
router.delete("/:id", orderControllers.deleteOrderById);
router.get("/:id", orderControllers.getOrderById);
router.put("/dispatcher/:id",orderControllers.updateOrderByDispatcher)
router.put("/driver/:id",orderControllers.updateOrderByDriver)
router.put("/client/:id",orderControllers.updateOrderByClient)

/*router.get("/:id", orderControllers.getOrderById);
router.delete("/:id", orderControllers.deleteOrderById);
router.post("/", orderControllers.createOrder);
router.put("/", orderControllers.updateOrder);*/

module.exports = router;
