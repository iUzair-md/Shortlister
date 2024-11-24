import React from "react";
import "./main.scss";
import { Outlet, Navigate, Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="main">
      <div className="content">
        <div className="title">
          <h1> CURRICULUM VITAE ANALYSIS </h1>
        </div>
        <div className="desc">
          <h1> Everbody lies on their resume, dont they?</h1>
          <h1>
            AI screening goes beyond keywords and identifies <br /> <span style={{paddingLeft:'150px'}}>applicants based on
            skills.</span>
          </h1>
          <Link to="/register">
            <h1 className="button_test">Lets get you tested</h1>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Main;
