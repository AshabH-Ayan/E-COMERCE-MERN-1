const OrderModel = require('../models/order.model');
const CartModel = require('../models/cart.model');
const ProductModel = require('../models/product.model');

const placeOrder = async (req, res) => {
    try {
        const { userId, address } = req.body;

        // 1. Get cart with populated products
        const cart = await CartModel
            .findOne({ userId })
            .populate('items.productId');

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        // 2. ✅ REMOVE INVALID PRODUCTS (VERY IMPORTANT)
        const validItems = cart.items.filter(item => item.productId);

        if (validItems.length === 0) {
            return res.status(400).json({ message: 'All products in cart are invalid' });
        }

        // 3. Prepare order items safely
        const orderItems = validItems.map(item => ({
            productId: item.productId._id,
            quantity: item.quantity,
            price: item.productId.price
        }));

        // 4. Calculate total
        const totalAmount = orderItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );

        // 5. Deduct stock safely
        for (let item of validItems) {
            await ProductModel.findByIdAndUpdate(
                item.productId._id,
                { $inc: { stock: -item.quantity } }
            );
        }

        // 6. Create order
        const order = await OrderModel.create({
            userId,
            items: orderItems,
            address,
            totalAmount,
            paymentMethod: 'COD',
        });

        // 7. ✅ Clean cart (remove invalid + ordered items)
        cart.items = [];
        await cart.save();

        res.json({
            message: 'Order placed successfully',
            orderId: order._id
        });

    } catch (error) {
        console.error("ORDER ERROR:", error); // 🔴 for debugging
        res.status(500).json({
            message: 'Server error',
            error: error.message
        });
    }
};

module.exports = { placeOrder };