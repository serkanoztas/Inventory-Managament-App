import Product from "../models/Product.js"

const addProduct = async (req, res) => {
    try {
        const { name, category, supplier, price, stock } = req.body;

        const product = await Product.create({
            name,
            category,
            supplier,
            price,
            stock,
        });

        const populatedProduct = await Product.findById(product._id)
            .populate("category")
            .populate("supplier");

        res.status(201).json({
            success: true,
            product: populatedProduct,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category")
            .populate("supplier")
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        )
            .populate("category")
            .populate("supplier");

        res.json({
            success: true,
            product,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);

        res.json({
            success: true,
            message: "Product deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export default {
    addProduct,
    getProducts,
    updateProduct,
    deleteProduct,
};