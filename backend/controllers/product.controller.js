import { Product } from "../models/product.model.js";

export const createProduct = async (req, res) => {
    try {
        const { name, price, quantity } = req.body;

        const existing = await Product.findOne({ name: name.trim() });
        if (existing) {
            return res.status(400).json({ success: false, message: "Product with this name already exists" });
        }

        const product = new Product({ name: name.trim(), price, quantity });
        await product.save();

        res.status(201).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json({ success: true, products });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ success: false, message: "Product not found" });

        res.status(200).json({ success: true, product });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const { name } = req.body;
        const productId = req.params.id;

        if (name) {
            const duplicate = await Product.findOne({ name: name.trim(), _id: { $ne: productId } });
            if (duplicate) {
                return res.status(400).json({ success: false, message: "Another product with this name already exists" });
            }
        }

        const updatedProduct = await Product.findByIdAndUpdate(
            productId,
            { ...req.body, name: name?.trim() },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        res.status(200).json({ success: true, product: updatedProduct });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};


export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) return res.status(404).json({ success: false, message: "Product not found" });

        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};
