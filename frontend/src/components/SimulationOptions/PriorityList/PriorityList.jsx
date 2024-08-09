import React, { useState, useContext } from "react";
import "./PriorityList.scss";
import { FaListUl } from "react-icons/fa6";
import { FaCopy } from "react-icons/fa6";
import { FaPaste } from "react-icons/fa6";
import { FaCircleQuestion } from "react-icons/fa6";
import PriorityListItems from "./PriorityListItems/PriorityListItems";
import PresetsModal from "./PresetsModal/PresetsModal";
import PasteModal from "./PasteModal/PasteModal";
import InfoModal from "./InfoModal/InfoModal";
import { SimulationParametersContext } from "../../../context/SimulationParametersContext";
import { convertPriorityListToString } from "../../../data/presets";
import Notification from "../../Notification/Notification";

const PriorityList = () => {
    const { simulationParameters, setSimulationParameters } = useContext(SimulationParametersContext);
    const [modalOpen, setModalOpen] = useState(null);
    const [notificationVisible, setNotificationVisible] = useState(false);

    const handleClick = (modalName) => {
        setModalOpen(modalOpen === modalName ? null : modalName);
    };

    const copyPriorityList = () => {
        navigator.clipboard.writeText(convertPriorityListToString(simulationParameters.priorityList)).then(() => {
            console.log("Priority list copied to clipboard");
            setNotificationVisible(true);
            setTimeout(() => {
                setNotificationVisible(false);
            }, 3000);

            if (modalOpen === "paste") {
                setModalOpen(null);
            };
        }).catch(error => {
            console.error("Failed to copy priority list to clipboard: ", error);
        });
    };

    return <div className="options-tab-content priority-list-content">
        <Notification notificationVisible={notificationVisible} notificationMessage="Priority list copied!" width="18rem" fontSize="1.6rem"></Notification>

        <div className="priority-list-container">
            <div className="priority-list-headers">
                <div className="priority-list-header-ability">Ability</div>
                <div className="priority-list-header-conditions">Conditions</div>

                <div className="priority-list-info">
                    <div className={`priority-list-info-icon ${modalOpen === "presets" ? "priority-list-icon-selected" : ""}`} onClick={() => handleClick("presets")}>
                        <FaListUl />
                    </div>
                    
                    <div className="priority-list-info-icon" onClick={copyPriorityList}>
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
                {modalOpen === "info" &&
                    <InfoModal />
                }
            </div>

            <PriorityListItems simulationParameters={simulationParameters} setSimulationParameters={setSimulationParameters} />
        </div>
    </div>;
};

export default PriorityList;
