const mongoose = require('mongoose');




const orderSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: Number,
            price: Number
        }
    ],
    address: {
        fullName: String,
        phone: String,
        addressLine: String,
        city: String,
        state: String,
        pincode: String
    },

    totalAmount: Number,
    paymentMethod: {
        type: String,
        // enum: ['COD', 'Online'],
        default: 'COD'
    },
    status: {
      type: String,
      default: "Placed",
    },
}, { timestamps: true });


const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;



