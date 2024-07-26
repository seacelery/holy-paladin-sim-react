import React, { useState, useContext } from "react";
import "./TalentIcon.css";
import { talentsToIcons } from "../../../../../utils/talents-to-icons-map";
import { CharacterDataContext } from "../../../../../context/CharacterDataContext";

const TalentIcon = ({ name, size = "talent-icon-small", talentData }) => {
    if (!name) return <div className={`talent-icon ${size} ${!name ? "talent-empty" : ""}`}></div>;

    const { characterData, setCharacterData } = useContext(CharacterDataContext);

    const maxRank = talentData.ranks["max rank"];
    const currentRank = talentData.ranks["current rank"];

    const updateTalentRank = (newRank) => {
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

    const handleLeftClick = () => {
        if (currentRank < maxRank) {
            updateTalentRank(currentRank + 1);
        };
    };

    const handleRightClick = () => {
        if (currentRank > 0) {
            updateTalentRank(currentRank - 1);
        };
    };

    return (
        <div className={`talent-icon ${size} ${!name ? "talent-empty" : ""} ${currentRank > 0 ? "talent-selected" : ""}`}>
            {name && (
                <img
                    src={talentsToIcons[name]}
                    alt={name}
                    className={`talent-icon-image ${currentRank > 0 ? "talent-icon-selected" : ""}`}
                    draggable="false"
                    onClick={handleLeftClick}
                    onContextMenu={(e) => {
                        e.preventDefault();
                        handleRightClick();
                    }}
                />
            )}
        </div>
    );
};

export default TalentIcon;
