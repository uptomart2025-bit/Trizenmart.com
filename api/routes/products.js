const express = require('express');
const Product = require('../models/Product');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

router.post('/', protect, authorize('admin', 'seller'), async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

module.exports = router;
