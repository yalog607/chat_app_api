import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";

import { connectDB } from "../lib/db.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
import route from "../routes/index.js";
route(app);

app.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT);
    connectDB();
})