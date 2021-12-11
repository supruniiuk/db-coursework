const ApiError = require("../error/apiError");
const order_model = require("../models/order_model");
const service = require("../models/service");

class OrderControllers {
  async getOrders(req, res) {
    let { limit, page } = req.query;
    let { userId, userRole } = req.body;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;

    let orders = [];
    orders = await order_model.getOrders(limit, offset, userId, userRole);

    res.json(orders);
  }

  async getOrderById(req, res) {
    let orderId = req.params.id;
    let order = await order_model.getOrderById(orderId);
    res.json(order);
  }

  async createOrder(req, res) {
    //сделать после создания заказа кнопку отправки неактивной!!!
    let userId = service.getUserIdFromToken(req);
    res.json(await order_model.createOrder(userId, req.body));
  }

  async deleteOrderById(req, res) {
    let orderId = req.params.id;
    res.json(await order_model.deleteOrderById(orderId));
  }

  async updateOrderByDispatcher(req, res) {
    let orderId = req.params.id;
    res.json(await order_model.updateOrderByDispatcher(orderId, req.body));
  }

  async updateOrderByDriver(req, res) {
    let orderId = req.params.id;
    res.json(await order_model.updateOrderByDriver(orderId, req.body));
  }

  async gradeOrderByClient(req, res) {
    let orderId = req.params.id;
    res.json(await order_model.gradeOrderByClient(orderId, req.body));
  }

  async gradeOrderByDriver(req, res) {
    let orderId = req.params.id;
    res.json(await order_model.gradeOrderByDriver(orderId, req.body));
  }

}

module.exports = new OrderControllers();
