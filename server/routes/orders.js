const Router = require("express");
const router = new Router();
const orderControllers = require("../controllers/orderControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, orderControllers.getOrders);
router.get("/statistics", authMiddleware, orderControllers.getStatistics);
router.get("/statuses", authMiddleware, orderControllers.getOrderStatuses);
router.post("/", authMiddleware, orderControllers.createOrder);
router.delete("/:id", authMiddleware, orderControllers.deleteOrderById);
router.get("/:id", authMiddleware, orderControllers.getOrderById);
router.put(
  "/dispatcher/:id",
  authMiddleware,
  orderControllers.updateOrderByDispatcher
);
router.put("/driver/:id", authMiddleware, orderControllers.updateOrderByDriver);
router.put(
  "/grade/client/:id",
  authMiddleware,
  orderControllers.gradeOrderByClient
);
router.put(
  "/grade/driver/:id",
  authMiddleware,
  orderControllers.gradeOrderByDriver
);

module.exports = router;
