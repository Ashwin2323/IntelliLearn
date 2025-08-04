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
import path from 'path';

const _dirname= path.resolve();

dotenv.config();
connectDB();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "https://intellilearn-7iut.onrender.com",
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

app.use(express.static(path.join(_dirname,"/client/dist")))
app.get('*',(_,res)=>{
    res.sendFile(path.resolve(_dirname,"client","dist","index.html"))
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});