const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', protect, async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

router.post('/', protect, async (req, res) => {
  const { customerName, customerEmail, items, total } = req.body;
  const order = await Order.create({
    customerName,
    customerEmail,
    items,
    total,
    status: 'Processing',
    statusHistory: [{ status: 'Processing', date: new Date() }],
    trackingId: `PX-${Date.now()}`
  });

  await Promise.all(
    items.map(async (item) => {
      await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
    })
  );

  res.status(201).json(order);
});

module.exports = router;
