import React, { useContext, useState, useEffect, useRef } from "react";
import "./TalentIcon.scss";
import TalentArrow from "../TalentArrow/TalentArrow";
import HeroTalentArrow from "../HeroTalentArrow/HeroTalentArrow";
import Tooltip from "../../../../Tooltip/Tooltip";
import { talentsToIcons } from "../../../../../utils/talents-to-icons-map";
import { CharacterDataContext } from "../../../../../context/CharacterDataContext";

const TalentIcon = ({ name, size = "talent-icon-small", talentData, arrowsData, isHeroTalent =  false }) => {
    if (!talentData) return <div className={`talent-icon ${size} ${!name ? "talent-empty" : ""}`}></div>;

    const { characterData, setCharacterData } = useContext(CharacterDataContext);

    const [hoverElement, setHoverElement] = useState(null);
    const iconRef = useRef(null);
    useEffect(() => {
        setHoverElement(iconRef.current);
    }, []);

    const maxRank = talentData.ranks["max rank"];
    const currentRank = talentData.ranks["current rank"];

    const updateTalentRank = (name, newRank) => {
        const updateCurrentRank = (talents) => {
            for (const row in talents) {
                if (talents[row][name]) {
                    talents[row][name].ranks["current rank"] = newRank;
                    break;
                };
            };
        };

        const resetTalents = (talents) => {
            for (const row in talents) {
                for (const talent in talents[row]) {
                    talents[row][talent].ranks["current rank"] = 0;
                };
            };
        };

        const findTalentInTalentData = (talent, talentData) => {
            for (const row in talentData) {
                for (const talentName in talentData[row]) {
                    if (talent === talentName) {
                        return talentData[row][talentName];
                    };
                };
            };
        };

        const updatedClassTalents = { ...characterData.classTalents };
        const updatedSpecTalents = { ...characterData.specTalents };
        let updatedLightsmithTalents = { ...characterData.lightsmithTalents };
        let updatedHeraldOfTheSunTalents = { ...characterData.heraldOfTheSunTalents };

        updateCurrentRank(updatedClassTalents);
        updateCurrentRank(updatedSpecTalents);
        updateCurrentRank(updatedLightsmithTalents);
        updateCurrentRank(updatedHeraldOfTheSunTalents);

        if (findTalentInTalentData(name, updatedLightsmithTalents)) {
            resetTalents(updatedHeraldOfTheSunTalents);
        } else if (findTalentInTalentData(name, updatedHeraldOfTheSunTalents)) {
            resetTalents(updatedLightsmithTalents);
        };

        setCharacterData({
            ...characterData,
            classTalents: updatedClassTalents,
            specTalents: updatedSpecTalents,
            lightsmithTalents: updatedLightsmithTalents,
            heraldOfTheSunTalents: updatedHeraldOfTheSunTalents
        });
    };

    const handleLeftClick = () => {
        if (currentRank < maxRank) {
            updateTalentRank(name, currentRank + 1);
        };
    };

    const handleRightClick = () => {
        if (currentRank > 0) {
            updateTalentRank(name, currentRank - 1);
        };
    };

    const createArrows = () => {
        return Object.keys(arrowsData).map((arrowDirection) => {
            if (arrowsData[arrowDirection].includes(name)) {
                if (isHeroTalent) {
                    return <HeroTalentArrow key={arrowDirection} direction={arrowDirection} talentSelected={currentRank > 0} />;
                } else {
                    return <TalentArrow key={arrowDirection} direction={arrowDirection} talentSelected={currentRank > 0} />;
                };
            };
            return null;
        });
    };

    return (
        <div className={`talent-icon ${size} ${!name ? "talent-empty" : ""} ${currentRank > 0 ? "talent-selected" : ""}`}>
            {name && (
                <>
                    <img
                        src={talentsToIcons[name]}
                        alt={name}
                        className={`talent-icon-image ${currentRank > 0 ? "talent-icon-selected" : ""} ${isHeroTalent ? "" : "talent-icon-border"}`}
                        draggable="false"
                        onClick={handleLeftClick}
                        onContextMenu={(e) => {
                            e.preventDefault();
                            handleRightClick();
                        }}
                        ref={iconRef}
                    />

                    {maxRank > 1 && (
                        <div className="talent-rank-display">{currentRank} / {maxRank}</div>
                    )}
            
                    <Tooltip children={name} hoverElement={hoverElement} />

                    {createArrows()}
                </>
            )}
        </div>
    );
};

export default TalentIcon;
