import React from "react";
import "./GridRow.scss";
import Time from "./Time/Time";
import Spell from "./Spell/Spell";
import Resources from "./Resources/Resources";
import PlayerAuras from "./PlayerAuras/PlayerAuras";
import Cooldowns from "./Cooldowns/Cooldowns";
import TargetAuras from "./TargetAuras/TargetAuras";
import Counts from "./Counts/Counts";
import Stats from "./Stats/Stats";

const GridRow = ({ time, timelineData, simulationResult }) => {
    return <div className="timeline-grid-row">
        <Time time={time} />
        <Spell spell={timelineData.spell_name} />
        <Resources resourceData={timelineData.resources} maxMana={simulationResult.simulation_details.max_mana} />
        <PlayerAuras playerAuras={timelineData.player_active_auras} />
        <TargetAuras targetAuras={timelineData.target_active_auras} />
        <Cooldowns cooldowns={timelineData.remaining_cooldowns} />

        <div className="timeline-grid-cell"></div>

        <div className="timeline-grid-cell"></div>
    </div>;
};

export default GridRow;
