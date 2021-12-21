const pool = require("../database");
const pageService = require("./page.service");

const query = async () => {
  await pool.connect();
};

const getStatistics = async (userId, userRole) => {
  const queryCount = `SELECT COUNT(*) as total
                 FROM orders WHERE ${userRole}_id=${userId}`;

  let count = null;
  let approved = null;

  await pool
    .query(queryCount)
    .then((res) => {
      count = res.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });

  const queryApproved = `SELECT COUNT(*) as approved
  FROM orders WHERE ${userRole}_id=${userId} AND approved=true;`;

  await pool
    .query(queryApproved)
    .then((res) => {
      approved = res.rows[0];
    })
    .catch((err) => {
      console.log(err);
    });

  return { ...count, ...approved };
};

const getOrders = async (limit_num, offset_num, userId, userRole) => {
  let ordersQuery = `SELECT  orders.*, car_types.type_name ,CONCAT(U1.name,' ', U1.surname)  AS client_name,
  CONCAT(U2.name,' ', U2.surname) AS driver_name,
  CONCAT(U3.name,' ', U3.surname) AS dispatcher_name FROM orders 
  JOIN car_types ON car_types.type_id = orders.car_type_id
  LEFT JOIN users AS U1
       ON orders.client_id = U1.user_id
  LEFT JOIN users AS U2
       ON orders.driver_id = U2.user_id
  LEFT JOIN users AS U3
       ON orders.dispatcher_id = U3.user_id `;

  let count = 0;
  if (userRole === "admin" || userRole === "dispatcher") {
    ordersQuery =
      ordersQuery +
      `ORDER BY creation_date DESC 
                                 LIMIT ${limit_num} OFFSET ${offset_num}`;
    count = await pageService.getCount(`SELECT * FROM orders`);
  } else if (userRole === "driver") {
    ordersQuery =
      ordersQuery +
      `WHERE driver_id IS NULL OR driver_id = ${userId}
                                  ORDER BY creation_date DESC
                                  LIMIT ${limit_num} OFFSET ${offset_num}`;
    count = await pageService.getCount(
      `SELECT *  FROM orders  WHERE  approved=true`
    );
  } else if (userRole === "client") {
    ordersQuery = `SELECT orders.*, car_types.type_name, CONCAT(U1.name,' ', U1.surname)  AS client_name,
                  CONCAT(U2.name,' ', U2.surname) AS driver_name
                  FROM orders 
                  LEFT JOIN users AS U1
                  ON orders.client_id = U1.user_id
                  LEFT JOIN users AS U2
                  ON orders.driver_id = U2.user_id
                  JOIN car_types ON car_types.type_id = orders.car_type_id
                  WHERE client_id=${userId} 
                  ORDER BY creation_date DESC
                  LIMIT ${limit_num} OFFSET ${offset_num}`;

    count = await pageService.getCount(`SELECT *
                    FROM orders  WHERE client_id=${userId}`);
  }

  let orders = [];
  await pool
    .query(ordersQuery)
    .then((res) => {
      orders = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return { count, orders };
};

const getOrderById = async (id) => {
  const orderQuery = `SELECT *, CONCAT(U1.name,' ', U1.surname)  AS client_name,
                      CONCAT(U2.name,' ', U2.surname) AS driver_name,
                      CONCAT(U3.name,' ', U3.surname) AS dispatcher_name 
                      FROM orders 
                      JOIN car_types ON car_types.type_id = orders.car_type_id
                      LEFT JOIN users AS U1
                      ON orders.client_id = U1.user_id
                      LEFT JOIN users AS U2
                      ON orders.driver_id = U2.user_id
                      LEFT JOIN users AS U3
                      ON orders.dispatcher_id = U3.user_id
                      WHERE order_id=${id}`;
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

const getOrderStatuses = async (id) => {
  const query = `SELECT * FROM order_status`;
  let statuses = [];
  await pool
    .query(query)
    .then((res) => {
      statuses = res.rows;
    })
    .catch((err) => {
      console.log(err);
    });

  return statuses;
};

const createOrder = async (client_id, body) => {
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

const updateOrderByDispatcher = async (order_id, dispatcher_id, body) => {
  let { approved, payment } = body;

  const query = `CALL update_order_dispatcher(${order_id}, ${dispatcher_id}, ${approved}, ${payment});`;

  await pool
    .query(query)
    .then((res) => {
      console.log("Order is successfully updated by dispatcher");
    })
    .catch((err) => {
      console.log(err);
    });
};

const updateOrderByDriver = async (order_id, driver_id, body) => {
  let { waiting_time, order_status, car_id } = body;

  const query = `CALL take_order_driver(${order_id}, ${driver_id}, '${waiting_time}', ${order_status}, ${car_id});`;
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
  getOrderStatuses,
  getStatistics,
};

query();
