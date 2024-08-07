import React, { useState, useEffect } from "react";
import "./PriorityListItem.scss";
import PriorityListAbility from "./PriorityListAbility/PriorityListAbility";
import PriorityListCondition from "./PriorityListCondition/PriorityListCondition";
import PriorityListButtons from "./PriorityListButtons/PriorityListButtons";
import { spellToIconsMap } from "../../../../../utils/spell-to-icons-map";
import { FaGrip } from "react-icons/fa6";

const PriorityListItem = ({ index, text, setSimulationParameters }) => {
    const [buttonsDisplayed, setButtonsDisplayed] = useState(false);
    const [textParts, setTextParts] = useState(text.split("|").map((part) => part.trim()));
    
    useEffect(() => {
        setSimulationParameters((prevSimulationParameters) => {
            const newSimulationParameters = { ...prevSimulationParameters };
            newSimulationParameters.priorityList[index] = textParts.join(" | ");
            return newSimulationParameters;
        });
    }, [textParts]);

    return <div className="priority-list-item-container" onMouseOver={() => setButtonsDisplayed(true)} onMouseOut={() => setButtonsDisplayed(false)} >
        <div className="priority-list-item-number priority-list-button">{index}</div>
        <div className="priority-list-item-icon-container">
            <img className="priority-list-item-icon" src={spellToIconsMap[textParts[0].trim()]} alt="icon" />
        </div>
        <PriorityListAbility text={textParts[0].trim()} setTextParts={setTextParts} />
        <PriorityListCondition text={textParts[1].trim()} setTextParts={setTextParts} index={1} />
        {textParts.slice(2).map((part, index) => {
            if (part.toLowerCase().trim() === "and") {
                return <div key={index} className="priority-list-item-and-button priority-list-button">{part.toUpperCase().trim()}</div>;
            } else if (part.toLowerCase().trim() === "or") {
                return <div key={index} className="priority-list-item-or-button priority-list-button">{part.toUpperCase().trim()}</div>;
            } else {
                return <PriorityListCondition key={index} text={part.trim()} setTextParts={setTextParts} index={index + 2} />;
            };
        })}
        {buttonsDisplayed && (
            <>
                <PriorityListButtons textParts={textParts} setTextParts={setTextParts} />
                <div className="priority-list-item-handle">
                    <FaGrip style={{ color: "var(--panel-colour-4)", fontSize: "2.6rem" }} />
                </div>
            </>
        )}
    </div>;
};

export default PriorityListItem;
