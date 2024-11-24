import { db } from "../connect.js";
import jwt from 'jsonwebtoken';
import { parsePdf } from "../utils/pdfParser.js"; 
import { extractSkillsFromText } from '../utils/skillsExtractor.js'; 

console.log('Current Working Directory:', process.cwd()); // Add this line

export const retrievePdfAndExtractSkills = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    if (!token) return res.status(401).json("Not logged in");

    jwt.verify(token, "secretkey", { maxAge: '10h' }, async (err, userInfo) => {
      if (err) {
        console.error("JWT verification error:", err);
        return res.status(403).json("Token is not valid");
      }

      const userId = userInfo.id;
      const retrievePdfQuery = "SELECT content FROM resumes WHERE user_id = ?";

      db.query(retrievePdfQuery, [userId], async (err, result) => {
        if (err) {
          console.error("Error fetching PDF blob:", err);
          return res.status(500).json("Internal server error");
        }

        if (result.length === 0) {
          return res.status(404).json("Resume not found");
        }

        const pdfBlob = result[0].content;      

        try {

          const pdfText = await parsePdf(pdfBlob);
          const extractedSkills = await extractSkillsFromText(pdfText);
          
          console.log("skillset: ",extractedSkills)

          // console.log(typeof extractedSkills);
          console.log(Array.isArray(extractedSkills));

          const skillsToSave = extractedSkills.map(skill => ({ skill_name: skill,score: 0, user_id_num: userId }));
          const insertSkillsQuery = "INSERT INTO skills (skill_name,score, user_id_num) VALUES ?";
          db.query(insertSkillsQuery, [skillsToSave.map(skill => [skill.skill_name,skill.score, skill.user_id_num])], (error) => {
            if (error) {
              console.error("Error inserting skills into the database:", error);
              return res.status(500).json("Internal server error");
            }

            console.log("Skills inserted into the database successfully.");
            return res.status(200).json({ skills: extractedSkills });
          });


        } catch (error) {
          console.error("Error parsing PDF:", error);
          return res.status(500).json("Error parsing PDF");
        }
      });
    });
  } catch (error) {
    console.error("Unexpected error:", error);
    return res.status(500).json("Internal server error");
  }
};
