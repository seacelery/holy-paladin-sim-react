import React from "react";
import "./Loadout.scss";
import LoadoutTalents from "./LoadoutTalents/LoadoutTalents";
import LoadoutEquipment from "./LoadoutEquipment/LoadoutEquipment";
import LoadoutPriorityList from "./LoadoutPriorityList/LoadoutPriorityList";

const Loadout = ({ simulationResult }) => {
    const talents = simulationResult.simulation_details.talents;
    const equipment = simulationResult.simulation_details.equipment;
    const priorityList = simulationResult.simulation_details.priority_list;

    return <div className="breakdown-container">
        <div className="loadout-breakdown-container">
            <LoadoutTalents talents={talents} />
            <LoadoutEquipment equipment={equipment} />
            <LoadoutPriorityList priorityList={priorityList} />
        </div>
    </div>;
};

export default Loadout;
