'use strict';
module.exports = function(app) {
  var orders = require('../controllers/ordersController');

  // todoList Routes
  app.route('/tasks')
    .get(orders.getAllOrders)
    .post(orders.createOrder);


  app.route('/tasks/:taskId')
    .get(orders.read_a_task)
    .put(orders.update_a_task)
    .delete(orders.delete_a_task);
};
