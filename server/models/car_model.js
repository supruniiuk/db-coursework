const pool = require("../database");

const query = async () => {
  await pool.connect();
};

const getCars = async () => {
  const cars = `SELECT * FROM cars`;
  let car_table = [];
  await pool
    .query(cars)
    .then((res) => {
      car_table = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return car_table;
};

const getCarById = async (id) => {
  const carQuery = `SELECT * FROM cars WHERE car_id=${id}`;
  let car = "";
  await pool
    .query(carQuery)
    .then((res) => {
      car = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return car;
};

const deleteCarById = async (id) => {
  const deleteCarQuery = `CALL delete_car(${id});`;
  await pool
    .query(deleteCarQuery)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

const createCar = async (body) => {
  let {
    driver_id,
    model,
    color,
    type_id,
    air_conditioning,
    terminal,
    empty_trunk,
    animals,
  } = body;
  const newCarQuery = `CALL create_car(null, ${driver_id}, '${model}', '${color}', ${type_id}, ${air_conditioning}, ${terminal}, ${empty_trunk}, ${animals});`;
  console.log(newCarQuery);
  let carId = null;
  await pool
    .query(newCarQuery)
    .then((res) => {
      carId = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return carId;
};

const updateCar = async (body) => {
  let {
    car_id,
    driver_id,
    model,
    color,
    type_id,
    air_conditioning,
    terminal,
    empty_trunk,
    animals,
  } = body;
  const changeCarQuery = `CALL update_car(${car_id}, ${driver_id}, '${model}', '${color}', ${type_id}, ${air_conditioning}, ${terminal}, ${empty_trunk}, ${animals});`;
  console.log(changeCarQuery);
  await pool
    .query(changeCarQuery)
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getCars,
  createCar,
  getCarById,
  deleteCarById,
  updateCar,
};

query();
