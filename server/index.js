import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { connect } from 'mongoose';
import connectDB from './database/db.js';
import userRoute from './routes/userRoute.js';
import courseRoute from './routes/courseRoute.js';
import mediaRoute from './routes/mediaRoute.js';
import purchaseRoute from './routes/purchaseCourseRoute.js';
import courseProgressRoute from './routes/courseProgressRoute.js';

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
 
// Apis
app.use("/api/v1/media",mediaRoute);
app.use("/api/v1/user",userRoute);
app.use("/api/v1/course",courseRoute);
app.use("/api/v1/purchase",purchaseRoute);
app.use("/api/v1/progress",courseProgressRoute);

// app.get("/home", (_, res) => {
//     res.status(200).json({
//         success: true,
//         message: "Welcome to Home Page"
//     })
// });
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});