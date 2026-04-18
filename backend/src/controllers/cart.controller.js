const cartModel = require('../models/cart.model');



const addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        // ✅ validate input
        if (!userId || !productId) {
            return res.status(400).json({
                message: "userId and productId are required"
            });
        }

        let cart = await cartModel.findOne({ userId });

        if (!cart) {
            cart = new cartModel({
                userId,
                items: [{ productId, quantity: 1 }]
            });
        } else {
            const item = cart.items.find(
                (i) => i.productId.toString() === productId.toString() // ✅ FIX
            );

            if (item) {
                item.quantity += 1;
            } else {
                cart.items.push({ productId, quantity: 1 });
            }
        }

        await cart.save();

        res.status(200).json({
            message: 'item added to cart',
            cart
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add item to cart",
            error: error.message
        });
    }
};


const removeItem = async (req, res) => {
    try {
        const { userId, productId } = req.body;

        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }


        cart.items = cart.items.filter(
           (i) => i.productId.toString() !== productId
        );

        await cart.save();
        res.status(200).json({ message: 'Item removed from cart', cart });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

//Update quantity in cart


const updateQuantity = async (req, res) => {
    try {
        const { userId, productId, quantity } = req.body;
        let cart = await cartModel.findOne({ userId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const item = cart.items.find(
            i => i.productId.toString() === productId
        );
        if (!item) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        item.quantity = quantity;
        await cart.save();
        res.status(200).json({ message: 'Item quantity updated', cart });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

//get cart by user id


const getCart = async (req, res) => {
    try {
        const { userId } = req.params;
        let cart = await cartModel.findOne({ userId }).populate('items.productId');
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.json({ cart });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports = {
    addToCart,
    removeItem,
    updateQuantity,
    getCart
}