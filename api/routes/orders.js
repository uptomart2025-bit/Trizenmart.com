const express = require('express');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect } = require('../middleware/auth');
const router = express.Router();

// GET: Fetch Orders (Mobile & Role optimized)
router.get('/', protect, async (req, res) => {
  try {
    // Admins see everything; customers see only their transaction history
    const filter = req.user.role === 'admin' ? {} : { customerEmail: req.user.email };
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Place New E-commerce Order (With Inventory Control)
router.post('/', protect, async (req, res) => {
  const { customerName, customerEmail, items, total } = req.body;
  try {
    const order = await Order.create({
      customerName,
      customerEmail,
      items,
      total,
      status: 'Processing',
      statusHistory: [{ status: 'Processing', date: new Date() }],
      trackingId: `PX-${Date.now()}`
    });

    // Clean inventory stock decrement loop
    await Promise.all(
      items.map(async (item) => {
        await Product.findByIdAndUpdate(item.productId, { $inc: { stock: -item.quantity } });
      })
    );

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;