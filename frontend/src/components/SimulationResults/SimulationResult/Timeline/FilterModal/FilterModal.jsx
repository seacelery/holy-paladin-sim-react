import React from "react";
import "./FilterModal.scss";
import { buffsToIconsMap } from "../../../../../utils/buffs-to-icons-map";
import { spellToIconsMap } from "../../../../../utils/spell-to-icons-map";

const FilterModal = ({ type, names, filteredNames, setFilteredNames }) => {
    const handleIconClick = (e, name) => {
        e.stopPropagation();
        setFilteredNames(prev => {
            if (prev.includes(name)) {
                return prev.filter(aura => aura !== name);
            } else {
                return [...prev, name];
            };
        });
    };

    return <div className={`filter-modal ${type}-filter-modal`}>
        {names.map((name, index) => {
            const icon = type === "auras" ? buffsToIconsMap[name] : spellToIconsMap[name];
            return <div key={index} className="filter-modal-icon-container" onClick={(e) => handleIconClick(e, name)} style={{ filter: filteredNames.includes(name) ? "grayscale(1)" : "grayscale(0)" }}>
                <img className="filter-modal-icon" src={icon} />
            </div>
        })}
    </div>;
};

export default FilterModal;
