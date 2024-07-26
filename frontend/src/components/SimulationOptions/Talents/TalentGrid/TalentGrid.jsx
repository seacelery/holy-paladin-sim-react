import React, { useContext } from "react";
import "./TalentGrid.css";
import TalentIcon from "./TalentIcon/TalentIcon";
import TalentIconChoice from "./TalentIconChoice/TalentIconChoice";
import { VersionContext } from "../../../../context/VersionContext";

const TalentGrid = ({ width, rows, columns, talents = {} }) => {
    const { version } = useContext(VersionContext);

    const {
        talentsData,
        liveTalents,
        ptrTalents,
        baseLiveTalents,
        basePtrTalents,
        arrowsLive,
        arrowsPtr,
    } = talents;

    const talentSet = version === "live" ? liveTalents : ptrTalents;

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
        <div className="talent-grid" style={styles}>
            {talentSet.map((talent, index) => {
                const talentData = findTalentInTalentData(talent, talentsData);
                const [nameLeft, nameRight] = talent.split("/");

                if (nameRight) {
                    return (
                        <TalentIconChoice 
                            key={index}
                            names={{nameLeft, nameRight}}
                            talentData={{talentDataLeft: findTalentInTalentData(nameLeft, talentsData), talentDataRight: findTalentInTalentData(nameRight, talentsData)}}
                        />
                    );
                } else {
                    return (
                        <TalentIcon
                            key={index}
                            name={talent}
                            talentData={talentData}
                            talentsData={talentsData}
                        />
                    );
                };
            })}
        </div>
    );
};

export default TalentGrid;
