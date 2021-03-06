const pool = require("../database");
const bcrypt = require("bcryptjs");
const roleService = require("./role.service");
const pageService = require("./page.service");

const query = async () => {
  await pool.connect();
};

const getPasswordHash = (email, password) => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(email + password, salt);
};

const getUsers = async (limit_num, offset_num) => {
  const query = `SELECT * FROM users  LIMIT ${limit_num} OFFSET ${offset_num}`;
  let count = await pageService.getCount("SELECT * FROM users");

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

const deleteUserById = async (id) => {
  const driver = await roleService.checkUserRole(id, "driver");
  if (driver) {
    let delCarsQuery = `DELETE FROM cars WHERE driver_id = ${id};`;
    await pool
      .query(delCarsQuery)
      .then((res) => {
        console.log("Cars successfully deleted");
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }

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
  const query = `SELECT user_id, name, surname, email, phone, created_on 
                FROM get_users_by_role('${role}') 
                ORDER BY created_on DESC
                LIMIT ${limit_num} OFFSET ${offset_num};`;

  const count =
    await pageService.getCount(`SELECT user_id, name, surname, email, phone, created_on 
                                FROM get_users_by_role('${role}')`);
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
  let roleId = await roleService.getRoleId(role);

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
