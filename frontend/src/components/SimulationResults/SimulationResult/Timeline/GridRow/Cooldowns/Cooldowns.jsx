import React from "react";
import "./Cooldowns.scss";
import CooldownIcon from "../CooldownIcon/CooldownIcon";
import { generatorCooldownsRow, majorCooldownsRow } from "../../../../../../data/breakdown-objects";

const Cooldowns = ({ cooldowns, filteredCooldowns }) => {
    

    return <div className="timeline-grid-cell">
        <div className="timeline-player-auras-container">
            <div className="timeline-cooldowns-row">
                {generatorCooldownsRow.map((cooldown, index) => {
                    if (cooldowns[cooldown] && !filteredCooldowns.includes(cooldown)) {
                        return <CooldownIcon key={index} spellName={cooldown} cooldownData={cooldowns[cooldown]} />
                    };
                })}
            </div>
            
            <div className="timeline-cooldowns-row">
                {majorCooldownsRow.map((cooldown, index) => {
                    if (cooldowns[cooldown] && !filteredCooldowns.includes(cooldown)) {
                        return <CooldownIcon key={index} spellName={cooldown} cooldownData={cooldowns[cooldown]} />
                    };
                })} 
            </div> 
        </div>
    </div>
};

export default Cooldowns;
