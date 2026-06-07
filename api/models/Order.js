const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  total: { type: Number, required: true },
  status: { type: String, default: 'Processing' },
  statusHistory: [
    {
      status: String,
      date: Date
    }
  ],
  trackingId: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
