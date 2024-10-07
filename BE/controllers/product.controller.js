import Product from '../models/product.model.js'
import mongoose from 'mongoose';

export const updateProducts = async(req, res) => { 
    const { id } = req.params;
    const product = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Product Id"
        });
    }

    try {
        const updated_product = await Product.findByIdAndUpdate(id, product, { new: true }); // Return updated product
        if (!updated_product) {
            return res.status(404).json({
                success: false,
                message: "Product not found"
            });
        }
        res.status(200).json({
            success: true,
            data: updated_product
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
}


export const getProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.status(200).json({
            success:true,
            data: products
        })
    }catch(error){
        console.log("Error in fetching products:", error.message);
        res.status(500).json({
            success: false,
            message: `Server error: ${error.message}`
        })
    }
}


export const createProducts = async (req, res) => { 
    const products = req.body;

    if (!Array.isArray(products) || products.length === 0) {
        return res.status(400).json({
            success: false,
            message: "Please provide an array of products"
        });
    }

    let savedProducts = [];
    let errors = [];

    for (let i = 0; i < products.length; i++) {
        const product = products[i];

        if (!product.name || !product.price || !product.image) {
            errors.push({
                index: i,
                message: `Product at index ${i} is missing required fields`
            });
            continue; 
        }

        const newProduct = new Product(product);

        try {
            const savedProduct = await newProduct.save();
            savedProducts.push(savedProduct);
        } catch (error) {
            console.error(`Error in saving product at index ${i}:`, error.message);
            errors.push({
                index: i,
                message: `Server error saving product at index ${i}`
            });
        }
    }

    if (errors.length > 0) {
        return res.status(400).json({
            success: false,
            message: "Some products failed validation or saving",
            errors: errors
        });
    }

    res.status(200).json({
        success: true,
        data: savedProducts
    });
};

export const deleteProducts = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            success: false,
            message: "Invalid Product Id"
        });
    }
    
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({
                success: false,
                message: `Product with id: ${id} not found`
            });
        }
        res.status(200).json({
            success: true,
            message: `Product with id: ${id} has successfully been deleted`
        });
    } catch (error) {
        console.error("Error: ", error.message);
        res.status(500).json({
            success: false,
            message: `Server error while deleting product with id: ${id}.`
        });
    }
}