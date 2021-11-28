const pool = require("../database");

const query = async () => {
  await pool.connect();
};
