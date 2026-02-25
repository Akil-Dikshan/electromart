import dotenv from 'dotenv';
import connectDB from '../config/db.js';
import Product from '../models/Product.js';

dotenv.config();
connectDB();

const products = [
  {
    name: 'iPhone 15 Pro',
    description: 'The most powerful iPhone ever with A17 Pro chip, titanium design, and a 48MP camera system.',
    price: 999,
    originalPrice: 1099,
    category: 'smartphones',
    brand: 'Apple',
    images: [{ url: 'https://placehold.co/600x400?text=iPhone+15+Pro', alt: 'iPhone 15 Pro' }],
    stock: 50,
    ratings: { average: 4.8, count: 230 },
    specifications: new Map([['Storage', '256GB'], ['RAM', '8GB'], ['Display', '6.1 inch OLED']]),
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Ultimate Android experience with built-in S Pen, 200MP camera, and Snapdragon 8 Gen 3.',
    price: 1199,
    originalPrice: 1299,
    category: 'smartphones',
    brand: 'Samsung',
    images: [{ url: 'https://placehold.co/600x400?text=Galaxy+S24+Ultra', alt: 'Samsung Galaxy S24 Ultra' }],
    stock: 35,
    ratings: { average: 4.7, count: 185 },
    specifications: new Map([['Storage', '512GB'], ['RAM', '12GB'], ['Display', '6.8 inch AMOLED']]),
    isFeatured: true,
    isActive: true
  },
  {
    name: 'MacBook Pro 14"',
    description: 'Supercharged by M3 Pro chip for incredible performance and all-day battery life.',
    price: 1999,
    originalPrice: 2199,
    category: 'laptops',
    brand: 'Apple',
    images: [{ url: 'https://placehold.co/600x400?text=MacBook+Pro+14', alt: 'MacBook Pro 14' }],
    stock: 20,
    ratings: { average: 4.9, count: 312 },
    specifications: new Map([['Chip', 'M3 Pro'], ['RAM', '18GB'], ['Storage', '512GB SSD']]),
    isFeatured: true,
    isActive: true
  },
  {
    name: 'Sony WH-1000XM5',
    description: 'Industry-leading noise canceling headphones with exceptional sound quality.',
    price: 349,
    originalPrice: 399,
    category: 'audio',
    brand: 'Sony',
    images: [{ url: 'https://placehold.co/600x400?text=Sony+WH1000XM5', alt: 'Sony WH-1000XM5' }],
    stock: 75,
    ratings: { average: 4.8, count: 520 },
    specifications: new Map([['Battery', '30 hours'], ['Connectivity', 'Bluetooth 5.2'], ['Weight', '250g']]),
    isFeatured: true,
    isActive: true
  },
  {
    name: 'iPad Pro 12.9"',
    description: 'The ultimate iPad experience with M2 chip and Liquid Retina XDR display.',
    price: 1099,
    category: 'tablets',
    brand: 'Apple',
    images: [{ url: 'https://placehold.co/600x400?text=iPad+Pro', alt: 'iPad Pro 12.9' }],
    stock: 30,
    ratings: { average: 4.7, count: 198 },
    specifications: new Map([['Chip', 'M2'], ['Storage', '256GB'], ['Display', '12.9 inch Liquid Retina XDR']]),
    isFeatured: false,
    isActive: true
  },
  {
    name: 'Dell XPS 15',
    description: 'Premium Windows laptop with OLED display, Intel Core i7 and NVIDIA RTX graphics.',
    price: 1799,
    category: 'laptops',
    brand: 'Dell',
    images: [{ url: 'https://placehold.co/600x400?text=Dell+XPS+15', alt: 'Dell XPS 15' }],
    stock: 15,
    ratings: { average: 4.5, count: 143 },
    specifications: new Map([['CPU', 'Intel Core i7-13700H'], ['RAM', '16GB'], ['Storage', '512GB SSD']]),
    isFeatured: false,
    isActive: true
  },
  {
    name: 'PS5 DualSense Controller',
    description: 'Experience haptic feedback and adaptive triggers for immersive gaming.',
    price: 69,
    category: 'gaming',
    brand: 'Sony',
    images: [{ url: 'https://placehold.co/600x400?text=DualSense+Controller', alt: 'PS5 DualSense' }],
    stock: 100,
    ratings: { average: 4.6, count: 890 },
    specifications: new Map([['Connectivity', 'USB-C / Bluetooth'], ['Battery', '12 hours'], ['Compatibility', 'PS5 / PC']]),
    isFeatured: false,
    isActive: true
  },
  {
    name: 'Samsung 65" 4K QLED TV',
    description: 'Stunning 4K QLED display with quantum dot technology and smart TV features.',
    price: 1299,
    originalPrice: 1499,
    category: 'televisions',
    brand: 'Samsung',
    images: [{ url: 'https://placehold.co/600x400?text=Samsung+QLED+TV', alt: 'Samsung 65 QLED' }],
    stock: 12,
    ratings: { average: 4.6, count: 267 },
    specifications: new Map([['Resolution', '4K UHD'], ['HDR', 'Quantum HDR'], ['Smart TV', 'Tizen OS']]),
    isFeatured: true,
    isActive: true
  }
];

const seedDB = async () => {
    try {
//deletes ALL products from the database. The empty {} means "no filter — delete everything." We do this first so we don't get duplicate products every time we seed.
    await Product.deleteMany({});
    console.log('Old products cleared');
//inserts all 8 products from our array in one single database operation. Much faster than inserting them one by one.
    await Product.insertMany(products);
    console.log(`${products.length} products seeded successfully `);
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedDB();