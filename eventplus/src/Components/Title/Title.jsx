import React from "react";
import "./Title.css";
import Banner from "../Banner/Banner";

const Title = ({ titleText, additionalClass = "", color = "" }) => {
  return (
    <h1 className={`title ${additionalClass}`} style={{ color: color }}>
      {titleText}
      <hr style={{ borderColor: color }} />
      {/* <Banner/> */}
    </h1>
  );
};

export default Title;
