import bcrypt from "bcryptjs";
import { db } from "../connect.js"
import  jwt  from "jsonwebtoken";
import {resumeExists} from './resumeExists.js'


 export const register  = (req,res)=>{
    const q = "SELECT * FROM users WHERE email = ?"
    db.query(q,[req.body.email],(err,data)=>{
        if(err) return res.status(500).json(err)
        if(data.length) return res.status(409).json("User Already Exists!")

    //CREATE NEW USER 

        const salt = 10
        const hashedPassword = bcrypt.hashSync(req.body.password,salt)

        const q  = "INSERT INTO users (`name`,`email`,`password`) VALUE (?)"
        const values = [req.body.name,req.body.email,hashedPassword]
        db.query(q,[values],(err,data)=>{
            if(err) return res.status(500).json(err);
            return res.status(200).json("User has been created!")    
        })
    })
 }

 export const login  = async  (req,res)=>{
    try {
        const q = "SELECT * FROM users WHERE email = ?";
        db.query(q, [req.body.email], async (err, data) => {
          if (err) return res.status(500).json(err);
          if (data.length === 0) return res.status(404).json("User not found!");
    
          const checkPassword = bcrypt.compareSync(req.body.password, data[0].password);
          if (!checkPassword) return res.status(400).json("Wrong Password or username ");
    
          const token = jwt.sign({ id: data[0].user_id }, "secretkey", { expiresIn: '10h' });
        //   console.log("Generated token:", token);
        //   console.log("User ID:", data[0].user_id);
    
          // Check if the user has uploaded a resume
          const hasResume = await resumeExists(data[0].user_id);
    
          const { password, ...others } = data[0];
          res.cookie("accessToken", token, {
            httpOnly: true
          })

          if (hasResume) {
            // Redirect to /dashboard if the user has a resume
            res.status(200).json({ redirect: "/dashboard", hasResume: true, ...others  });
          } else {
            // Redirect to /upload if the user does not have a resume
            res.status(200).json({ redirect: "/upload" , hasResume: false , ...others});
          }
        });
      } catch (error) {
        console.error("Login error:", error);
        res.status(500).json("Internal server error");
      }

 };

 export const logout = async (req, res) => {
  // 1. Extract user ID from the access token cookie
  let userId;
  try {
    const decodedToken = jwt.verify(req.cookies.accessToken, "secretkey");
    userId = decodedToken.id;
  } catch (err) {
    console.error("Error verifying access token:", err);
    // Consider returning a more informative error message if appropriate
  }

  // 2. Delete conversations associated with the user ID (if valid)
  if (userId) {
    try {
      const deleteQuery = "DELETE FROM conversations WHERE user_id_numb = ?";
      await db.query(deleteQuery, [userId]);
      // Conversation deletion successful, proceed to clear cookie
      res.clearCookie("accessToken", {
        secure: true,
        sameSite: "none"
      }).status(200).json("User has been logged out ");
    } catch (err) {
      console.error("Error deleting conversations:", err);
      // Consider returning a more informative error message if appropriate
    }
  } else {
    // Handle case where user ID is not extracted or invalid
    res.status(400).json("Invalid access token");
  }
};

//  export const logout  = (req,res)=>{



//     // res.clearCookie("accessToken",{
//     //     secure:true,
//     //     sameSite:"none"
//     // }).status(200).json("User has been logged out ")

//  }