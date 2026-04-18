const ProductModel = require("../models/product.model");


//Create Product
const createProduct = async (req, res) => {
    try {
        const { title, price, image } = req.body;
        const product = await ProductModel.create(req.body);

        res.json({
            message: 'Product created successfully',
            product
        });

        if (!title || !price || !image) {
            return res.status(400).json({ message: "Missing required fields" });
        }

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

//Get All Products  
const getProducts = async (req, res) => {
    try {
        const { search, category } = req.query;

        let filter = {};
        if (search) {
            filter.title = { $regex: search, $options: 'i' };
        }
        if (category) {
            filter.category = category;
        }

        const products = await ProductModel.find(filter).sort({ createdAt: -1 });//?sorts the products by creation date in descending order   
        res.json(products);

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}


//Update Product
const updateProduct = async (req, res) => {
    try {
        const updated = await ProductModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        res.json({
            message: 'Product updated successfully',
            product: updated
        });

    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}


//Delete Product
const deleteProduct = async (req, res) => {
    try {
        await ProductModel.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
}

module.exports = {
    createProduct,
    getProducts,
    updateProduct,
    deleteProduct
}