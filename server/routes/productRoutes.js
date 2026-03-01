import express from 'express';

import { getProducts, createProduct, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protectRoute } from '../middleware/auth.js';
const router = express.Router();

// Public routes — anyone can access
router.get('/', getProducts);
router.get('/:id', getProductById);

// Protected routes — only logged in users
//? protectRoute is added as a second argument before the controller function.This is called middleware chaining
router.post('/', protectRoute,createProduct);
router.put('/:id', protectRoute,updateProduct);
router.delete('/:id', protectRoute,deleteProduct);

export default router;