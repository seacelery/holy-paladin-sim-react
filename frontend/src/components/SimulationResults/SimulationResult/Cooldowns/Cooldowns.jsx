import React from "react";
import "./Cooldowns.scss";
import Cooldown from "./Cooldown/Cooldown";

const Cooldowns = ({ simulationResult }) => {
    const cooldownsData = simulationResult.results.cooldowns_breakdown;

    return <div className="breakdown-container">
        <div className="cooldowns-breakdown-container">
            {Object.keys(cooldownsData).map((cooldown, index) => {
                return <Cooldown key={index} cooldown={cooldown} cooldownData={cooldownsData[cooldown]} />;
            })}
        </div>
    </div>;
};

export default Cooldowns;
