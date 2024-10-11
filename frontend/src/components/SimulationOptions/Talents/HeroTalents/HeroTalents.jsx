import React, { useContext, useState, useEffect, useRef } from "react";
import "./HeroTalents.scss";
import HeroTalentGrid from "./HeroTalentGrid/HeroTalentGrid";
import HeroTalentsButton from "./HeroTalentsButton/HeroTalentsButton";
import {
    heroTalentsHeraldOfTheSunLive,
    heroTalentsHeraldOfTheSunPTR,
    heroTalentsLightsmithLive,
    heroTalentsLightsmithPTR,
    heraldOfTheSunTalentsArrowsLive,
    heraldOfTheSunTalentsArrowsPTR,
    lightsmithTalentsArrowsLive,
    lightsmithTalentsArrowsPTR,
} from "../../../../utils/base-talents";
import { CharacterDataContext } from "../../../../context/CharacterDataContext";

const calculateCount = (talentsData, freePoints) => {
    let count = 0;
    for (const row in talentsData) {
        for (const talent in talentsData[row]) {
            count += talentsData[row][talent].ranks["current rank"];
        };
    };
    return count - freePoints;
};

const HeroTalents = () => {
    const { characterData, setCharacterData } =
        useContext(CharacterDataContext);

    const [currentHeroTalentSpec, setCurrentHeroTalentSpec] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const modalRef = useRef(null);
    const buttonRef = useRef(null);

    const heraldOfTheSunTalents = {
        talentsData: characterData.heraldOfTheSunTalents,
        liveTalents: heroTalentsHeraldOfTheSunLive,
        ptrTalents: heroTalentsHeraldOfTheSunPTR,
        arrowsLive: heraldOfTheSunTalentsArrowsLive,
        arrowsPtr: heraldOfTheSunTalentsArrowsPTR,
    };

    const lightsmithTalents = {
        talentsData: characterData.lightsmithTalents,
        liveTalents: heroTalentsLightsmithLive,
        ptrTalents: heroTalentsLightsmithPTR,
        arrowsLive: lightsmithTalentsArrowsLive,
        arrowsPtr: lightsmithTalentsArrowsPTR,
    };

    const handleButtonClick = () => {
        setModalOpen((prevState) => !prevState);
    };

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target) && !buttonRef.current.contains(e.target)) {
            setModalOpen(false);
        };
    };

    useEffect(() => {
        if (modalOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        };

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [modalOpen]);

    useEffect(() => {
        const lightsmithCount = calculateCount(
            lightsmithTalents.talentsData,
            0
        );
        const heraldOfTheSunCount = calculateCount(
            heraldOfTheSunTalents.talentsData,
            0
        );

        if (lightsmithCount > heraldOfTheSunCount) {
            setCurrentHeroTalentSpec("Lightsmith");
        } else if (heraldOfTheSunCount > lightsmithCount) {
            setCurrentHeroTalentSpec("Herald of the Sun");
        } else {
            setCurrentHeroTalentSpec(null);
        }
    }, [heraldOfTheSunTalents.talentsData, lightsmithTalents.talentsData]);

    return (
        <>
            <HeroTalentsButton
                currentCount={Math.max(
                    calculateCount(lightsmithTalents.talentsData, 0),
                    calculateCount(heraldOfTheSunTalents.talentsData, 0)
                )}
                maxCount={11}
                currentHeroTalentSpec={currentHeroTalentSpec}
                onClick={handleButtonClick}
                ref={buttonRef}
            />

            {modalOpen && (
                <div className="hero-talents-overlay">
                    <div className="hero-talents-container" ref={modalRef}>
                        <div
                            className={`hero-talents-section ${
                                currentHeroTalentSpec === "Lightsmith"
                                    ? "hero-talents-section-selected"
                                    : ""
                            }`}
                        >
                            <div
                                className={`hero-talents-header ${
                                    currentHeroTalentSpec === "Lightsmith"
                                        ? "hero-talents-header-selected"
                                        : ""
                                }`}
                            >
                                Lightsmith
                            </div>
                            <div className="hero-talents-grid-container">
                                <HeroTalentGrid
                                    rows="5"
                                    columns="3"
                                    width="100%"
                                    talents={lightsmithTalents}
                                />
                            </div>
                        </div>

                        <div
                            className={`hero-talents-section ${
                                currentHeroTalentSpec === "Herald of the Sun"
                                    ? "hero-talents-section-selected"
                                    : ""
                            }`}
                        >
                            <div
                                className={`hero-talents-header ${
                                    currentHeroTalentSpec ===
                                    "Herald of the Sun"
                                        ? "hero-talents-header-selected"
                                        : ""
                                }`}
                            >
                                Herald of the Sun
                            </div>
                            <div className="hero-talents-grid-container">
                                <HeroTalentGrid
                                    rows="5"
                                    columns="3"
                                    width="100%"
                                    talents={heraldOfTheSunTalents}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default HeroTalents;
