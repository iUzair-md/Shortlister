import "./skills.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Skills = () => {
  const [skillsWithScores, setSkillsWithScores] = useState([]);

  useEffect(() => {
    const fetchSkillsWithScores = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/skills/with-scores",
          {
            withCredentials: true,
          }
        );
        setSkillsWithScores(response.data.skillsWithScores);
      } catch (error) {
        console.error("Error fetching skills with scores:", error);
      }
    };

    fetchSkillsWithScores();
  }, []);
  return (
    <div className="skillboard">
      <h1>Skill Set</h1>
      <div className="div">
        <div className="top">
          {skillsWithScores.map((skill, index) => (
            <div className="skill" key={index}>
              <div className="abc" key={index}>
                <p className="pone" >{skill.skill_name} </p>
                {/* <p className="ptwo">{skill.score}/0</p> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
