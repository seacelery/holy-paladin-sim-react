import React, { useContext } from "react";
import "./TalentIconChoice.css";
import { talentsToIcons } from "../../../../../utils/talents-to-icons-map";
import { CharacterDataContext } from "../../../../../context/CharacterDataContext";

const TalentIconChoice = ({ names = {}, size = "talent-icon-small", talentData }) => {
    const { nameLeft, nameRight } = names;
    const { talentDataLeft, talentDataRight } = talentData;

    const { characterData, setCharacterData } = useContext(CharacterDataContext);

    const currentRankLeft = talentDataLeft.ranks["current rank"];
    const maxRankLeft = talentDataLeft.ranks["max rank"];

    const currentRankRight = talentDataRight.ranks["current rank"];
    const maxRankRight = talentDataRight.ranks["max rank"];

    const updateTalentRank = (name, newRank) => {
        const updatedClassTalents = { ...characterData.classTalents };
        for (const row in updatedClassTalents) {
            if (updatedClassTalents[row][name]) {
                updatedClassTalents[row][name].ranks["current rank"] = newRank;
                break;
            };
        };

        const updatedSpecTalents = { ...characterData.specTalents };
        for (const row in updatedSpecTalents) {
            if (updatedSpecTalents[row][name]) {
                updatedSpecTalents[row][name].ranks["current rank"] = newRank;
                break;
            };
        };

        setCharacterData({
            ...characterData,
            classTalents: updatedClassTalents,
            specTalents: updatedSpecTalents,
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
            />
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
            />
        </div>
    );
};

export default TalentIconChoice;
