import express from "express";
import cors from  'cors'
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import adminRoutes from "./routes/adminRoutes.js";
import instructorRoutes from "./routes/instructorRoutes.js";



import { notFound, errorHandler } from './middleware/errorMiddleware.js'
import connectDB from "./config/db.js";
dotenv.config();
import cloudinary from "cloudinary";
import bodyParser from "body-parser";

cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.CLOUDAPIKEY,
  api_secret: process.env.CLOUDAPISECRET,
});

const corsOptions = {
  origin: true,
  credentials:true
}
const port = process.env.PORT || 5000;
connectDB();
const app = express();
app.use(cookieParser());
// Set the limit to 10 megabytes
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes)
app.use("/api/instructor", instructorRoutes);
app.use(cors(corsOptions))

app.get("/", (req, res) => res.send("Server is ready"));


app.use(notFound);
app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));