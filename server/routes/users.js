const Router = require("express");
const router = new Router();
const userControllers = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/auth", authMiddleware, userControllers.check);

router.get("/", userControllers.getUsers);
router.get("/:id", userControllers.getUserById);
router.get("/role/:rolename", userControllers.getUsersByRole);

router.delete("/:id", userControllers.deleteUserById);
router.post("/", userControllers.registration);
router.put("/", userControllers.updateUser);
router.put("/role", userControllers.updateUserRole);
router.delete("/role/:id", userControllers.deleteUserRole);

router.post("/login", userControllers.login);

module.exports = router;
