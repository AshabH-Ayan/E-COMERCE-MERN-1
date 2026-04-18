const express = require('express');
const {placeOrder} = require('../controllers/order.controller');

const router = express.Router();


router.post('/place', placeOrder);


module.exports = router;