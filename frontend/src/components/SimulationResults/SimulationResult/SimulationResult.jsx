import React, { useState, useEffect } from "react";
import "./SimulationResult.scss";
import { FaSortDown } from "react-icons/fa";
import { FaCaretRight } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { formatThousands, formatTime } from "../../../utils/misc-functions";
import ResultNavbar from "./ResultNavbar/ResultNavbar";
import Healing from "./Healing/Healing";
import Buffs from "./Buffs/Buffs";
import Resources from "./Resources/Resources";
import Timeline from "./Timeline/Timeline";
import Cooldowns from "./Cooldowns/Cooldowns";
import Distribution from "./Distribution/Distribution";
import Loadout from "./Loadout/Loadout";

const SimulationResult = ({ simulationResult, setSimulationResults }) => {
    const [expanded, setExpanded] = useState(true);
    const [activeTab, setActiveTab] = useState("Healing");

    const removeSimulationResult = () => {
        setSimulationResults((prevState) =>
            prevState.filter((result) => result !== simulationResult)
        );
    };

    const handleSimulationNameChange = (value) => {
        setSimulationResults((prevState) =>
            prevState.map((result) => {
                if (result === simulationResult) {
                    return {
                        ...result,
                        name: value,
                    };
                } else {
                    return result;
                };
            })
        );
    };

    return (
        <div className="simulation-result">
            <div
                className="result-header"
                onClick={() => setExpanded((prevState) => !prevState)}
            >
                <div className="result-header-left">
                    <div className="result-header-arrow-container arrow-icon">
                        {expanded ? (
                            <FaSortDown
                                className="result-header-arrow"
                                style={{ transform: "translateY(-0.6rem)" }}
                            />
                        ) : (
                            <FaCaretRight className="result-header-arrow" />
                        )}
                    </div>
                    <input
                        className="result-header-simulation-name"
                        value={simulationResult.name}
                        onChange={(e) => handleSimulationNameChange(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.target.blur();
                            };
                        }}
                        onClick={(e) => e.stopPropagation()}
                    ></input>
                </div>

                <div className="result-header-right">
                    <div className="result-header-details">
                        <div className="details-name">
                            <span>Name: </span>
                            <span style={{ color: "var(--paladin-font)" }}>
                                {
                                    simulationResult.simulation_details
                                        .paladin_name
                                }
                            </span>
                        </div>
                        <div className="details-hps">
                            <span>HPS: </span>
                            <span style={{ color: "var(--healing-font)" }}>
                                {formatThousands(
                                    simulationResult.simulation_details
                                        .average_hps
                                )}
                            </span>
                        </div>
                        <div className="details-encounter-length">
                            <span>Length: </span>
                            <span style={{ color: "var(--holy-font)" }}>
                                {formatTime(
                                    simulationResult.simulation_details
                                        .encounter_length
                                )}
                            </span>
                        </div>
                        <div className="details-iterations">
                            <span>Iterations: </span>
                            <span style={{ color: "var(--mana)" }}>
                                {simulationResult.simulation_details.iterations}
                            </span>
                        </div>
                    </div>
                    <div className="result-header-remove-container" onClick={removeSimulationResult}>
                        <FaXmark className="result-header-remove" />
                    </div>
                </div>
            </div>

            {expanded && (
                <div className="result-container">
                    <ResultNavbar activeTab={activeTab} setActiveTab={setActiveTab} />
                    <div className="result-content">
                        {activeTab === "Healing" && <Healing simulationResult={simulationResult} />}
                        {activeTab === "Buffs" && <Buffs simulationResult={simulationResult} />}
                        {activeTab === "Resources" && <Resources simulationResult={simulationResult} />}
                        {activeTab === "Timeline" && <Timeline simulationResult={simulationResult} setSimulationResults={setSimulationResults} />}
                        {activeTab === "Cooldowns" && <Cooldowns simulationResult={simulationResult} />}
                        {activeTab === "Distribution" && <Distribution simulationResult={simulationResult} />}
                        {activeTab === "Loadout" && <Loadout simulationResult={simulationResult} />}
                    </div>
                </div>
            )}
        </div>
    );
};

export default SimulationResult;
