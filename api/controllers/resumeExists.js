import { db } from '../connect.js' 

export const resumeExists = async (userId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT COUNT(*) AS resumeCount FROM resumes WHERE user_id = ?";
    db.query(query, [userId], (err, result) => {
      if (err) {
        console.error("Error checking resume existence:", err);
        reject(err);
      } else {
        const resumeCount = result[0].resumeCount;
        resolve(resumeCount > 0);
      }
    });
  });
};