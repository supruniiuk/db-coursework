const ApiError = require("../error/apiError");
const user_model = require("../models/user_model");
const jwt = require("jsonwebtoken");

const generateToken = (id, email) => {
  return jwt.sign({ user_id: id, user_email: email }, process.env.SECRET_KEY, {
    expiresIn: "24hr",
  });
};

class UserControllers {
  async login() {}

  async registration(req, res, next) {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new ApiError.badRequest("Incorrect email or password"));
    }

    const checkExisting = await user_model.getUserByEmail(email);
    if (checkExisting) {
      return next(new ApiError.badRequest("User already exists"));
    }

    let userId = await user_model.createUser(req.body);
    let user = await user_model.getUserById(userId.ind);
    const token = generateToken(user.user_id, user.email);
    return res.json(token);
  }

  async getUsers(req, res) {
    let users = await user_model.getUsers();
    console.log("users", users);
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

  /*async createUser(req, res) {
    let userId = await user_model.createUser(req.body);
    res.json(userId);
  }*/

  async updateUser(req, res) {
    res.json(await user_model.updateUser(req.body));
  }

  async updateUserRole(req, res) {
    res.json(await user_model.updateUserRole(req.body));
  }

  async deleteUserRole(req, res) {
    let connection_id = req.params.id;
    res.json(await user_model.deleteUserRole(connection_id));
  }
}

module.exports = new UserControllers();
