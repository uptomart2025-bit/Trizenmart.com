const mockProducts = [
  {
    _id: '1',
    name: 'Rose Lace Dress',
    category: 'Dresses',
    price: 89.99,
    images: ['https://images.unsplash.com/photo-1495121605193-b116b5b9c2b2?auto=format&fit=crop&w=800&q=80'],
    rating: 4,
    stock: 12,
    description: 'A romantic rose lace dress perfect for evenings and special events.',
    reviews: [
      { user: 'Maria', rating: 5, comment: 'Beautiful fit and soft fabric.' },
      { user: 'Anna', rating: 4, comment: 'Lovely color and comfortable.' }
    ]
  },
  {
    _id: '2',
    name: 'Casual White Shirt',
    category: 'Shirts',
    price: 39.99,
    images: ['https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80'],
    rating: 5,
    stock: 24,
    description: 'A crisp white shirt designed for everyday style and comfort.',
    reviews: [{ user: 'Noah', rating: 5, comment: 'Classic and polished.' }]
  },
  {
    _id: '3',
    name: 'Denim Blue Jeans',
    category: 'Jeans',
    price: 69.99,
    images: ['https://images.unsplash.com/photo-1521334884684-d80222895322?auto=format&fit=crop&w=800&q=80'],
    rating: 4,
    stock: 18,
    description: 'Stretch denim jeans with a flattering slim fit.',
    reviews: [{ user: 'Lily', rating: 4, comment: 'Great stretch and style.' }]
  },
  {
    _id: '4',
    name: 'Ocean Swimwear Set',
    category: 'Swimwear',
    price: 49.99,
    images: ['https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=800&q=80'],
    rating: 4,
    stock: 14,
    description: 'A comfortable swim set for pool days with vibrant colors.',
    reviews: [{ user: 'Mia', rating: 5, comment: 'Fits perfectly and dries fast.' }]
  },
  {
    _id: '5',
    name: 'Urban Sportswear Hoodie',
    category: 'Sportswear',
    price: 59.99,
    images: ['https://images.unsplash.com/photo-1520975912344-bf9c0a0f8e54?auto=format&fit=crop&w=800&q=80'],
    rating: 5,
    stock: 20,
    description: 'A lightweight hoodie crafted for active days and casual style.',
    reviews: [{ user: 'James', rating: 5, comment: 'Very comfortable and warm.' }]
  },
  {
    _id: '6',
    name: 'Sleek Running Shoes',
    category: 'Shoes',
    price: 79.99,
    images: ['https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80'],
    rating: 4,
    stock: 16,
    description: 'Modern sneakers built for support and daily wear.',
    reviews: [{ user: 'Camila', rating: 4, comment: 'Comfortable with a sleek look.' }]
  }
];

const mockUsers = [
  { _id: 'u1', name: 'Admin User', email: 'admin@shop.com', role: 'admin' },
  { _id: 'u2', name: 'Jane Doe', email: 'jane@example.com', role: 'customer' },
  { _id: 'u3', name: 'John Smith', email: 'john@example.com', role: 'customer' }
];

const mockOrders = [
  {
    _id: 'o1',
    customerName: 'Jane Doe',
    status: 'Delivered',
    items: [{ productId: '1', quantity: 1 }],
    total: 89.99,
    createdAt: new Date().toISOString(),
    statusHistory: [{ status: 'Processing', date: new Date().toISOString() }, { status: 'Delivered', date: new Date().toISOString() }]
  },
  {
    _id: 'o2',
    customerName: 'John Smith',
    status: 'Processing',
    items: [{ productId: '5', quantity: 2 }],
    total: 119.98,
    createdAt: new Date().toISOString(),
    statusHistory: [{ status: 'Processing', date: new Date().toISOString() }]
  }
];

export const mockData = {
  products: mockProducts,
  users: mockUsers,
  orders: mockOrders
};
