import React, { useContext } from "react";
import "./Talents.scss";
import TalentGrid from "./TalentGrid/TalentGrid";
import HeroTalents from "./HeroTalents/HeroTalents";
import {
    classTalentsLive,
    classTalentsPTR,
    specTalentsLive,
    specTalentsPTR,
    classTalentsArrowsLive,
    classTalentsArrowsPTR,
    specTalentsArrowsLive,
    specTalentsArrowsPTR,
} from "../../../utils/base-talents";
import { CharacterDataContext } from "../../../context/CharacterDataContext";

const Talents = () => {
    const { characterData, setCharacterData } =
        useContext(CharacterDataContext);

    const classTalents = {
        talentsData: characterData ? characterData.classTalents : "",
        liveTalents: classTalentsLive,
        ptrTalents: classTalentsPTR,
        arrowsLive: classTalentsArrowsLive,
        arrowsPtr: classTalentsArrowsPTR,
    };

    const specTalents = {
        talentsData: characterData ? characterData.specTalents : "",
        liveTalents: specTalentsLive,
        ptrTalents: specTalentsPTR,
        arrowsLive: specTalentsArrowsLive,
        arrowsPtr: specTalentsArrowsPTR,
    };

    return (
        <div className="options-tab-content talents-content">
            <div className="talents-container">
                <TalentGrid
                    rows="10"
                    columns="7"
                    talents={classTalents}
                    width="43.5%"
                    freeTalentPoints={3}
                    maxTalentPoints={31}
                />
                <TalentGrid
                    rows="10"
                    columns="9"
                    talents={specTalents}
                    width="53%"
                    freeTalentPoints={0}
                    maxTalentPoints={30}
                />
            </div>

            <HeroTalents />
        </div>
    );
};

export default Talents;
