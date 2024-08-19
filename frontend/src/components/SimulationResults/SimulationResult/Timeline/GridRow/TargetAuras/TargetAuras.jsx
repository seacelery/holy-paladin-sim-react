import React from "react";
import "./TargetAuras.scss";
import AuraIcon from "../AuraIcon/AuraIcon";

const TargetAuras = ({ targetAuras }) => {
    const [_, targetData] = Object.entries(targetAuras || {})[0] || [];

    return (
        <div className="timeline-grid-cell">
            {targetData && (
                <div className="timeline-player-auras-container">
                    {Object.entries(targetData).map(([buffName, buffData]) => (
                        <AuraIcon
                            key={buffName}
                            buffName={buffName}
                            buffData={buffData}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default TargetAuras;
