import React, { useState, useContext } from "react";
import "./PriorityList.scss";
import { FaListUl } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";
import { FaPaste } from "react-icons/fa6";
import { FaCircleQuestion } from "react-icons/fa6";
import PriorityListItems from "./PriorityListItems/PriorityListItems";
import PresetsModal from "./PresetsModal/PresetsModal";
import PasteModal from "./PasteModal/PasteModal";
import { SimulationParametersContext } from "../../../context/SimulationParametersContext";

const PriorityList = () => {
    const { simulationParameters, setSimulationParameters } = useContext(SimulationParametersContext);
    const [modalOpen, setModalOpen] = useState(null);

    const handleClick = (modalName) => {
        setModalOpen(modalOpen === modalName ? null : modalName);
    };

    return <div className="options-tab-content priority-list-content">
        <div className="priority-list-container">
            <div className="priority-list-headers">
                <div className="priority-list-header-ability">Ability</div>
                <div className="priority-list-header-conditions">Conditions</div>

                <div className="priority-list-info">
                    <div className={`priority-list-info-icon ${modalOpen === "presets" ? "priority-list-icon-selected" : ""}`} onClick={() => handleClick("presets")}>
                        <FaListUl />
                    </div>
                    
                    <div className="priority-list-info-icon">
                        <FaCopy className="priority-list-copy-icon" />
                    </div>
                    
                    <div className={`priority-list-info-icon ${modalOpen === "paste" ? "priority-list-icon-selected" : ""}`} onClick={() => handleClick("paste")}>
                        <FaPaste />
                    </div>
                    
                    <div className={`priority-list-info-icon ${modalOpen === "info" ? "priority-list-icon-selected" : ""}`} onClick={() => handleClick("info")}>
                        <FaCircleQuestion />
                    </div>
                </div>

                {modalOpen === "presets" &&
                    <PresetsModal setSimulationParameters={setSimulationParameters} />
                }
                {modalOpen === "paste" &&
                    <PasteModal simulationParameters={simulationParameters} setSimulationParameters={setSimulationParameters} setModalOpen={setModalOpen} />
                }
            </div>

            <PriorityListItems simulationParameters={simulationParameters} setSimulationParameters={setSimulationParameters} />
        </div>
    </div>;
};

export default PriorityList;
