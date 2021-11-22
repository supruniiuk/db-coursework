const Router = require("express");
const router = new Router();
const userCotrollers = require("../controllers/userControllers");

router.get("/", userCotrollers.getUsers);
router.get("/:id", userCotrollers.getUserById);
router.delete("/:id", userCotrollers.deleteUserById);
router.post("/:id", userCotrollers.createUser);

module.exports = router;
