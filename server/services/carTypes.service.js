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

module.exports = {
    getAllCarTypes
};

query();
