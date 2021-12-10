const pool = require("../database");
const jwt = require("jsonwebtoken");

const query = async () => {
  await pool.connect();
};

const getPages = async (table) => {
  const pageQuery = `SELECT COUNT(*) FROM ${table};`;
  let page = null;

  await pool
    .query(pageQuery)
    .then((res) => {
      page = res.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });

  return +page.count;
};

const getUserRoleFromToken = (req) => {
  const token = req.headers.authorization.split(" ")[1];
  const decoded = jwt.verify(token, process.env.SECRET_KEY);
  return decoded.role;
};

module.exports = {
  getPages,
  getUserRoleFromToken
};

query();
