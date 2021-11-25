const Router = require("express");
const router = new Router();
const userControllers = require("../controllers/userControllers");

router.get("/", userControllers.getUsers);
router.get("/:id", userControllers.getUserById);
router.delete("/:id", userControllers.deleteUserById);
router.post("/", userControllers.createUser);
router.put("/", userControllers.updateUser);
router.put("/role", userControllers.updateUserRole);
router.delete("/role/:id", userControllers.deleteUserRole);

module.exports = router;
