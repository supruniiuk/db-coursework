const pool = require("../database");

const query = async () => {
  await pool.connect();
};

const getAllCarTypes = async () => {
  const carTypes = `SELECT * FROM car_types`;

  let types = [];
  await pool
    .query(carTypes)
    .then((res) => {
      types = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return types;
};

const getCarTypeById = async (id) => {
  const typeQuery = `SELECT * FROM car_types WHERE type_id=${id}`;
  let type = "";
  await pool
    .query(typeQuery)
    .then((res) => {
      type = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return type[0];
};

module.exports = {
  getAllCarTypes,
  getCarTypeById,
};

query();
