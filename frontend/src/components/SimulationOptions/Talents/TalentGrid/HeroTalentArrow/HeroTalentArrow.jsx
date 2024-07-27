import React from "react";
import "./HeroTalentArrow.scss";

const HeroTalentArrow = ({ direction, talentSelected }) => {
    const directionClasses = {
        left: "hero-talent-arrow-left",
        right: "hero-talent-arrow-right",
        down: "hero-talent-arrow-down",
        downLong: "hero-talent-arrow-down-long",
    };

    return <div className={`hero-talent-arrow ${directionClasses[direction]} ${talentSelected ? "talent-arrow-selected" : ""}`}></div>;
};

export default HeroTalentArrow;
