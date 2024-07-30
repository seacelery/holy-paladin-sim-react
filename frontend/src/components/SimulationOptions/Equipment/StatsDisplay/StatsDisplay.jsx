import React from "react";
import "./StatsDisplay.scss";
import StatPanel from "./StatPanel/StatPanel";

const StatsDisplay = ({ statsData }) => {
    return <div className="stats-display">
        <div className="stats-display-row">
            <StatPanel statName="Intellect" statRating={statsData.intellect} statPercentage={null} statColour={"var(--stat-intellect)"}/>
            <StatPanel statName="Leech" statRating={statsData.leech} statPercentage={statsData.leech_percent} statColour={"var(--stat-leech)"}/>
            <StatPanel statName="Health" statRating={statsData.health} statPercentage={null} statColour={"var(--stat-health)"}/>
            <StatPanel statName="Mana" statRating={statsData.mana} statPercentage={null} statColour={"var(--mana)"}/>
        </div>

        <div className="stats-display-row">
            <StatPanel statName="Haste" statRating={statsData.haste} statPercentage={statsData.haste_percent} statColour={"var(--stat-haste)"}/>
            <StatPanel statName="Critical Strike" statRating={statsData.crit} statPercentage={statsData.crit_percent} statColour={"var(--stat-crit)"}/>
            <StatPanel statName="Mastery" statRating={statsData.mastery} statPercentage={statsData.mastery_percent} statColour={"var(--stat-mastery)"}/>
            <StatPanel statName="Versatility" statRating={statsData.versatility} statPercentage={statsData.versatility_percent} statColour={"var(--stat-versatiility)"}/>
        </div>
    </div>;
};

export default StatsDisplay;
