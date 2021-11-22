const pool = require("../db");

const query = async () => {
  await pool.connect();
};

const createUserTable = () => {
  const userTable = `CREATE TABLE IF NOT EXISTS
    users(
        user_id serial PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        surname VARCHAR(255) NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_on TIMESTAMP NOT NULL
    );`;
  pool
    .query(userTable)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

const getUsers = async () => {
  const users = `SELECT * FROM users`;
  let user_table = [];
  await pool
    .query(users)
    .then((res) => {
      console.log(res.rows);
      user_table = res.rows;
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  console.log("user_table", user_table);
  return user_table;
};

module.exports = { getUsers, createUserTable };

query();
