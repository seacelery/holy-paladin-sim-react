import React from "react";
import "./HeaderRow.scss";
import FilterModal from "../FilterModal/FilterModal";
import { FaWandSparkles } from "react-icons/fa6";
import { FaRegHourglass } from "react-icons/fa6";

const HeaderRow = ({ headers, filterModalOpen, setFilterModalOpen, allAuras, filteredAuras, setFilteredAuras, allCooldowns, filteredCooldowns, setFilteredCooldowns }) => {
    const handleButtonClick = (filterModal) => {
        setFilterModalOpen(filterModalOpen === filterModal ? null : filterModal);
    };

    return <>
        {headers.map((header, index) => {
            if (header === "Player Auras") {
                return <div key={index} className="timeline-header-cell">
                    {header}
                    <div className="timeline-player-auras-button" onClick={() => handleButtonClick("Player Auras")}>
                        <FaWandSparkles />
                        {filterModalOpen === "Player Auras" && <FilterModal type="auras" names={allAuras} filteredNames={filteredAuras} setFilteredNames={setFilteredAuras} />}
                    </div>
                </div>
            } else if (header === "Cooldowns") {
                return <div key={index} className="timeline-header-cell">
                    {header}
                    <div className="timeline-cooldowns-button" onClick={() => handleButtonClick("Cooldowns")}>
                        <FaRegHourglass />
                        {filterModalOpen === "Cooldowns" && <FilterModal type="cooldowns" names={allCooldowns} filteredNames={filteredCooldowns} setFilteredNames={setFilteredCooldowns} />}
                    </div>
                </div>
            } else {
                return <div key={index} className="timeline-header-cell">
                    {header}
                </div>
            };
        })}
    </>;
};

export default HeaderRow;
