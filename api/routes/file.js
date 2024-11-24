import express from "express";
import { uploadFile, uploadFileHandler } from "../controllers/fileController.js";

const router = express.Router();

router.post("/upload", uploadFile, uploadFileHandler);

export default router;