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

const updateUserRole = async (body) => {
  let { id, user_id, role_id } = body;
  const changeUserRoleQuery = `CALL update_role_connection(${id}, ${user_id}, ${role_id})`;

  await pool
    .query(changeUserRoleQuery)
    .then((res) => {
      console.log("User successfully updated!");
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

const getUserRolesById = async (userId) => {
  let allRoles = ["client", "driver", "dispatcher"];

  let userRoles = {};
  for (let i = 0; i < allRoles.length; i++) {
    let role_name = allRoles[i];
    let is_role = await checkUserRole(userId, role_name);
    userRoles[role_name] = is_role;
  }

  return userRoles;
};

const addUserRole = async (userId, rolename) => {
  const roleObj = await getRoleId(rolename);
  const roleId = roleObj.role_id;

  const query = `CALL connect_user_role(${userId},${roleId})`;
  await pool
    .query(query)
    .then((res) => {
      console.log("Role successfully added!", res.rows);
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

const deleteUserRole = async (userId, rolename) => {
  const roleObj = await getRoleId(rolename);
  const roleId = roleObj.role_id;

  const query = `DELETE FROM user_role WHERE user_id = ${userId} AND role_id = ${roleId}`;
  await pool
    .query(query)
    .then((res) => {
      console.log("Role successfully deleted!", res.rows);
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

module.exports = {
  getRoleId,
  updateUserRole,
  deleteUserRole,
  checkUserRole,
  getUserRolesById,
  addUserRole,
};

query();
