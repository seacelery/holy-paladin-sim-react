import React, { useContext } from "react";
import "./PriorityListItems.scss";
import PriorityListItem from "./PriorityListItem/PriorityListItem";
import { SimulationParametersContext } from "../../../../context/SimulationParametersContext";

const PriorityListItems = () => {
    const { simulationParameters, setSimulationParameters } = useContext(SimulationParametersContext);
    const priorityList = simulationParameters.priorityList;

    return <div className="priority-list-items">
        {priorityList.map((priorityListItem, index) => {
            return <PriorityListItem key={index} text={priorityListItem} />
        })}
    </div>;
};

export default PriorityListItems;
