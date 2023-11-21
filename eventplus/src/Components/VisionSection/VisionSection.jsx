import React from "react";
import Title from "../Title/Title";
import "./VisionSection.css";

const VisionSection = () => {
  return (
    <section className="vision">
      <div className="vision__box">
        <Title
          titleText={"Visão"}
          color="white"
          additionalClass="vision__title"
        />

        <p className="vision__text">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab, quam
          architecto. Praesentium, ducimus? Cumque odio rerum minus dolores
          esse, placeat expedita quos temporibus consequatur saepe quas quae
          ratione corporis numquam.
        </p>
      </div>
    </section>
  );
};

export default VisionSection;
