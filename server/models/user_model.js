const pool = require("../database");

const query = async () => {
  await pool.connect();
};

const getUsers = async () => {
  const users = `SELECT * FROM users`;
  let user_table = [];
  await pool
    .query(users)
    .then((res) => {
      user_table = res.rows;
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  return user_table;
};

const getUserById = async (id) => {
  const userQuery = `SELECT * FROM users WHERE user_id=${id}`;
  let user = "";
  await pool
    .query(userQuery)
    .then((res) => {
      user = res.rows;
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });

  return user ? user : `No user with id = ${id}`;
};

const deleteUserById = async (id) => {
  //нужно сделать транзакцию так как есть зависимости на ролях
  const result = `CALL delete_user(${id});`;
  await pool
    .query(result)
    .then((res) => {
      pool.end();
    })
    .catch((err) => {
      console.log("ERROR", err);
      pool.end();
    });
};

const createUser = async (email, name, surname, password_hash) => {
  //https://stackoverflow.com/questions/51574394/cannot-post-api-users-register
  const newUserQuery = `CALL create_user(${email}, ${name}, ${surname}, ${password_hash});`;
  await pool
    .query(newUserQuery)
    .then((res) => {
      console.log(res.rows);
      newUser = res.rows;
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
};

module.exports = { getUsers, getUserById, deleteUserById, createUser };

query();
