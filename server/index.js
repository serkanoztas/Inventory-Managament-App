import express from 'express';
import cors from 'cors';
import connectDB from './db/connection.js';
import authRoutes from './routes/authRoutes.js';
import dotenv from "dotenv";
import categoryRoutes from "./routes/categoryRoutes.js"
import supplierRoutes from "./routes/supplierRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/supplier', supplierRoutes)


app.listen(process.env.PORT, () => {
    connectDB();
    console.log(`Server is running on port ${process.env.PORT}`);
});

console.log(process.env.PORT);
console.log(process.env.MONGO_URL);