import express from "express";
const router = express.Router();
import { retrievePdfAndExtractSkills } from "../controllers/skillsController.js";
import { fetchSkills, fetchSkillsWithScores, fetchQuestions,analyzeAnswer,analyzeBinaryAnswer} from "../controllers/skillsFetcher.js";


router.get("/extract",  retrievePdfAndExtractSkills);
router.get("/from-table", fetchSkills );
router.get("/with-scores", fetchSkillsWithScores );
router.get("/fetch/questions", fetchQuestions );
router.post("/analyze-answer",analyzeAnswer)

export default router;
