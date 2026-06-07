const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const bcrypt = require('bcryptjs');

dotenv.config();

const sampleProducts = [
  {
    name: 'Rose Lace Dress',
    category: 'Dresses',
    price: 89.99,
    stock: 12,
    rating: 4,
    images: ['https://images.unsplash.com/photo-1495121605193-b116b5b9c2b2?auto=format&fit=crop&w=800&q=80'],
    description: 'A romantic rose lace dress perfect for evenings and special events.'
  },
  {
    name: 'Casual White Shirt',
    category: 'Shirts',
    price: 39.99,
    stock: 24,
    rating: 5,
    images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80'],
    description: 'A crisp white shirt designed for everyday style and comfort.'
  },
  {
    name: 'Denim Blue Jeans',
    category: 'Jeans',
    price: 69.99,
    stock: 18,
    rating: 4,
    images: ['https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80'],
    description: 'Stretch denim jeans with a flattering slim fit.'
  },
  {
    name: 'Ocean Swimwear Set',
    category: 'Swimwear',
    price: 49.99,
    stock: 14,
    rating: 4,
    images: ['https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80'],
    description: 'A comfortable swim set for pool days with vibrant colors.'
  },
  {
    name: 'Urban Sportswear Hoodie',
    category: 'Sportswear',
    price: 59.99,
    stock: 20,
    rating: 5,
    images: ['https://images.unsplash.com/photo-1520975912344-bf9c0a0f8e54?auto=format&fit=crop&w=800&q=80'],
    description: 'A lightweight hoodie crafted for active days and casual style.'
  },
  {
    name: 'Sleek Running Shoes',
    category: 'Shoes',
    price: 79.99,
    stock: 16,
    rating: 4,
    images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'],
    description: 'Modern sneakers built for support and daily wear.'
  }
];

const seed = async () => {
  await connectDB();
  await Order.deleteMany();
  await Product.deleteMany();
  await User.deleteMany();

  const adminPassword = await bcrypt.hash('Admin@2024', 10);
  await User.create({ name: 'Admin User', email: 'admin@shop.com', password: adminPassword, role: 'admin' });
  await Product.insertMany(sampleProducts);
  await Order.create({
    customerName: 'Jane Doe',
    customerEmail: 'jane@example.com',
    items: [{ productId: null, name: 'Rose Lace Dress', quantity: 1, price: 89.99 }],
    total: 89.99,
    status: 'Delivered',
    statusHistory: [{ status: 'Processing', date: new Date() }, { status: 'Delivered', date: new Date() }],
    trackingId: 'PX-1001'
  });

  console.log('Seed data created');
  process.exit();
};

seed();
