import React, { useContext, useState, useRef, useEffect } from "react";
import "./TalentIconChoice.css";
import TalentArrow from "../TalentArrow/TalentArrow";
import HeroTalentArrow from "../HeroTalentArrow/HeroTalentArrow";
import Tooltip from "../../../../Tooltip/Tooltip";
import { talentsToIcons } from "../../../../../utils/talents-to-icons-map";
import { CharacterDataContext } from "../../../../../context/CharacterDataContext";

const TalentIconChoice = ({ names = {}, size = "talent-icon-small", talentData, arrowsData, isHeroTalent = false }) => {
    const { characterData, setCharacterData } = useContext(CharacterDataContext);

    const { nameLeft, nameRight } = names;
    const { talentDataLeft, talentDataRight } = talentData;

    const [hoverElementLeft, setHoverElementLeft] = useState(null);
    const [hoverElementRight, setHoverElementRight] = useState(null);
    const iconRefLeft = useRef(null);
    const iconRefRight = useRef(null);
    useEffect(() => {
        setHoverElementLeft(iconRefLeft.current);
        setHoverElementRight(iconRefRight.current);
    }, []);

    const currentRankLeft = talentDataLeft.ranks["current rank"];
    const maxRankLeft = talentDataLeft.ranks["max rank"];

    const currentRankRight = talentDataRight.ranks["current rank"];
    const maxRankRight = talentDataRight.ranks["max rank"];

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

    const handleLeftClick = (name, currentRank, maxRank, oppositeName, oppositeCurrentRank) => {
        if (currentRank < maxRank) {
            updateTalentRank(name, currentRank + 1);
            if (oppositeCurrentRank > 0) {
                updateTalentRank(oppositeName, oppositeCurrentRank - 1);
            };
        };
    };

    const handleRightClick = (name, currentRank) => {
        if (currentRank > 0) {
            updateTalentRank(name, currentRank - 1);
        };
    };

    const createArrows = () => {
        return Object.keys(arrowsData).map((arrowDirection) => {
            if (arrowsData[arrowDirection].includes(nameLeft + "/" + nameRight)) {
                if (isHeroTalent) {
                    return <HeroTalentArrow key={arrowDirection} direction={arrowDirection} talentSelected={currentRankLeft > 0 || currentRankRight > 0} />;
                } else {
                    return <TalentArrow key={arrowDirection} direction={arrowDirection} talentSelected={currentRankLeft > 0 || currentRankRight > 0} />;
                };
            };
            return null;
        });
    };

    return (
        <div className={`talent-icon ${size} ${!names ? "talent-empty" : ""} ${currentRankLeft > 0 || currentRankRight > 0 ? "talent-selected" : ""}`}>
            <img
                src={talentsToIcons[nameLeft]}
                alt={nameLeft}
                className={`talent-icon-image talent-choice-left ${currentRankLeft > 0 ? "talent-icon-selected" : ""}`}
                draggable="false"
                onClick={() => handleLeftClick(nameLeft, currentRankLeft, maxRankLeft, nameRight, currentRankRight)}
                onContextMenu={(e) => {
                    e.preventDefault();
                    handleRightClick(nameLeft, currentRankLeft)
                }}
                ref={iconRefLeft}
            />
            <Tooltip children={nameLeft} hoverElement={hoverElementLeft} />
            <div className="talent-icon-divider"></div>
            <img
                src={talentsToIcons[nameRight]}
                alt={nameRight}
                className={`talent-icon-image talent-choice-right ${currentRankRight > 0 ? "talent-icon-selected" : ""}`}
                draggable="false"
                onClick={() => handleLeftClick(nameRight, currentRankRight, maxRankRight, nameLeft, currentRankLeft)}
                onContextMenu={(e) => {
                    e.preventDefault();
                    handleRightClick(nameRight, currentRankRight)
                }}
                ref={iconRefRight}
            />
            <Tooltip children={nameRight} hoverElement={hoverElementRight} />
            {createArrows()}
        </div>
    );
};

export default TalentIconChoice;
