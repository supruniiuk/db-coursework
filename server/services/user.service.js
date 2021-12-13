const pool = require("../database");
const bcrypt = require("bcryptjs");
const role_model = require("./role.service");
const pageService = require("./page.service");

const query = async () => {
  await pool.connect();
};

const getPasswordHash = (email, password) => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(email + password, salt);
};

const getUsers = async (limit_num, offset_num) => {
  const users = `SELECT * FROM users  LIMIT ${limit_num} OFFSET ${offset_num}`;
  let count = await pageService.getCount("users");

  let user_table = [];
  await pool
    .query(users)
    .then((res) => {
      user_table = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  console.log(user_table);
  return { count, user_table };
};

const deleteUserById = async (id) => {
  //нужно сделать транзакцию так как есть зависимости на ролях
  const result = `CALL delete_user(${id});`;

  await pool
    .query(result)
    .then((res) => {
      console.log("User successfully deleted");
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
  return user[0];
};

const getUsersByRole = async (role, limit_num, offset_num) => {
  const query = `SELECT user_id, name, surname, email, phone, created_on FROM get_users_by_role('${role}') LIMIT ${limit_num} OFFSET ${offset_num}`;
  const count = await pageService.getCount(`get_users_by_role('${role}')`);
  let users = [];

  await pool
    .query(query)
    .then((res) => {
      users = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return { count, users };
};

const getUserByEmail = async (email) => {
  const userQuery = `SELECT * FROM users WHERE email='${email}'`;

  let user = "";
  await pool
    .query(userQuery)
    .then((res) => {
      user = res.rows[0];
    })
    .catch((err) => {
      console.log(err);
      user = false;
    });

  return user;
};

const createUser = async (body) => {
  let { name, surname, email, phone, password, role } = body;

  let password_hash = getPasswordHash(email, password);
  let roleId = await role_model.getRoleId(role);

  const newUserQuery = `CALL create_user(null, '${name}', '${surname}','${email}', '${phone}', '${password_hash}', ${roleId.role_id});`;
  let userId = null;
  await pool
    .query(newUserQuery)
    .then((res) => {
      userId = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return userId[0];
};

const updateUser = async (body) => {
  let { name, surname, email, phone, password } = body;
  let password_hash = getPasswordHash(email, password);

  const changeUserQuery = `CALL update_user(${user_id}, '${name}', '${surname}','${email}', '${phone}, '${password_hash}');`;

  await pool
    .query(changeUserQuery)
    .then((res) => {
      console.log("User successfully updated");
    })
    .catch((err) => {
      console.log(err);
    });
};

/* add role to user */

module.exports = {
  getUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUser,
  getUserByEmail,
  getUsersByRole,
};

query();
