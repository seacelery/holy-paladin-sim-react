import React, { useState } from "react";
import "./Buffs.scss";
import SelfBuffsTable from "./BuffsTable/SelfBuffsTable";
import TargetBuffsTable from "./BuffsTable/TargetBuffsTable";
import GraphBuffs from "../GraphBuffs/GraphBuffs";

const Buffs = ({ simulationResult }) => {
    const [activeTab, setActiveTab] = useState("Awakening")
    const tyrsDeliveranceData = simulationResult.results.tyrs_counts;
    const awakeningData = simulationResult.results.awakening_counts;
    const awakeningTriggersData = simulationResult.results.awakening_triggers;

    return <div className="breakdown-container" style={{ display: "flex" }}>
        <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="buffs-breakdown-container">
                <div className="buffs-breakdown-tab" style={{ color: "var(--paladin-font)" }}>{simulationResult.simulation_details.paladin_name}</div>
                <SelfBuffsTable simulationResult={simulationResult} />
            </div>
            
            <div className="buffs-breakdown-container">
                <div className="buffs-breakdown-tab">Targets</div>
                <TargetBuffsTable simulationResult={simulationResult} />

                <div className="buffs-graph-container">
                    <div className="buffs-graph-navbar">
                        <div className={`buffs-graph-tab ${activeTab === "Awakening" ? "active" : ""}`} onClick={() => setActiveTab("Awakening")}>Awakening</div>
                        <div className={`buffs-graph-tab ${activeTab === "Tyr's Deliverance" ? "active" : ""}`} onClick={() => setActiveTab("Tyr's Deliverance")}>Tyr's Deliverance</div>
                    </div>
                    <div className="buffs-graph-content">
                        {activeTab === "Awakening" && (
                            <GraphBuffs 
                                data={awakeningData} 
                                title="Awakening" 
                                colour="var(--holy-font)" 
                                awakening={true} 
                                awakeningTriggers={awakeningTriggersData} 
                                encounterLength={simulationResult.simulation_details.encounter_length}
                            />
                        )}
                        {activeTab === "Tyr's Deliverance" && (
                            <GraphBuffs 
                                data={tyrsDeliveranceData} 
                                title="Tyr's Deliverance" 
                                colour="var(--holy-font)" 
                            />
                        )}
                    </div>
                    
                </div>
                
            </div>
        </div>
        
    </div>;
};

export default Buffs;
