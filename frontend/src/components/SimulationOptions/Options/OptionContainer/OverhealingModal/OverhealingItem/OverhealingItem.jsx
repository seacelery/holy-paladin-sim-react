import React, { useState } from "react";
import "./OverhealingItem.scss";
import { spellToIconsMap } from "../../../../../../utils/spell-to-icons-map";

const OverhealingItem = ({ ability, simulationParameters, setSimulationParameters }) => {

    const [overhealingValue, setOverhealingValue] = useState(
        simulationParameters.overhealing[ability] || 0
    );

    const updateOverhealingValue = (value) => {
        const newOverhealing = {
            ...simulationParameters.overhealing,
            [ability]: value
        };

        setSimulationParameters({
            ...simulationParameters,
            overhealing: newOverhealing
        });
    };

    return (
        <div className="overhealing-item">
            <img
                className="overhealing-item-icon"
                src={spellToIconsMap[ability]}
                alt={ability}
            />
            <div className="overhealing-item-text">{ability}</div>
            <div className="overhealing-item-input-container">
                <input
                    className="overhealing-item-input"
                    value={overhealingValue}
                    onChange={(e) => setOverhealingValue(e.target.value)}
                    onBlur={() => updateOverhealingValue(overhealingValue)}
                ></input>
                <span className="overhealing-item-percentage">%</span>
            </div>
        </div>
    );
};

export default OverhealingItem;
