const ApiError = require("../error/apiError");
const orderService = require("../services/order.service");
const tokenService = require("../services/token.service");

class OrderControllers {
  async getOrders(req, res) {
    let { limit, page } = req.query;
    let { userId, userRole } = req.body;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;

    let orders = [];
    orders = await orderService.getOrders(limit, offset, userId, userRole);

    res.json(orders);
  }

  async getOrderById(req, res) {
    let orderId = req.params.id;
    let order = await orderService.getOrderById(orderId);
    res.json(order);
  }

  async createOrder(req, res) {
    //сделать после создания заказа кнопку отправки неактивной!!!
    let userId = tokenService.getUserIdFromToken(req);
    res.json(await orderService.createOrder(userId, req.body));
  }

  async deleteOrderById(req, res) {
    let orderId = req.params.id;
    res.json(await orderService.deleteOrderById(orderId));
  }

  async updateOrderByDispatcher(req, res) {
    let orderId = req.params.id;
    res.json(await orderService.updateOrderByDispatcher(orderId, req.body));
  }

  async updateOrderByDriver(req, res) {
    let orderId = req.params.id;
    res.json(await orderService.updateOrderByDriver(orderId, req.body));
  }

  async gradeOrderByClient(req, res) {
    let orderId = req.params.id;
    res.json(await orderService.gradeOrderByClient(orderId, req.body));
  }

  async gradeOrderByDriver(req, res) {
    let orderId = req.params.id;
    res.json(await orderService.gradeOrderByDriver(orderId, req.body));
  }
}

module.exports = new OrderControllers();
