import React, { useContext } from "react";
import "./OverhealingModal.scss";
import OverhealingItem from "./OverhealingItem/OverhealingItem";
import { abilities, trinkets, miscellaneous } from "../../../../../data/overhealing-abilities";
import { SimulationParametersContext } from "../../../../../context/SimulationParametersContext";

const OverhealingModal = ({ isOpen }) => {
    if (!isOpen) return;

    const { simulationParameters, setSimulationParameters } = useContext(SimulationParametersContext);

    abilities.forEach((ability) => {
        if (!simulationParameters.overhealing[ability]) {
            simulationParameters.overhealing[ability] = 0;
        };
    });

    trinkets.forEach((ability) => {
        if (!simulationParameters.overhealing[ability]) {
            simulationParameters.overhealing[ability] = 0;
        };
    });

    miscellaneous.forEach((ability) => {
        if (!simulationParameters.overhealing[ability]) {
            simulationParameters.overhealing[ability] = 0;
        };
    });

    return <div className="overhealing-modal">
        <div className="overhealing-modal-content">
            <div className="overhealing-abilities">
                <div className="overhealing-header">Abilities</div>
                <div className="overhealing-divider"></div>
                {abilities.map((ability, index) => {
                    return <OverhealingItem key={index} ability={ability} simulationParameters={simulationParameters} setSimulationParameters={setSimulationParameters} />;
                })}
            </div>
            <div className="overhealing-abilities">
                <div className="overhealing-header">Trinkets</div>
                <div className="overhealing-divider"></div>
                {trinkets.map((ability, index) => {
                    return <OverhealingItem key={index} ability={ability} simulationParameters={simulationParameters} setSimulationParameters={setSimulationParameters} />;
                })}
            </div>
            <div className="overhealing-abilities">
                <div className="overhealing-header">Miscellaneous</div>
                <div className="overhealing-divider"></div>
                {miscellaneous.map((ability, index) => {
                    return <OverhealingItem key={index} ability={ability} simulationParameters={simulationParameters} setSimulationParameters={setSimulationParameters} />;
                })}
            </div>
        </div>
    </div>;
};

export default OverhealingModal;
