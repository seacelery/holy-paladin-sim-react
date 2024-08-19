import React from "react";
import "./Counts.scss";
import CountsIcon from "../CountsIcon/CountsIcon";
import { overlappingBuffs, overlappingBuffsData } from "../../../../../../data/breakdown-objects";

const Counts = ({ counts }) => {
    return <div className="timeline-grid-cell">
        <div className="timeline-player-auras-container">
            {Object.keys(counts).map((buff, index) => (
                <CountsIcon key={index} buffName={buff} count={counts[buff]} />
            ))}
        </div>
    </div>
};

export default Counts;
