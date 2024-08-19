import React from "react";
import "./PlayerAuras.scss";
import AuraIcon from "../AuraIcon/AuraIcon";
import { overlappingBuffs, overlappingBuffsData } from "../../../../../../data/breakdown-objects";

const PlayerAuras = ({ playerAuras }) => {
    return <div className="timeline-grid-cell">
        <div className="timeline-player-auras-container">
            {Object.keys(playerAuras).map((buff, index) => (
                <AuraIcon key={index} buffName={buff} buffData={playerAuras[buff]} />
            ))}
        </div>
    </div>
};

export default PlayerAuras;
