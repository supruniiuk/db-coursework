const Router = require("express");
const router = new Router();
const userControllers = require("../controllers/userControllers");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/auth", authMiddleware, userControllers.check);

router.get("/", userControllers.getUsers);
router.get("/:id/roles", userControllers.getUserRolesById);
router.get("/:id", userControllers.getUserById);
router.get("/role/:rolename", userControllers.getUsersByRole);

router.post("/role", userControllers.addUserRole);
router.post("/", userControllers.registration);
router.post("/login", userControllers.login);

router.delete("/role", userControllers.deleteUserRole);
router.delete("/:id", userControllers.deleteUserById);

router.put("/", userControllers.updateUser);
router.put("/role", userControllers.updateUserRole);

module.exports = router;
