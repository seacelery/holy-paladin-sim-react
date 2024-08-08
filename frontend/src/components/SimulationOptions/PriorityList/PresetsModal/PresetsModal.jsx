import React from "react";
import "./PresetsModal.scss";
import { presets, convertStringToPriorityList } from "../../../../data/presets";

const PresetsModal = ({ setSimulationParameters }) => {
    const handleButtonClick = (preset) => {
        setSimulationParameters((prevSimulationParameters) => {
            const newSimulationParameters = { ...prevSimulationParameters };
            newSimulationParameters.priorityList = convertStringToPriorityList(preset.priorityList);
            return newSimulationParameters;
        });
    };

    const handlePriorityListReset = () => {
        setSimulationParameters((prevSimulationParameters) => {
            const newSimulationParameters = { ...prevSimulationParameters };
            newSimulationParameters.priorityList = [""];
            return newSimulationParameters;
        });
    };

    return <div className="presets-modal">
        <div className="presets-modal-header">Presets</div>
        <div className="presets-modal-content">
            {presets.map((preset, index) => {
                return <div key={index} className="presets-modal-button" onClick={() => handleButtonClick(preset)}>{preset.name}</div>;
            })}
            <div className="presets-modal-reset" onClick={handlePriorityListReset}>Reset Priority List</div>
        </div>
    </div>;
};

export default PresetsModal;
