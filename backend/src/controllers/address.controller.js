const AddressModel = require('../models/address.model');


// Save a address
const saveAddress = async (req, res) => {
    try {
        const address = await AddressModel.create(req.body)
        res.json({ message: 'Address saved successfully', address });


    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

// Get all addresses by user ID

const getAddresses = async (req, res) => {
    try {
        const addresses = await AddressModel.find({ 
            userId: req.params.userId
         });
        res.json({ addresses });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching address', error });
    }
}



module.exports = { saveAddress, getAddresses }; 