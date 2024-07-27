import React, { useContext } from "react";
import "./HeroTalentGrid.scss";
import TalentIcon from "../../TalentGrid/TalentIcon/TalentIcon";
import TalentIconChoice from "../../TalentGrid/TalentIconChoice/TalentIconChoice";
import { VersionContext } from "../../../../../context/VersionContext";

const HeroTalentGrid = ({ width, rows, columns, talents = {} }) => {
    const { version } = useContext(VersionContext);

    const {
        talentsData,
        liveTalents,
        ptrTalents,
        arrowsLive,
        arrowsPtr,
    } = talents;

    const talentSet = version === "live" ? liveTalents : ptrTalents;
    const arrowsData = version === "live" ? arrowsLive : arrowsPtr;

    const styles = {
        "--talent-grid-rows": rows,
        "--talent-grid-columns": columns,
        width: width,
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

    return (
        <div className="hero-talents-grid" style={styles}>
            {talentSet.map((talent, index) => {
                const talentData = findTalentInTalentData(talent, talentsData);
                const [nameLeft, nameRight] = talent.split("/");

                if (nameRight) {
                    return (
                        <TalentIconChoice 
                            key={index}
                            names={{nameLeft, nameRight}}
                            talentData={{talentDataLeft: findTalentInTalentData(nameLeft, talentsData), talentDataRight: findTalentInTalentData(nameRight, talentsData)}}
                            arrowsData={arrowsData}
                            size={columns < 5 ? "talent-icon-large" : "talent-icon-small"}
                            isHeroTalent={true}
                        />
                    );
                } else {
                    return (
                        <TalentIcon
                            key={index}
                            name={talent}
                            talentData={talentData}
                            talentsData={talentsData}
                            arrowsData={arrowsData}
                            size={columns < 5 ? "talent-icon-large" : "talent-icon-small"}
                            isHeroTalent={true}
                        />
                    );
                };
            })}
        </div>
    );
};

export default HeroTalentGrid;
