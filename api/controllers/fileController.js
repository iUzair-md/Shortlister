import express from "express";
import { db } from "../connect.js";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from 'fs';


const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../public/upload");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

export const uploadFile = (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    console.log(req.file);

    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json("File upload failed.");
    }
    next();
  });
};

export const uploadFileHandler = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretkey",{ maxAge: '10h' }, async (err, userInfo) => {

      if (err) {
        console.error("JWT verification error:", err);
        return res.status(403).json("Token is not valid");
      }

      const { filename, path, mimetype } = req.file;

      const contentBuffer = fs.readFileSync(path);

      const q = "INSERT INTO resumes (filename, content, user_id) VALUES (?,?,?)";
      const values = [req.file.originalname,contentBuffer, userInfo.id];

      db.query(q, values, (err, data) => {
        if (err) {
          console.error("File upload error:", err);
          return res.status(500).json("Could not upload file.");
        }

        return res.status(200).json("File uploaded successfully.");
      });
    });
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json("Internal server error");
  }
};


export default router;
