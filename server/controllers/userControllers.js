const ApiError = require("../error/apiError");
const userService = require("../services/user.service");
const roleService = require("../services/role.service");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//const redis = require("redis");
//const clientRedis = redis.createClient();
//clientRedis.connect();

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserControllers {
  async login(req, res, next) {
    const { email, password, role } = req.body;

    const user = await userService.getUserByEmail(email);
    if (!user) {
      return next(ApiError.internal("User undefined"));
    }

    const is_role = await roleService.checkUserRole(user.user_id, role);
    if (!is_role) {
      return next(ApiError.internal("User undefined"));
    }

    let comparePassword = bcrypt.compare(password, user.password_hash);
    if (!comparePassword) {
      return next(ApiError.internal("User undefined"));
    }

    const token = generateToken(user.user_id, user.email, role);
    return res.json({ token });
  }

  async registration(req, res, next) {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return next(ApiError.badRequest("Incorrect email or password"));
    }

    /* а тут надо проверка на роль, потому что можно много ролей иметь*/
    const checkExisting = await userService.getUserByEmail(email);
    if (checkExisting) {
      return next(ApiError.badRequest("User already exists"));
    }

    let userId = await userService.createUser(req.body);
    let user = await userService.getUserById(userId.ind);

    const token = generateToken(user.user_id, user.email, role);
    return res.json({ token });
  }

  async check(req, res) {
    const token = generateToken(req.user.id, req.user.email);
    return res.json({ token });
  }

  async getUsers(req, res) {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;

    let usersInfo = await userService.getUsers(limit, offset);
    res.json(usersInfo);
  }

  async getUsersByRole(req, res) {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;
    let role = req.params.rolename;

    let users = await userService.getUsersByRole(role, limit, offset);
    //await clientRedis.set(role, JSON.stringify(users));

    return res.json(users);
  }

  async getUserById(req, res) {
    let userId = req.params.id;
    let user = await userService.getUserById(userId);

    res.json(user);
  }

  async getUserRolesById(req, res) {
    let userId = req.params.id;
    let roles = await roleService.getUserRolesById(userId);
    console.log(roles);
    res.json(roles);
  }

  async deleteUserById(req, res) {
    let userId = req.params.id;
    let result = await userService.deleteUserById(userId);
    res.json(result);
  }

  async updateUser(req, res) {
    res.json(await userService.updateUser(req.body));
  }

  async updateUserRole(req, res) {
    res.json(await roleService.updateUserRole(req.body));
  }

  async deleteUserRole(req, res) {
    let connection_id = req.params.id;
    res.json(await roleService.deleteUserRole(connection_id));
  }
}

module.exports = new UserControllers();
