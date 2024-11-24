
import React, { useState } from "react";
import TestContext from "./TestContext";

const TestContextProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [testTaken, setTestTaken] = useState(false);

  const updateScore = (newScore) => {
    setScore(newScore);
  };

  const updateTestTaken = (isTaken) => {
    setTestTaken(isTaken);
  };

  const value = { score, testTaken, updateScore, updateTestTaken };

  return (
    <TestContext.Provider value={value}>{children}</TestContext.Provider>
  );
};

export default TestContextProvider;
