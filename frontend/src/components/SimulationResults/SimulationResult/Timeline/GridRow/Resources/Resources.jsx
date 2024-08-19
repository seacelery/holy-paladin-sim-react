import React from "react";
import "./Resources.scss";
import { formatThousands } from "../../../../../../data/breakdown-functions";

const Resources = ({ resourceData, maxMana }) => {
    return <div className="timeline-grid-cell timeline-resources-cell">
        <img src={`src\\assets\\holy-power\\holy-power-${resourceData.holy_power}.png`} alt="0 Holy Power"></img>
        <div className="timeline-mana-bar-container">
            <progress className="timeline-mana-bar" value={resourceData.mana / maxMana} max="1"></progress>
            <div className="timeline-mana-bar-text">{formatThousands(resourceData.mana)}</div>
        </div>
    </div>
};

export default Resources;
