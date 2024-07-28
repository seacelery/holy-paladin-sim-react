import React from "react";
import "./StatsDisplay.scss";
import StatPanel from "./StatPanel/StatPanel";

const StatsDisplay = ({ statsData }) => {

    console.log(statsData)
    return <div className="stats-display">
        <div className="stats-display-row">
            <StatPanel statName="Intellect" statRating={statsData.intellect} statPercentage={null} />
            <StatPanel statName="Leech" statRating={statsData.leech} statPercentage={statsData.leech_percent} />
            <StatPanel statName="Health" statRating={statsData.health} statPercentage={null} />
            <StatPanel statName="Mana" statRating={statsData.mana} statPercentage={null} />
        </div>

        <div className="stats-display-row">
            <StatPanel statName="Critical Strike" statRating={statsData.crit} statPercentage={statsData.crit_percent} />
            <StatPanel statName="Haste" statRating={statsData.haste} statPercentage={statsData.haste_percent} />
            <StatPanel statName="Mastery" statRating={statsData.mastery} statPercentage={statsData.mastery_percent} />
            <StatPanel statName="Versatility" statRating={statsData.versatility} statPercentage={statsData.versatility_percent} />
        </div>
    </div>;
};

export default StatsDisplay;
