import React from "react";

const TestContext = React.createContext({
  score: 0,
  testTaken: false,
  setScore: (score) => {},
  setTestTaken: (testTaken) => {},
});

export default TestContext;