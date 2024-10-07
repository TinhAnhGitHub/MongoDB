import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import productRoutes from './route/product.route.js';


const app = express();
dotenv.config();
app.use(express.json()); // Allows us to accept JSON data in req.body

app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000



app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline'");
    next();
});



// Log MongoDB URI
console.log(process.env.MONGO_URI);

// Start server and connect to MongoDB
app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});
