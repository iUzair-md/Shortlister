import express from "express";
const router = express.Router();
import {fetchQuestions} from "../controllers/questionsController.js"


router.get("/fetch", fetchQuestions );

export default router;
