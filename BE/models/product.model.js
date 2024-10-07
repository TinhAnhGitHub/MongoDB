import mongoose from "mongoose";


// Define the schema for a product in the database
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image: {
        type:String,
        required:true
    },
    
}, {
    timestamps:true  // Automatically creates 'createdAt' and 'updatedAt' fields
});


const Product = mongoose.model('Product', productSchema);// 'Product' is the collection name in MongoDB

export default Product;
