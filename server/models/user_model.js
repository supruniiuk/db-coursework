const pool = require("../database");
const bcrypt = require("bcryptjs");
const query = async () => {
  await pool.connect();
};

const getPasswordHash = (email, password) => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(email + password, salt);
};

const getUsers = async () => {
  const users = `SELECT * FROM users`;
  let user_table = [];
  await pool
    .query(users)
    .then((res) => {
      user_table = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return user_table;
};

const deleteUserById = async (id) => {
  //нужно сделать транзакцию так как есть зависимости на ролях
  const result = `CALL delete_user(${id});`;
  await pool
    .query(result)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

const deleteUserRole = async (id) => {
  const result = `CALL delete_user_role_connection(${id});`;
  await pool
    .query(result)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

const getUserById = async (id) => {
  const userQuery = `SELECT * FROM users WHERE user_id=${id}`;
  let user = "";
  await pool
    .query(userQuery)
    .then((res) => {
      user = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return user;
};

const createUser = async (body) => {
  let { email, name, surname, password, role_id } = body;
  let password_hash = getPasswordHash(email, password);
  const newUserQuery = `CALL create_user(null, '${email}', '${name}', '${surname}', '${password_hash}', ${role_id});`;

  let userId = null;
  await pool
    .query(newUserQuery)
    .then((res) => {
      userId = res.rows;
      newUser = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return userId;
};

const updateUser = async (body) => {
  let { user_id, email, name, surname, password } = body;
  let password_hash = getPasswordHash(email, password);
  const changeUserQuery = `CALL update_user(${user_id}, '${email}', '${name}', '${surname}', '${password_hash}');`;

  console.log(changeUserQuery);
  await pool
    .query(changeUserQuery)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateUserRole = async (body) => {
  let { id, user_id, role_id } = body;
  const changeUserRoleQuery = `CALL update_role_connection(${id}, ${user_id}, ${role_id})`;

  await pool
    .query(changeUserRoleQuery)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUser,
  updateUserRole,
  deleteUserRole
};

query();
