const ApiError = require("../error/apiError");
const order_model = require("../models/order_model");
const service = require("../models/service");

class OrderControllers {
  async getOrders(req, res) {
    let { limit, page, user_id } = req.query;
    page = page || 1;
    limit = limit || 10;
    let offset = page * limit - limit;

    let orders = [];
    if (user_id) {
      orders = await order_model.getOrders(limit, offset);
    } else {
      let userInfo = service.getUserRoleFromToken(req);
      console.log("INFO", userInfo);
      //orders = await order_model.getOrdersByUserRole(limit, offset, user_id);
    }
    res.json(orders);
  }

  async getOrderById(req, res) {
    let orderId = req.params.id;
    let order = await order_model.getOrderById(orderId);
    res.json(order);
  }

  async createOrder(req, res) {
    //сделать после создания заказа кнопку отправки неактивной!!!
    res.json(await order_model.createOrder(req.body));
  }

  async deleteOrderById(req, res) {
    let orderId = req.params.id;
    res.json(await order_model.deleteOrderById(orderId));
  }

  async updateOrderByClient(req, res) {
    let orderId = req.params.id;
    res.json(await order_model.updateOrderByClient(orderId, req.body));
  }

  async updateOrderByDispatcher(req, res) {
    let orderId = req.params.id;
    res.json(await order_model.updateOrderByDispatcher(orderId, req.body));
  }

  async updateOrderByDriver(req, res) {
    let orderId = req.params.id;
    res.json(await order_model.updateOrderByDriver(orderId, req.body));
  }
}

module.exports = new OrderControllers();
