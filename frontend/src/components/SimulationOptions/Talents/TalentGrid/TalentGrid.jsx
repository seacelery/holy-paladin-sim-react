import React, { useContext } from "react";
import "./TalentGrid.css";
import TalentIcon from "./TalentIcon/TalentIcon";
import TalentIconChoice from "./TalentIconChoice/TalentIconChoice";
import TalentsCounter from "./TalentsCounter/TalentsCounter";
import { VersionContext } from "../../../../context/VersionContext";

const TalentGrid = ({ width, rows, columns, talents = {}, freeTalentPoints = 0, maxTalentPoints }) => {
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

    const calculateCount = (talentsData, freePoints) => {
        let count = 0;

        for (const row in talentsData) {
            for (const talent in talentsData[row]) {
                count += talentsData[row][talent].ranks["current rank"];
            };
        };

        return count - freePoints;
    };

    return (
        <div className="talents-grid" style={styles}>
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
                            size={columns <= 3 ? "talent-icon-large" : "talent-icon-small"}
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
                            size={columns <= 3 ? "talent-icon-large" : "talent-icon-small"}
                        />
                    );
                };
            })}
            <TalentsCounter currentCount={calculateCount(talentsData, freeTalentPoints)} maxCount={maxTalentPoints} />
        </div>
    );
};

export default TalentGrid;
