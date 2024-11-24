import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.js";
import fileRoutes from "./routes/file.js";
import skillRoute from "./routes/skills.js";

import dotenv from 'dotenv';
dotenv.config();
const app = express();


app.use((req, res, next) => {

res.header("Access-Control-Allow-Credentials", true);

next();
});

app.use(express.json());

app.use(cookieParser());
app.use(
cors({
    origin: "http://localhost:5173",
})
);


app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/skills", skillRoute);

app.listen(8000, () => {
console.log("API working!");
});
