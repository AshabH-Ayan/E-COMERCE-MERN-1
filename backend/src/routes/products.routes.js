const { createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product.controller');

const express = require('express');

const router = express.Router();



router.post('/add', createProduct);
router.get('/', getProducts);
router.put('/update/:id', updateProduct);
router.delete('/delete/:id', deleteProduct);


module.exports = router;