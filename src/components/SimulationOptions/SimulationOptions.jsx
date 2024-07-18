import React from "react";
import Options from "./Options/Options";
import Talents from "./Talents/Talents";
import Equipment from "./Equipment/Equipment";
import BuffsAndConsumables from "./BuffsAndConsumables/BuffsAndConsumables";
import PriorityList from "./PriorityList/PriorityList";


const SimulationOptions = () => {
    return <div>
        <Options />
        <Talents />
        <Equipment />
        <BuffsAndConsumables />
        <PriorityList />
    </div>;
};

export default SimulationOptions;
