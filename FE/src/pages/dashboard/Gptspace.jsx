import React, { useState, useEffect } from "react";
import DashboardLayout from "./DashboardLayout";
import Typewriter from "typewriter-effect";
import "./gptspace.scss";
import { Link } from "react-router-dom";
function Gptspace() {
  return (
    <DashboardLayout>
      <div className="gptspace">
        <div className="typewright">
          <div className="pltform">
            <h1>Platform Overview</h1>
          </div>
          <div className="overvieww">
            <h2>Its a common practice to lie in the resumes</h2>
            <p>
              Traditional Keyword based filtering filters resumes when required
              keywords are found, giving no insights on individuals technical
              proficiencies
            </p>
            <p>
              This project creates a platform utilizing cutting-edge
              technologies like OpenAI's ChatGPT in automating the process of
              generating challenging technical questions, to test the
              individuals for their skills, saving time and effort for both
              interviewers and candidates.{" "}
            </p>
          </div>
        </div>
        <div className="buttondiv">
          <Link to="/dashboard/guidelines">
            <button>Guildines</button>
          </Link>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Gptspace;
