import React from "react";
import "./LoadoutPriorityList.scss";
import LoadoutPriorityListItem from "./LoadoutPriorityListItem/LoadoutPriorityListItem";

const LoadoutPriorityList = ({ priorityList }) => {
    return <div className="loadout-container">
        <div className="loadout-header">Priority List</div>
        <div className="loadout-priority-list">
            {priorityList.map((item, index) => {
                const parts = item.split("|");
                const abilityName = parts[0].trim();
                const conditions = item.replace(abilityName, "").replaceAll("| ", "");
                return <LoadoutPriorityListItem key={index} abilityName={abilityName} conditions={conditions} />
            })}
        </div>
    </div>
};

export default LoadoutPriorityList;
