const pool = require("../database");
const pageService = require("./page.service");

const query = async () => {
  await pool.connect();
};

const getCars = async (limit_num, offset_num, userId) => {
  let query = "";
  if (userId) {
    query = `SELECT * FROM cars 
              WHERE driver_id = ${userId}
              LIMIT ${limit_num} OFFSET ${offset_num}`;
  } else {
    query = `SELECT * FROM cars  LIMIT ${limit_num} OFFSET ${offset_num}`;
  }
  let count = await pageService.getCount(query);

  let cars = [];
  await pool
    .query(query)
    .then((res) => {
      cars = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return { count, cars };
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

  return car[0];
};

const deleteAllUserCars = async (user_id) => {
  const deleteAllCarsQuery = `DELETE FROM cars WHERE driver_id = ${user_id};`;
  await pool
    .query(deleteAllCarsQuery)
    .then((res) => {
      console.log("All cars successfully deleted");
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

const deleteCarById = async (id) => {
  const deleteCarQuery = `CALL delete_car(${id});`;
  await pool
    .query(deleteCarQuery)
    .then((res) => {
      console.log("Car successfully deleted");
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};

const createCar = async (body, driver_id) => {
  let {
    license_number,
    model,
    color,
    type_id,
    air_conditioning,
    terminal,
    empty_trunk,
    animals,
  } = body;
  const newCarQuery = `CALL create_car(null, ${driver_id}, '${license_number}', '${model}', '${color}', ${type_id}, ${air_conditioning}, ${terminal}, ${empty_trunk}, ${animals});`;
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
    license_number,
    model,
    color,
    type_id,
    air_conditioning,
    terminal,
    empty_trunk,
    animals,
  } = body;
  const changeCarQuery = `CALL update_car(${car_id}, ${driver_id}, '${license_number}', '${model}', '${color}', ${type_id}, ${air_conditioning}, ${terminal}, ${empty_trunk}, ${animals});`;
  await pool
    .query(changeCarQuery)
    .then((res) => {
      console.log("Car successfully updated");
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
  deleteAllUserCars,
};

query();
