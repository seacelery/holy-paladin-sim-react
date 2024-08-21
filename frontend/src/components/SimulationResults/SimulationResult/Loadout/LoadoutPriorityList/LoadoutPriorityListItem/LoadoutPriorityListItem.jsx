import React from "react";
import "./LoadoutPriorityListItem.scss";
import { spellToIconsMap } from "../../../../../../utils/spell-to-icons-map";

const LoadoutPriorityListItem = ({ abilityName, conditions }) => {
    return <div className="loadout-priority-list-item">
        <img className="loadout-priority-list-item-icon" src={spellToIconsMap[abilityName]} alt={abilityName} />
        <div className="loadout-priority-list-item-name" style={{ marginTop: abilityName.length > 20 ? "-0.1rem" : "" }}>{abilityName}</div>
        <div className="loadout-priority-list-item-conditions">{conditions}</div>
    </div>;
};

export default LoadoutPriorityListItem;
