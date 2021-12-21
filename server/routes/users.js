const Router = require("express");
const router = new Router();
const userControllers = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/auth", authMiddleware, userControllers.check);

router.get("/", authMiddleware, userControllers.getUsers);
router.get("/:id/roles", authMiddleware, userControllers.getUserRolesById);
router.get("/:id", authMiddleware, userControllers.getUserById);
router.get("/role/:rolename", authMiddleware, userControllers.getUsersByRole);

router.post("/role", authMiddleware, userControllers.addUserRole);
router.post("/", userControllers.registration);
router.post("/login", userControllers.login);

router.delete("/role", authMiddleware, userControllers.deleteUserRole);
//router.delete("/:id", authMiddleware, userControllers.deleteUserById);

router.put("/", authMiddleware, userControllers.updateUser);
router.put("/role", authMiddleware, userControllers.updateUserRole);

module.exports = router;
