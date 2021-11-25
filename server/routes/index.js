const Router = require("express");
const router = new Router();

const userRouter = require("./users");
const carRouter = require("./cars");


router.use("/users", userRouter);
router.use("/cars", carRouter);

module.exports = router;
