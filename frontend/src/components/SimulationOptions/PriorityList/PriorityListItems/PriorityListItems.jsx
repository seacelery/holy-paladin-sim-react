import React from "react";
import "./PriorityListItems.scss";
import PriorityListItem from "./PriorityListItem/PriorityListItem";

const PriorityListItems = ({ simulationParameters, setSimulationParameters }) => {
    const priorityList = simulationParameters.priorityList;

    return <div className="priority-list-items">
        {priorityList.map((priorityListItem, index) => {
            return <PriorityListItem key={index} index={index} text={priorityListItem} priorityList={priorityList} setSimulationParameters={setSimulationParameters} />
        })}
    </div>;
};

export default PriorityListItems;
