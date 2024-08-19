import React from "react";
import "./HeaderRow.scss";
import FilterModal from "../FilterModal/FilterModal";

const HeaderRow = ({ headers, filterModalOpen, setFilterModalOpen, allAuras, filteredAuras, setFilteredAuras }) => {
    const handleButtonClick = (filterModal) => {
        setFilterModalOpen(filterModalOpen === filterModal ? null : filterModal);
    };

    return <>
        {headers.map((header, index) => {
            if (header === "Player Auras") {
                return <div key={index} className="timeline-header-cell">
                    {header}
                    <div className="timeline-player-auras-button" onClick={() => handleButtonClick("Player Auras")}>
                        {filterModalOpen === "Player Auras" && <FilterModal type="auras" names={allAuras} />}
                    </div>
                </div>
            } else if (header === "Cooldowns") {
                return <div key={index} className="timeline-header-cell">
                    {header}
                    <div className="timeline-cooldowns-button" onClick={() => handleButtonClick("Cooldowns")}>
                        {filterModalOpen === "Cooldowns" && <FilterModal type="cooldowns" />}
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
