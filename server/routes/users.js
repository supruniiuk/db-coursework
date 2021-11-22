const Router = require("express");
const router = new Router();
const userCotrollers = require("../controllers/userControllers");

router.get("/", userCotrollers.getUsers);

module.exports = router;
