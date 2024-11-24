import React, { useContext, useState } from "react";
import "./scoreboard.scss";
import  TestContext  from '../../context/testcontext/TestContext';


const Scoreboard = () => {
  // State to manage hover and test taken
  const [isHovered, setIsHovered] = useState(false);
  const { score, testTaken } = useContext(TestContext);

  // Define the string representing "SCORE"
  const scoreString = "SCORE";

  // Function to generate the letters for each row
  const generateLettersForRow = (rowNumber) => {
    const letters = [];
    for (let i = 1; i <= rowNumber; i++) {
      if (i === rowNumber) {
        // Display the corresponding letter from the scoreString array
        const letter = scoreString.charAt(rowNumber - 1); // Get the letter from the scoreString
        letters.push(
          <div className="wooden-box" key={i}>
            {letter}
          </div>
        );
      } else {
        letters.push(
          <div className="wooden-box" key={i}>
            {" "}
          </div>
        );
      }
    }
    return letters;
  };

  // Create an array of rows
  const rows = [];
  for (let i = 1; i <= 5; i++) {
    rows.push(
      <div className="wooden-row" key={i}>
        {generateLettersForRow(i)}
      </div>
    );
  }

  return (
    <div
      className="wooden-pattern-grid"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {isHovered && !testTaken ? (
        <div className="text">
          {" "}
          <p>Take the test to display score</p>
        </div>
      ) : null}
      {isHovered && testTaken ? (
        <div className="scoretext" style={{ fontSize: "90px" }}>
          {" "}
          <p>{score}/12</p>
        </div>
      ) : null}
      {!isHovered && rows}
    </div>
  );
};

export default Scoreboard;
