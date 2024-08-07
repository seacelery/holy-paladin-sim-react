import React from "react";
import "./PriorityListItem.scss";
import PriorityListAbility from "./PriorityListAbility/PriorityListAbility";
import PriorityListCondition from "./PriorityListCondition/PriorityListCondition";
import { spellToIconsMap } from "../../../../../utils/spell-to-icons-map";

const PriorityListItem = ({ text }) => {

    const parts = text.split("|");

    return <div className="priority-list-item-container">
        <div className="priority-list-item-number priority-list-button"></div>
        <div className="priority-list-item-icon-container">
            <img className="priority-list-item-icon" src={spellToIconsMap[parts[0].trim()]} alt="icon" />
        </div>
        <PriorityListAbility text={parts[0].trim()} />
        <PriorityListCondition text={parts[1].trim()} />
        {parts.slice(2).map((part, index) => {
            if (part.toLowerCase().trim() === "and") {
                return <div key={index} className="priority-list-item-and-button priority-list-button">{part.toUpperCase().trim()}</div>;
            } else if (part.toLowerCase().trim() === "or") {
                return <div key={index} className="priority-list-item-or-button priority-list-button">{part.toUpperCase().trim()}</div>;
            } else {
                return <PriorityListCondition key={index} text={part.trim()} />;
            };
        })}
    </div>;
};

export default PriorityListItem;
