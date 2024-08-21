import React from "react";
import "./PlayerAuras.scss";
import AuraIcon from "../AuraIcon/AuraIcon";

const PlayerAuras = ({ playerAuras, filteredAuras }) => {
    return (
        <div className="timeline-grid-cell">
            <div className="timeline-player-auras-container">
                {Object.keys(playerAuras)
                    .filter(buff => !filteredAuras.includes(buff))
                    .map((buff, index) => (
                        <AuraIcon key={index} buffName={buff} buffData={playerAuras[buff]} />
                    ))}
            </div>
        </div>
    );
};

export default PlayerAuras;