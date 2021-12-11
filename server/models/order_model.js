const pool = require("../database");
const service = require("./service");
const role_model = require("./role_model");

const query = async () => {
  await pool.connect();
};

const getOrders = async (limit_num, offset_num, userId, userRole) => {
  let orders = [];
  if (userRole === "admin" || userRole === "dispatcher") {
    orders = `SELECT * FROM orders LIMIT ${limit_num} OFFSET ${offset_num}`;
  } else if (userRole === "driver") {
    orders = `SELECT * FROM orders WHERE driver_id=${userId} LIMIT ${limit_num} OFFSET ${offset_num}`;
  } else if (userRole === "client") {
    orders = `SELECT * FROM orders WHERE client_id=${userId} LIMIT ${limit_num} OFFSET ${offset_num}`;
  }

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

const createOrder = async (client_id, body) => {
  // types: comfort, standart, universalis, minibus, freight

  let {
    origin_address,
    destination_address,
    number_of_people,
    empty_trunk,
    animals,
    terminal,
    air_condition,
    car_type_id,
  } = body;

  const newOrderQuery = `CALL create_order(${client_id}, '${origin_address}', '${destination_address}', ${number_of_people}, ${empty_trunk}, ${animals}, ${terminal}, ${air_condition}, ${car_type_id});`;
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

const gradeOrderByClient = async (order_id, body) => {
  let { client_comment, client_grade } = body;

  const query = `CALL grade_order_client(${order_id}, '${client_comment}', ${client_grade});`;
  await pool
    .query(query)
    .then((res) => {
      console.log("Order is successfully updated by client");
    })
    .catch((err) => {
      console.log(err);
    });
};

const gradeOrderByDriver = async (order_id, body) => {
  let { driver_comment, driver_grade } = body;

  const query = `CALL grade_order_driver(${order_id}, '${driver_comment}', ${driver_grade});`;
  await pool
    .query(query)
    .then((res) => {
      console.log("Order is successfully updated by driver");
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateOrderByDispatcher = async (order_id, body) => {
  // types: interrupted, executing, completed
  let { dispatcher_id, is_approved, payment } = body;

  const query = `CALL update_order_dispatcher(${order_id}, ${dispatcher_id}, ${is_approved}, ${payment});`;
  console.log(query);

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

  const query = `CALL take_order_driver(${order_id}, ${driver_id}, '${waiting_time}', ${order_status});`;

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
  createOrder,
  deleteOrderById,
  getOrderById,
  updateOrderByDispatcher,
  updateOrderByDriver,
  gradeOrderByClient,
  gradeOrderByDriver,
};

query();
