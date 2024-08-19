import React from "react";
import "./CountsIcon.scss";
import { buffsToIconsMap } from "../../../../../../utils/buffs-to-icons-map";
import { formatFixedNumber } from "../../../../../../data/breakdown-functions";

const CountsIcon = ({ buffName, count }) => {
    return <div className="timeline-aura-icon-container">
        <div className="timeline-aura-icon-overlay">
            <img className="timeline-aura-icon" src={buffsToIconsMap[buffName]} alt={buffName}></img>
        </div>
        <div className="timeline-aura-duration-text">{count}</div>
    </div>;
};

export default CountsIcon;
