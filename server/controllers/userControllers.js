const ApiError = require("../error/apiError");
const user_model = require("../models/user_model");

class UserControllers {
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

  async createUser(req, res) {
    let userId = await user_model.createUser(req.bod);
    res.json(userId);
  }

  async updateUser(req, res) {
    res.json(await user_model.updateUser(req.body));
  }
}

module.exports = new UserControllers();
