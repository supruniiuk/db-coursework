const Router = require("express");
const router = new Router();
const userCotrollers = require("../controllers/userControllers");

router.get("/", userCotrollers.getUsers);
router.get("/:id", userCotrollers.getUserById);
router.delete("/:id", userCotrollers.deleteUserById);
router.post("/", userCotrollers.createUser);
router.put("/", userCotrollers.updateUser);
router.put("/role", userCotrollers.updateUserRole);
router.delete("/role/:id", userCotrollers.deleteUserRole);

module.exports = router;
