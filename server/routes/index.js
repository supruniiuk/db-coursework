const Router = require("express");
const router = new Router();

const userRouter = require("./users");
const carRouter = require("./cars");
const orderRouter = require("./orders");


router.use("/users", userRouter);
router.use("/cars", carRouter);
router.use("/orders", orderRouter);

module.exports = router;
