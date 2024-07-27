import React from "react";
import "./TalentArrow.scss";

const TalentArrow = ({ direction, talentSelected }) => {
    const directionClasses = {
        left: "talent-arrow-left",
        right: "talent-arrow-right",
        down: "talent-arrow-down",
        downLong: "talent-arrow-down-long",
    };

    return <div className={`talent-arrow ${directionClasses[direction]} ${talentSelected ? "talent-arrow-selected" : ""}`}></div>;
};

export default TalentArrow;
