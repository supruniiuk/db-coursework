const ApiError = require("../error/apiError");

class UserControllers {
  async getUsers(req, res, next) {
    const { id } = req.query;
    if (!id) {
      return next(ApiError.badRequest("no id"));
    }
    res.json(id);
  }
}

module.exports = new UserControllers();
