import React from "react";
import "./StatPanel.scss";

const StatPanel = ({ statName, statRating, statPercentage, statColour }) => {
    return <div className="stat-panel">
        <div className="stat-panel-label" style={{color: statColour}}>{statName}</div>
        <div className="stat-panel-value" style={{color: statColour}}>{statRating} {statPercentage !== null ? `/ ${statPercentage.toFixed(2)}%` : ""}</div>
    </div>;
};

export default StatPanel;
