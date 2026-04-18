const { saveAddress, getAddresses } = require('../controllers/address.controller');



const express = require('express');

const router = express.Router();


router.post('/add', saveAddress)
router.get('/:userId', getAddresses)



module.exports = router;



