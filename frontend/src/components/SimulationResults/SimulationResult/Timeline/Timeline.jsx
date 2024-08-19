import React from "react";
import "./Timeline.scss";
import HeaderRow from "./HeaderRow/HeaderRow";
import GridRow from "./GridRow/GridRow";

const Timeline = ({ simulationResult, setSimulationResults }) => {
    const headers = ["Time", "Spell", "Resources", "Player Auras", "Target Auras", "Cooldowns", "Counts", "Stats"];

    return (
        <div className="breakdown-container">
            <div className="timeline-grid-container">
                <div className="timeline-header-grid">
                    <HeaderRow headers={headers} />
                </div>
                <div className="timeline-body-grid">
                    {Object.keys(simulationResult.results.priority_breakdown).map((time, index) => (
                        <GridRow 
                            key={index} 
                            time={time} 
                            timelineData={simulationResult.results.priority_breakdown[time]} 
                            simulationResult={simulationResult}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Timeline;