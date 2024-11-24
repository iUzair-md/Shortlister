import React, { useContext } from "react";
import AuthContext from "../../context/authcontext/AuthContext";
import "./dashboard.scss";
import Skills from "./Skills";
import Scoreboard from "./Scoreboard";

const DashboardLayout = ({ children, score, testTaken }) => {
  const { currentUser, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (

    <div className="containerdashboard">
      <div className="boxx">
        <div className=" box1">
          <div className="topdiv">
            <div className="imagediv">
              <img
                src="/images/user1.png"
                alt=""
                width={225}
                className="rounded-lg"
              />
            </div>
            <div className="infodiv">
              <h1>
                {" "}
                <span>Name</span> <br /> {currentUser.name}
              </h1>
              <hr style={{ width: "90%", alignSelf: "center" }} />
              <h1>
                <span>Email</span>
                <br /> {currentUser.email}
              </h1>
            </div>
          </div>
          <div className="bottomdiv">
            <div className="skillsection">
              <div className="skillssetdiv">
                <Skills />
              </div>
              <div className="buttonsdiv">
                <button>Re Upload</button>
                <button onClick={handleLogout}>End Session</button>
              </div>
            </div>
            <div className="scoresection"><Scoreboard score={score} testTaken={testTaken} /></div>
          </div>
        </div>
        <div className=" box2">
          <div className="gptarea">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
