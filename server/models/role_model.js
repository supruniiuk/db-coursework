const pool = require("../database");

const query = async () => {
  await pool.connect();
};

const getRoleId = async (role) => {
  const users = `SELECT role_id FROM roles WHERE role_name = '${role}'`;
  let roleId = null;
  await pool
    .query(users)
    .then((res) => {
      roleId = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return roleId[0];
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

const checkUserRole = async (userId, role) => {
  let roleId = await getRoleId(role);
  roleId = roleId.role_id;

  const checkRoleExistance = `SELECT * FROM user_role WHERE user_id = ${userId} AND role_id = ${roleId}`;
  let is_exist = false;

  await pool
    .query(checkRoleExistance)
    .then((res) => {
      if (res.rows.length > 0) {
        is_exist = true;
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return is_exist;
};

module.exports = {
  getRoleId,
  updateUserRole,
  deleteUserRole,
  checkUserRole,
};

query();
