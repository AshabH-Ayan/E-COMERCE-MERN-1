const express = require('express');

const { addToCart, removeItem, updateQuantity, getCart } = require('../controllers/cart.controller');



const router = express.Router();


router.post('/add', addToCart);
router.post('/update', updateQuantity);
router.post('/remove', removeItem);
router.get('/:userId', getCart);


module.exports = router;