const pool = require("../database");
const service = require("./service");

const query = async () => {
  await pool.connect();
};

const getOrders = async (limit_num, offset_num) => {
  const orders = `SELECT * FROM orders LIMIT ${limit_num} OFFSET ${offset_num}`;
  let pages = await service.getPages("orders");

  let order_table = [];
  await pool
    .query(orders)
    .then((res) => {
      order_table = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return { pages, order_table };
};

const getOrdersByUserRole = async (limit_num, offset_num, user_id) => {

}

const getOrderById = async (id) => {
  const orderQuery = `SELECT * FROM orders WHERE order_id=${id}`;
  let order = "";
  await pool
    .query(orderQuery)
    .then((res) => {
      order = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return order[0];
};

const createOrder = async (body) => {
  // types: comfort, standart, universalis, minibus, freight

  let {
    client_id,
    origin_address,
    destination_address,
    number_of_people,
    empty_trunk,
    animals,
    terminal,
    air_condition,
    order_type_id,
  } = body;

  const newOrderQuery = `CALL create_order(${client_id}, '${origin_address}', '${destination_address}', ${number_of_people}, ${empty_trunk}, ${animals}, ${terminal}, ${air_condition}, ${order_type_id});`;
  console.log(newOrderQuery);
  await pool
    .query(newOrderQuery)
    .then((res) => {
      console.log("Order created successfuly!");
    })
    .catch((err) => {
      console.log(err);
    });

  return;
};

const deleteOrderById = async (id) => {
  const deleteOrderQuery = `CALL delete_order(${id});`;
  await pool
    .query(deleteOrderQuery)
    .then((res) => {
      console.log("Order successfully deleted!");
    })
    .catch((err) => {
      console.log("ERROR", err);
    });
};
const updateOrderByClient = async (order_id, body) => {
  let { client_comment, client_grade } = body;

  const query = `CALL update_order_client(${order_id}, '${client_comment}', ${client_grade});`;
  await pool
    .query(query)
    .then((res) => {
      console.log("Order is successfully updated by client");
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateOrderByDispatcher = async (order_id, body) => {
  // types: interrupted, executing, completed
  let { dispatcher_id, is_approved, order_status, payment } = body;

  const query = `CALL update_order_dispatcher(${order_id}, ${dispatcher_id}, ${is_approved}, ${order_status}, ${payment});`;
  await pool
    .query(query)
    .then((res) => {
      console.log("Order is successfully updated by dispatcher");
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateOrderByDriver = async (order_id, body) => {
  // types: interrupted, executing, completed
  let { driver_id, waiting_time, order_status } = body;

  const query = `CALL update_order_driver(${order_id}, ${driver_id}, '${waiting_time}', ${order_status});`;

  await pool
    .query(query)
    .then((res) => {
      console.log("Order is successfully updated by driver");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getOrders,
  getOrdersByUserRole,
  createOrder,
  deleteOrderById,
  getOrderById,
  updateOrderByDispatcher,
  updateOrderByDriver,
  updateOrderByClient
};

query();
