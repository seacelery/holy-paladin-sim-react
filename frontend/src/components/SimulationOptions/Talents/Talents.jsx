import React, { useContext } from "react";
import "./Talents.css";
import TalentGrid from "./TalentGrid/TalentGrid";
import {
    classTalentsLive,
    classTalentsPTR,
    specTalentsLive,
    specTalentsPTR,
    classTalentsArrowsLive,
    classTalentsArrowsPTR,
    specTalentsArrowsLive,
    specTalentsArrowsPTR,
    baseClassTalentsLive,
    baseClassTalentsPTR,
    baseSpecTalentsLive,
    baseSpecTalentsPTR,
} from "../../../utils/base-talents";
import { CharacterDataContext } from "../../../context/CharacterDataContext";

const Talents = () => {
    const { characterData, setCharacterData } = useContext(CharacterDataContext);

    const classTalents = {
        talentsData: characterData.classTalents,
        liveTalents: classTalentsLive,
        ptrTalents: classTalentsPTR,
        baseLiveTalents: baseClassTalentsLive,
        basePtrTalents: baseClassTalentsPTR,
        arrowsLive: classTalentsArrowsLive,
        arrowsPtr: classTalentsArrowsPTR,
    };

    const specTalents = {
        talentsData: characterData.specTalents,
        liveTalents: specTalentsLive,
        ptrTalents: specTalentsPTR,
        baseLiveTalents: baseSpecTalentsLive,
        basePtrTalents: baseSpecTalentsPTR,
        arrowsLive: specTalentsArrowsLive,
        arrowsPtr: specTalentsArrowsPTR,
    };

    return (
        <div className="options-tab-content talents-content">
            <div className="hero-talents-overlay"></div>

            <div className="talents-container">
                <TalentGrid rows="10" columns="7" talents={classTalents} width="43.5%" />
                <TalentGrid rows="10" columns="9" talents={specTalents} width="53%" />
            </div>
        </div>
    );
};

export default Talents;
