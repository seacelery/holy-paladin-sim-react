import React from "react";
import "./FilterModal.scss";
import { buffsToIconsMap } from "../../../../../utils/buffs-to-icons-map";
import { spellToIconsMap } from "../../../../../utils/spell-to-icons-map";

const FilterModal = ({ type, names }) => {
    return <div className="filter-modal">
        {names.map((name, index) => {
            const icon = type === "auras" ? buffsToIconsMap[name] : spellToIconsMap[name];
            return <div key={index} className="filter-modal-row">
                <img className="filter-modal-icon" src={icon} />
            </div>
        })}
    </div>;
};

export default FilterModal;
