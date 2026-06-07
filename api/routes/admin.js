const express = require('express');
const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/stats', protect, authorize('admin'), async (req, res) => {
  const orders = await Order.find();
  const users = await User.find();
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  res.json({ revenue, ordersCount: orders.length, usersCount: users.length });
});

router.get('/users', protect, authorize('admin'), async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
});

router.get('/orders', protect, authorize('admin'), async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.get('/products', protect, authorize('admin'), async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

module.exports = router;
