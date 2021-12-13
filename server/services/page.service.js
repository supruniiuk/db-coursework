const pool = require("../database");
const jwt = require("jsonwebtoken");

const query = async () => {
  await pool.connect();
};

const getCount = async (table) => {
  const pageQuery = `SELECT COUNT(*) FROM ${table};`;
  let objects = null;

  await pool
    .query(pageQuery)
    .then((res) => {
      objects = res.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });

  return +objects.count;
};

module.exports = {
  getCount,
};

query();
