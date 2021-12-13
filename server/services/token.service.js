const jwt = require("jsonwebtoken");

const getUserRoleFromToken = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  return decoded.roleId;
};

const getUserIdFromToken = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  return decoded.id;
};

module.exports = {
  getUserRoleFromToken,
  getUserIdFromToken,
};
