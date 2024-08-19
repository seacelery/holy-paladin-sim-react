import React from "react";
import "./CooldownIcon.scss";
import { spellToIconsMap } from "../../../../../../utils/spell-to-icons-map";
import { formatFixedNumber, formatTime } from "../../../../../../data/breakdown-functions";

const CooldownIcon = ({ spellName, cooldownData }) => {
    const formatCooldown = (cooldown) => {
        if (cooldown <= 0) {
            return "";
        } else if (cooldown >= 60) {
            return formatTime(cooldownData.remaining_cooldown);
        } else {
            return formatFixedNumber(cooldown, 1);
        };
    };

    const progressPercentage = (cooldownData.remaining_cooldown / cooldownData.base_cooldown) * 100;
    const overlayStyle = {
        background: `conic-gradient(rgba(0, 0, 0, 0.5) ${progressPercentage}%, transparent ${progressPercentage}%)`,
        transform: "scaleX(-1)"
    };

    return <div className="timeline-aura-icon-container">
        <div className="timeline-aura-icon-overlay">
            <img className="timeline-aura-icon" src={spellToIconsMap[spellName]} alt={spellName}></img>
            <div className="timeline-aura-duration-overlay" style={overlayStyle}></div>
        </div>
        <div className="timeline-aura-stacks-text">{cooldownData.max_charges > 1 ? cooldownData.current_charges : ""}</div>
        <div className="timeline-aura-duration-text">{formatCooldown(cooldownData.remaining_cooldown)}</div>
    </div>;
};

export default CooldownIcon;
