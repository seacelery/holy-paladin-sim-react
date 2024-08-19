import React from "react";
import "./AuraIcon.scss";
import { buffsToIconsMap } from "../../../../../../utils/buffs-to-icons-map";
import { formatFixedNumber } from "../../../../../../data/breakdown-functions";

const AuraIcon = ({ buffName, buffData }) => {
    const formatBuffDuration = (duration) => {
        if (duration > 1000) {
            return "";
        };
        return formatFixedNumber(duration, 1);
    };

    const progressPercentage = 100 - (buffData.duration / buffData.applied_duration) * 100;
    const overlayStyle = {
        background: `conic-gradient(rgba(0, 0, 0, 0.5) ${progressPercentage}%, transparent ${progressPercentage}%)`
    };

    return <div className="timeline-aura-icon-container">
        <div className="timeline-aura-icon-overlay">
            <img className="timeline-aura-icon" src={buffsToIconsMap[buffName]} alt={buffName}></img>
            <div className="timeline-aura-duration-overlay" style={overlayStyle}></div>
        </div>
        <div className="timeline-aura-stacks-text">{buffData.stacks > 1 ? buffData.stacks : ""}</div>
        <div className="timeline-aura-duration-text">{formatBuffDuration(buffData.duration)}</div>
    </div>;
};

export default AuraIcon;
