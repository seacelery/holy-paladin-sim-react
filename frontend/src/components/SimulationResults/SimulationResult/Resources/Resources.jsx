import React, { useState } from "react";
import "./Resources.scss";
import ManaTable from "./ResourcesTable/ManaTable";
import HolyPowerTable from "./ResourcesTable/HolyPowerTable";
import GraphResource from "../GraphResource/GraphResource";

const Resources = ({ simulationResult }) => {
    const manaData = simulationResult.results.mana_timeline;
    const holyPowerData = simulationResult.results.holy_power_timeline;

    return <div className="breakdown-container" style={{ display: "flex" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="resources-breakdown-container">
                <div className="resources-graph-container">
                    <div className="resources-graph-content">
                        <GraphResource data={manaData} title="Mana" colour="var(--mana)" />
                    </div>
                </div>

                <ManaTable simulationResult={simulationResult} />
            </div>
            
            <div className="resources-breakdown-container">

                <div className="resources-graph-container">
                    <div className="resources-graph-content">
                        <GraphResource data={holyPowerData} title="Holy Power" colour="var(--holy-font)" />
                    </div>                  
                </div>
                
                <HolyPowerTable simulationResult={simulationResult} />
            </div>
        </div>
        
    </div>;
};

export default Resources;
