import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import {connectDB} from './config/db.js';
import studentRoutes from "./routes/studentRoutes.js";

const app = express();
connectDB();
app.use(express.json());
app.use("/api/students", studentRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}` );
})