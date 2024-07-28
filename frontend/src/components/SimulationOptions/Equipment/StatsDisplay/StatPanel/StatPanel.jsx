import React from "react";
import "./StatPanel.scss";

const StatPanel = ({ statName, statRating, statPercentage}) => {
    return <div className="stat-panel">
        <div className="stat-panel-label" style={{color: `var(--stat-${statName.toLowerCase()})`}}>{statName}</div>
        <div className="stat-panel-value" style={{color: `var(--stat-${statName.toLowerCase()})`}}>{statRating} {statPercentage ? `/ ${statPercentage}%` : ""}</div>
    </div>;
};

export default StatPanel;
