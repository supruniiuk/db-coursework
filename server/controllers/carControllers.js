const ApiError = require("../error/apiError");
const carService = require("../services/car.service");
const carTypesService = require("../services/carTypes.service");
const tokenService = require("../services/token.service");

class CarControllers {
  async getCars(req, res) {
    let { limit, page, userId } = req.query;
    page = page || 1;
    limit = limit || 10;
    const offset = page * limit - limit;

    const cars = await carService.getCars(limit, offset, userId);
    res.json(cars);
  }

  async getAllCarTypes(req, res) {
    const types = await carTypesService.getAllCarTypes();
    res.json(types);
  }

  async getCarTypeById(req, res) {
    const typeId = req.params.id;
    const type = await carTypesService.getCarTypeById(typeId);
    res.json(type);
  }

  async getCarById(req, res) {
    const carId = req.params.id;
    const car = await carService.getCarById(carId);
    res.json(car);
  }

  async deleteCarById(req, res) {
    const carId = req.params.id;
    res.json(await carService.deleteCarById(carId));
  }

  async createCar(req, res) {
    const userId = tokenService.getUserIdFromToken(req);
    const carId = await carService.createCar(req.body, userId);
    res.json(carId);
  }

  async updateCar(req, res) {
    res.json(await carService.updateCar(req.body));
  }
}

module.exports = new CarControllers();
