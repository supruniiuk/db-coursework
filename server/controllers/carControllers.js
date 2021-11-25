const ApiError = require("../error/apiError");
const car_model = require("../models/car_model");

class CarControllers {
  async getCars(req, res) {
    let cars = await car_model.getCars();
    res.json(cars);
  }

  async getCarById(req, res) {
    let carId = req.params.id;
    let car = await car_model.getCarById(carId);
    res.json(car);
  }

  async deleteCarById(req, res) {
    let carId = req.params.id;
    res.json(await car_model.deleteCarById(carId));
  }

  async createCar(req, res) {
    let carId = await car_model.createCar(req.body);
    res.json(carId);
  }

  async updateCar(req, res) {
    res.json(await car_model.updateCar(req.body));
  }
}

module.exports = new CarControllers();
