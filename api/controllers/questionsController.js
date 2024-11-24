import { db } from "../connect.js";
import jwt from 'jsonwebtoken';

export const fetchQuestions = async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      if (!token) return res.status(401).json('Not logged in');
  
      jwt.verify(token, 'secretkey', { maxAge: '10h' }, async (err, userInfo) => {
        if (err) {
          console.error('JWT verification error:', err);
          return res.status(403).json('Token is not valid');
        }
  
        const userId = userInfo.id;
  
        // Fetch questions from the conversations table for the current user
        const fetchQuestionsQuery = 'SELECT question FROM conversations WHERE user_id_numb = ?';
        db.query(fetchQuestionsQuery, [userId], (err, result) => {
          if (err) {
            console.error('Error fetching questions:', err);
            return res.status(500).json('Internal server error');
          }
  
          // Extract questions from the result
          const questions = result.map(row => row.question);
  
          // Return the fetched questions
          return res.status(200).json({ questions });
        });
      });
    } catch (error) {
      console.error('Unexpected error:', error);
      return res.status(500).json('Internal server error');
    }
  };
  