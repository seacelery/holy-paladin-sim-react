import React from "react";
import "./LoadoutTalents.scss";
import LoadoutTalentIcon from "./LoadoutTalentIcon/LoadoutTalentIcon";

const LoadoutTalents = ({ talents }) => {
    const classTalents = talents.class_talents;
    const specTalents = talents.spec_talents;

    const sortTalents = (talents) => {
        const sortedKeys = Object.keys(talents).sort((a, b) => {
            const numA = parseInt(a.replace("row", ""), 10);
            const numB = parseInt(b.replace("row", ""), 10);
            return numA - numB;
        });
    
        const sortedTalents = {};
        sortedKeys.forEach(key => {
            sortedTalents[key] = talents[key];
        });
    
        return sortedTalents;
    };

    const sortedClassTalents = sortTalents(classTalents);
    const sortedSpecTalents = sortTalents(specTalents);

    return (
        <div className="loadout-container">
            <div className="loadout-header">Talents</div>
            <div className="loadout-talents">
                <div className="loadout-talents-left">
                    <img className="loadout-class-talent-icon" src="https://wow.zamimg.com/images/wow/icons/large/classicon_paladin.jpg" />
                    {Object.values(sortedClassTalents).map((row, index) => {
                        return (
                            <div className="loadout-talent-row" key={index}>
                                {Object.entries(row).map(([talentName, talentRanks]) => {
                                    if (talentRanks.ranks["current rank"] > 0) {
                                        return <LoadoutTalentIcon talentName={talentName} talentRanks={talentRanks} key={talentName} />
                                    } else {
                                        return null;
                                    };                    
                                })}
                            </div>
                        )
                    })}
                </div>

                <div className="loadout-talents-right">
                    <img className="loadout-spec-talent-icon" src="https://wow.zamimg.com/images/wow/icons/large/spell_holy_holybolt.jpg"/>
                    {Object.values(sortedSpecTalents).map((row, index) => {
                        return (
                            <div className="loadout-talent-row" key={index} style={{ justifyContent: "right" }}>
                                {Object.entries(row).map(([talentName, talentRanks]) => {
                                    if (talentRanks.ranks["current rank"] > 0) {
                                        return <LoadoutTalentIcon talentName={talentName} talentRanks={talentRanks} key={talentName} />
                                    } else {
                                        return null;
                                    };   
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default LoadoutTalents;
