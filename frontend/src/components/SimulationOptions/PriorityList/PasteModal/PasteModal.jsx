import React, { useState, useEffect } from "react";
import "./PasteModal.scss";
import Button from "../../../Button/Button";
import { convertStringToPriorityList, convertPriorityListToString } from "../../../../data/presets";

const PasteModal = ({ simulationParameters, setSimulationParameters, setModalOpen }) => {
    const [textareaValue, setTextareaValue] = useState(convertPriorityListToString(simulationParameters.priorityList));

    useEffect(() => {
        setTextareaValue(convertPriorityListToString(simulationParameters.priorityList));
    }, [simulationParameters.priorityList]);

    const handleSave = () => {
        setSimulationParameters((prevSimulationParameters) => {
            const newSimulationParameters = { ...prevSimulationParameters };
            newSimulationParameters.priorityList = convertStringToPriorityList(textareaValue);
            return newSimulationParameters;
        });

        setModalOpen(null);
    };

    return <div className="paste-modal">
        <div className="paste-modal-header">
            Paste your priority list
            <Button width="6rem" height="3.5rem" fontSize="1.7rem" grow={true} customClassName="paste-modal-button" onClick={handleSave}>Save</Button>
        </div>
        <textarea className="paste-modal-textarea" placeholder="Paste your priority list here..." value={textareaValue} onChange={(e) => setTextareaValue(e.target.value)}/>
    </div>;
};

export default PasteModal;
