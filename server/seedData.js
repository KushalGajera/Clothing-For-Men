const mongoose = require('mongoose');
const Product = require('./models/Product');
require('dotenv').config();

const sampleProducts = [
  {
    name: 'Premium Cotton T-Shirt',
    description: 'Soft, comfortable cotton t-shirt perfect for everyday wear. Made from 100% organic cotton with a modern fit.',
    price: 29.99,
    originalPrice: 39.99,
    brand: 'StyleForge',
    category: 'shirts',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
      'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500'
    ],
    sizes: [
      { size: 'S', stock: 15 },
      { size: 'M', stock: 20 },
      { size: 'L', stock: 18 },
      { size: 'XL', stock: 12 }
    ],
    colors: [
      { color: 'Black', colorCode: '#000000', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'] },
      { color: 'White', colorCode: '#FFFFFF', images: ['https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=500'] },
      { color: 'Navy', colorCode: '#001f3f', images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500'] }
    ],
    tags: ['cotton', 'casual', 'everyday'],
    isFeatured: true,
    isActive: true,
    rating: 4.5,
    reviewCount: 127
  },
  {
    name: 'Slim Fit Chinos',
    description: 'Modern slim-fit chinos crafted from premium cotton blend. Perfect for both casual and semi-formal occasions.',
    price: 79.99,
    originalPrice: 99.99,
    brand: 'StyleForge',
    category: 'pants',
    images: [
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500'
    ],
    sizes: [
      { size: '30', stock: 8 },
      { size: '32', stock: 15 },
      { size: '34', stock: 12 },
      { size: '36', stock: 10 },
      { size: '38', stock: 6 }
    ],
    colors: [
      { color: 'Khaki', colorCode: '#C3B091', images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500'] },
      { color: 'Navy', colorCode: '#001f3f', images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500'] },
      { color: 'Olive', colorCode: '#3D9970', images: ['https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500'] }
    ],
    tags: ['chinos', 'slim-fit', 'versatile'],
    isFeatured: true,
    isActive: true,
    rating: 4.3,
    reviewCount: 89
  },
  {
    name: 'Classic Denim Jacket',
    description: 'Timeless denim jacket with a modern twist. Features premium denim construction and classic styling.',
    price: 129.99,
    originalPrice: 159.99,
    brand: 'StyleForge',
    category: 'jackets',
    images: [
      'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500'
    ],
    sizes: [
      { size: 'S', stock: 5 },
      { size: 'M', stock: 8 },
      { size: 'L', stock: 10 },
      { size: 'XL', stock: 7 }
    ],
    colors: [
      { color: 'Classic Blue', colorCode: '#4169E1', images: ['https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500'] },
      { color: 'Dark Wash', colorCode: '#2F4F4F', images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500'] }
    ],
    tags: ['denim', 'classic', 'outerwear'],
    isFeatured: true,
    isActive: true,
    rating: 4.7,
    reviewCount: 156
  },
  {
    name: 'Leather Sneakers',
    description: 'Premium leather sneakers combining comfort and style. Perfect for casual and smart-casual looks.',
    price: 149.99,
    originalPrice: 179.99,
    brand: 'StyleForge',
    category: 'shoes',
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500',
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500'
    ],
    sizes: [
      { size: '8', stock: 6 },
      { size: '9', stock: 10 },
      { size: '10', stock: 12 },
      { size: '11', stock: 8 },
      { size: '12', stock: 4 }
    ],
    colors: [
      { color: 'White', colorCode: '#FFFFFF', images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'] },
      { color: 'Black', colorCode: '#000000', images: ['https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=500'] },
      { color: 'Brown', colorCode: '#8B4513', images: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500'] }
    ],
    tags: ['leather', 'sneakers', 'comfortable'],
    isFeatured: true,
    isActive: true,
    rating: 4.6,
    reviewCount: 203
  },
  {
    name: 'Oxford Button-Down Shirt',
    description: 'Classic oxford button-down shirt in premium cotton. Essential for any modern wardrobe.',
    price: 59.99,
    originalPrice: 79.99,
    brand: 'StyleForge',
    category: 'shirts',
    images: [
      'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500',
      'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500'
    ],
    sizes: [
      { size: 'S', stock: 12 },
      { size: 'M', stock: 18 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 9 }
    ],
    colors: [
      { color: 'White', colorCode: '#FFFFFF', images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500'] },
      { color: 'Light Blue', colorCode: '#ADD8E6', images: ['https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500'] },
      { color: 'Pink', colorCode: '#FFC0CB', images: ['https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500'] }
    ],
    tags: ['oxford', 'button-down', 'formal'],
    isFeatured: true,
    isActive: true,
    rating: 4.4,
    reviewCount: 94
  },
  {
    name: 'Wool Blend Sweater',
    description: 'Cozy wool blend sweater perfect for cooler weather. Soft, warm, and stylish.',
    price: 89.99,
    originalPrice: 119.99,
    brand: 'StyleForge',
    category: 'shirts',
    images: [
      'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500'
    ],
    sizes: [
      { size: 'S', stock: 8 },
      { size: 'M', stock: 14 },
      { size: 'L', stock: 11 },
      { size: 'XL', stock: 7 }
    ],
    colors: [
      { color: 'Charcoal', colorCode: '#36454F', images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500'] },
      { color: 'Navy', colorCode: '#001f3f', images: ['https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=500'] },
      { color: 'Burgundy', colorCode: '#800020', images: ['https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500'] }
    ],
    tags: ['wool', 'sweater', 'warm'],
    isFeatured: true,
    isActive: true,
    rating: 4.5,
    reviewCount: 76
  },
  {
    name: 'Leather Belt',
    description: 'Premium leather belt with classic buckle. Essential accessory for any outfit.',
    price: 39.99,
    originalPrice: 49.99,
    brand: 'StyleForge',
    category: 'accessories',
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
      'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500'
    ],
    sizes: [
      { size: '32', stock: 10 },
      { size: '34', stock: 15 },
      { size: '36', stock: 12 },
      { size: '38', stock: 8 }
    ],
    colors: [
      { color: 'Black', colorCode: '#000000', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'] },
      { color: 'Brown', colorCode: '#8B4513', images: ['https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=500'] },
      { color: 'Tan', colorCode: '#D2B48C', images: ['https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500'] }
    ],
    tags: ['leather', 'belt', 'accessory'],
    isFeatured: true,
    isActive: true,
    rating: 4.2,
    reviewCount: 45
  },
  {
    name: 'Running Shoes',
    description: 'High-performance running shoes with advanced cushioning and support.',
    price: 119.99,
    originalPrice: 149.99,
    brand: 'StyleForge',
    category: 'shoes',
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500'
    ],
    sizes: [
      { size: '8', stock: 8 },
      { size: '9', stock: 12 },
      { size: '10', stock: 15 },
      { size: '11', stock: 10 },
      { size: '12', stock: 6 }
    ],
    colors: [
      { color: 'Black/White', colorCode: '#000000', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'] },
      { color: 'Navy/Orange', colorCode: '#001f3f', images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500'] },
      { color: 'Gray/Blue', colorCode: '#808080', images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500'] }
    ],
    tags: ['running', 'athletic', 'performance'],
    isFeatured: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 312
  },
  {
    name: 'T-Shirt For Men',
    description: 'Cork Plain Full Sleeves Regular Fit T-shirt.',
    price: 89.99,
    originalPrice: 100.00,
    brand: 'StyleForge',
    category: 'shirts',
    images: [
      'https://veirdo.in/cdn/shop/files/2_8.jpg?v=1731305264',
      'https://assets.ajio.com/medias/sys_master/root/20250203/lpeu/67a0f0b0bc78b543a9192d5b/genzy_teal_men_regular_fit_round-neck_t-shirt.jpg'
    ],
    sizes: [
      { size: 'S', stock: 8 },
      { size: 'M', stock: 12 },
      { size: 'L', stock: 15 },
      { size: 'XL', stock: 10 }
    ],
    colors: [
      { color: 'Green', colorCode: '#008000', images: ['https://assets.ajio.com/medias/sys_master/root/20250203/lpeu/67a0f0b0bc78b543a9192d5b/genzy_teal_men_regular_fit_round-neck_t-shirt.jpg'] },
      { color: 'Brown', colorCode: '#964B00', images: ['https://veirdo.in/cdn/shop/files/2_8.jpg?v=1731305264'] },
      { color: 'Blue', colorCode: '#0000FF', images: ['https://assets.ajio.com/medias/sys_master/root/20221009/Yblz/6342869cf997ddfdbd135d88/-1117Wx1400H-465087088-blue-MODEL4.jpg'] }
    ],
    tags: ['running', 'athletic', 'performance'],
    isFeatured: true,
    isActive: true,
    rating: 4.8,
    reviewCount: 312
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('Cleared existing products');

    // Insert sample products
    const products = await Product.insertMany(sampleProducts);
    console.log(`Inserted ${products.length} sample products`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();

