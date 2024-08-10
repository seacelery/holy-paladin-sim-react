import React, { useState, useEffect, useContext } from "react";
import "./OverhealingModal.scss";
import OverhealingItem from "./OverhealingItem/OverhealingItem";
import { abilities, trinkets, miscellaneous, convertAbilitiesToString, convertStringToAbilities } from "../../../../../data/overhealing-abilities";
import { SimulationParametersContext } from "../../../../../context/SimulationParametersContext";
import { FaCopy } from "react-icons/fa6";
import { FaPaste } from "react-icons/fa6";
import Button from "../../../../Button/Button";
import Notification from "../../../../Notification/Notification";

const OverhealingModal = ({ isOpen }) => {
    const { simulationParameters, setSimulationParameters } = useContext(SimulationParametersContext);
    
    const [pasteModalOpen, setPasteModalOpen] = useState(false);
    const [pasteModalText, setPasteModalText] = useState(convertAbilitiesToString(simulationParameters.overhealing));
    const [notificationVisible, setNotificationVisible] = useState(false);

    useEffect(() => {
        setPasteModalText(convertAbilitiesToString(simulationParameters.overhealing));
    }, [simulationParameters.overhealing]);

    useEffect(() => {
        abilities.forEach((ability) => {
            if (!simulationParameters.overhealing[ability]) {
                setSimulationParameters((prev) => ({
                    ...prev,
                    overhealing: {
                        ...prev.overhealing,
                        [ability]: 0,
                    },
                }));
            };
        });

        trinkets.forEach((ability) => {
            if (!simulationParameters.overhealing[ability]) {
                setSimulationParameters((prev) => ({
                    ...prev,
                    overhealing: {
                        ...prev.overhealing,
                        [ability]: 0,
                    },
                }));
            };
        });

        miscellaneous.forEach((ability) => {
            if (!simulationParameters.overhealing[ability]) {
                setSimulationParameters((prev) => ({
                    ...prev,
                    overhealing: {
                        ...prev.overhealing,
                        [ability]: 0,
                    },
                }));
            };
        });
    }, []);

    const handleSaveClick = () => {
        const convertedString = convertStringToAbilities(pasteModalText);

        setSimulationParameters((prev) => ({
            ...prev,
            overhealing: convertedString,
        }));

        setPasteModalOpen(false);
    };

    const copyOverhealingPercentages = () => {
        navigator.clipboard.writeText(pasteModalText).then(() => {
            console.log("Overhealing percentages copied to clipboard");
            setNotificationVisible(true);
            setTimeout(() => {
                setNotificationVisible(false);
            }, 3000);

            setPasteModalOpen(false);
        }).catch(error => {
            console.error("Failed to copy overhealing percentages to clipboard: ", error);
        });
    };

    if (!isOpen) return null;

    return <div className="overhealing-modal">
        <Notification notificationMessage="Overhealing percentages copied!" width="25rem" height="3.5rem" fontSize="1.4rem" notificationVisible={notificationVisible} />

        <div className="overhealing-modal-content">
            <div className="overhealing-abilities">
                <div className="overhealing-header">
                    {!pasteModalOpen 
                        ? <span>Abilities</span>
                        : <Button width="6rem" height="3rem" fontSize="1.6rem" onClick={handleSaveClick} grow={true}>Save</Button>
                    }
                    
                    <div className="overhealing-header-icons">
                        <FaCopy className="overhealing-header-icon overhealing-copy-icon" onClick={copyOverhealingPercentages} />
                        <FaPaste className={`overhealing-header-icon ${pasteModalOpen ? "overhealing-header-icon-selected" : ""}`} onClick={() => setPasteModalOpen(prevState => !prevState)}/>
                    </div>
                </div>
                <div className="overhealing-divider"></div>
                {!pasteModalOpen 
                    ? abilities.map((ability, index) => {
                        return <OverhealingItem key={index} ability={ability} simulationParameters={simulationParameters} setSimulationParameters={setSimulationParameters} />;
                    })
                    : <div className="overhealing-paste-modal">
                        <textarea className="overhealing-paste-modal-textarea" value={pasteModalText} onChange={(e) => setPasteModalText(e.target.value)}></textarea>
                    </div>
                }
                
            </div>
            {!pasteModalOpen && ( 
                <>
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
                </>
            )} 
        </div>
    </div>;
};

export default OverhealingModal;
