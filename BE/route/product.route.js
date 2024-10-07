import express from 'express'
import { createProducts, deleteProducts, getProducts,updateProducts } from '../controllers/product.controller.js';

const router = express.Router();
router.put('/:id', updateProducts);

router.get('/',getProducts)
// POST route to create a new product
router.post("/", createProducts);
router.delete('/:id', deleteProducts);


export default router;