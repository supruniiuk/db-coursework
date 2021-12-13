const ApiError = require("../error/apiError");
const user_model = require("../services/user.service");
const role_model = require("../services/role.service");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};

class UserControllers {
  async login(req, res, next) {
    const { email, password, role } = req.body;

    const user = await user_model.getUserByEmail(email);
    if (!user) {
      return next(ApiError.internal("User undefined"));
    }

    const is_role = await role_model.checkUserRole(user.user_id, role);
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
    const checkExisting = await user_model.getUserByEmail(email);
    if (checkExisting) {
      return next(ApiError.badRequest("User already exists"));
    }

    let userId = await user_model.createUser(req.body);
    let user = await user_model.getUserById(userId.ind);

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

    let usersInfo = await user_model.getUsers(limit, offset);
    res.json(usersInfo);
  }

  async getUsersByRole(req, res) {
    let { limit, page } = req.query;
    page = page || 1;
    limit = limit || 5;
    let offset = page * limit - limit;
    let role = req.params.rolename;

    let users = await user_model.getUsersByRole(role, limit, offset);
    res.json(users);
  }

  async getUserById(req, res) {
    let userId = req.params.id;
    let user = await user_model.getUserById(userId);

    res.json(user);
  }

  async deleteUserById(req, res) {
    let userId = req.params.id;
    let result = await user_model.deleteUserById(userId);
    res.json(result);
  }

  async updateUser(req, res) {
    res.json(await user_model.updateUser(req.body));
  }

  async updateUserRole(req, res) {
    res.json(await role_model.updateUserRole(req.body));
  }

  async deleteUserRole(req, res) {
    let connection_id = req.params.id;
    res.json(await role_model.deleteUserRole(connection_id));
  }
}

module.exports = new UserControllers();
