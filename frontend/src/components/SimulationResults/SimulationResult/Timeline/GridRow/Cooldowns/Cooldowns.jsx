import React from "react";
import "./Cooldowns.scss";
import CooldownIcon from "../CooldownIcon/CooldownIcon";

const Cooldowns = ({ cooldowns }) => {
    const generatorCooldownsRow = ["Holy Shock", "Judgment", "Crusader Strike", "Hammer of Wrath", "Consecration", "Beacon of Virtue"];
    const majorCooldownsRow = [
        "Avenging Wrath", "Daybreak", "Divine Toll", "Tyr's Deliverance",
        "Light's Hammer", "Holy Prism", "Barrier of Faith", "Blessing of the Seasons", 
        "Divine Favor", "Lay on Hands", "Arcane Torrent", "Fireblood", "Gift of the Naaru"
    ];

    return <div className="timeline-grid-cell">
        <div className="timeline-player-auras-container">
            <div className="timeline-cooldowns-row">
                {generatorCooldownsRow.map((cooldown, index) => {
                    if (cooldowns[cooldown]) {
                        return <CooldownIcon key={index} spellName={cooldown} cooldownData={cooldowns[cooldown]} />
                    };
                })}
            </div>
            
            <div className="timeline-cooldowns-row">
                {majorCooldownsRow.map((cooldown, index) => {
                    if (cooldowns[cooldown]) {
                        return <CooldownIcon key={index} spellName={cooldown} cooldownData={cooldowns[cooldown]} />
                    };
                })} 
            </div> 
        </div>
    </div>
};

export default Cooldowns;
