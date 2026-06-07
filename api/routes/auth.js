const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/auth');
const router = express.Router();

const createToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: 'Email already registered' });
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed });
    const token = createToken(user._id);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' }).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Invalid credentials' });
    const token = createToken(user._id);
    res.cookie('token', token, { httpOnly: true, sameSite: 'lax' }).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/profile', protect, async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
  res.json(req.user);
});

router.put('/profile', protect, async (req, res) => {
  const { name, email } = req.body;
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const existing = await User.findOne({ email });
    if (existing && existing._id.toString() !== req.user._id.toString()) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    req.user.name = name || req.user.name;
    req.user.email = email || req.user.email;
    await req.user.save();
    res.json({ id: req.user._id, name: req.user.name, email: req.user.email, role: req.user.role });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/logout', (req, res) => {
  res.cookie('token', '', { httpOnly: true, sameSite: 'lax', expires: new Date(0) }).json({ message: 'Logged out' });
});

module.exports = router;
