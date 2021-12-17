const ApiError = require("../error/apiError");
const carService = require("../services/car.service");
const carTypesService = require("../services/carTypes.service");

class CarControllers {
  async getCars(req, res) {
    let { limit, page } = req.query;
    console.log(limit, page);
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;

    let cars = await carService.getCars(limit, offset);
    res.json(cars);
  }

  async getAllCarTypes(req, res) {
    let types = await carTypesService.getAllCarTypes();
    res.json(types);
  }

  async getCarTypeById(req, res) {
    let typeId = req.params.id;
    let type = await carTypesService.getCarTypeById(typeId);
    res.json(type);
  }

  async getCarById(req, res) {
    let carId = req.params.id;
    let car = await carService.getCarById(carId);
    res.json(car);
  }

  async deleteCarById(req, res) {
    let carId = req.params.id;
    res.json(await carService.deleteCarById(carId));
  }

  async createCar(req, res) {
    let carId = await carService.createCar(req.body);
    res.json(carId);
  }

  async updateCar(req, res) {
    res.json(await carService.updateCar(req.body));
  }
}

module.exports = new CarControllers();
