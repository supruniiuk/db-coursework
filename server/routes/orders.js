const Router = require("express");
const router = new Router();
const orderControllers = require("../controllers/orderControllers");

router.get("/", orderControllers.getOrders);
/*router.get("/:id", orderControllers.getOrderById);
router.delete("/:id", orderControllers.deleteOrderById);
router.post("/", orderControllers.createOrder);
router.put("/", orderControllers.updateOrder);*/

module.exports = router;
