import React from "react";
import "./Healing.scss";
import GraphHealing from "../GraphHealing/GraphHealing";
import HealingTable from "./HealingTable/HealingTable";

const Healing = ({ simulationResult }) => {
    const healingTimeline = simulationResult.results.healing_timeline;
    const manaTimeline = simulationResult.results.mana_timeline;

    return <div className="breakdown-container">
        <GraphHealing 
            healingData={healingTimeline} 
            manaData={manaTimeline} 
            title="Healing" 
            colour="var(--healing-font)"
        />
        <HealingTable simulationResult={simulationResult} />
    </div>;
};

export default Healing;
