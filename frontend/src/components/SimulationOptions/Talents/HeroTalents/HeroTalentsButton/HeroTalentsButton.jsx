import React from "react";
import "./HeroTalentsButton.scss";
import { talentsToIcons } from "../../../../../utils/talents-to-icons-map";

const HeroTalentsButton = ({
    currentCount,
    maxCount,
    currentHeroTalentSpec,
    onClick,
}) => {
    return (
        <div className="hero-talents-button" onClick={onClick}>
            <div className="hero-talents-button-header">Hero Talents</div>
            <div className="hero-talents-button-icons">
                <div className="hero-talents-button-icon-container">
                    <img
                        className={`hero-talents-button-icon ${
                            currentHeroTalentSpec === "Lightsmith"
                                ? "hero-talents-button-icon-highlighted"
                                : ""
                        }`}
                        src={talentsToIcons["Holy Bulwark"]}
                        alt="Lightsmith Icon"
                        draggable="false"
                    />
                </div>
                <div className="hero-talents-button-icon-container">
                    <img
                        className={`hero-talents-button-icon ${
                            currentHeroTalentSpec === "Herald of the Sun"
                                ? "hero-talents-button-icon-highlighted"
                                : ""
                        }`}
                        src={talentsToIcons["Dawnlight"]}
                        alt="Herald of the Sun Icon"
                        draggable="false"
                    />
                </div>
            </div>
            <div
                className={`hero-talents-button-info ${
                    currentCount === maxCount
                        ? "talents-count-perfect"
                        : currentCount > maxCount
                        ? "talents-count-exceeded"
                        : ""
                }`}
            >
                {currentCount} / {maxCount}
            </div>
        </div>
    );
};

export default HeroTalentsButton;
