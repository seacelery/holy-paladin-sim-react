import React from "react";
import "./Spell.scss";
import { spellToIconsMap } from "../../../../../../utils/spell-to-icons-map";

const Spell = ({ spell }) => {
    return <div className="timeline-grid-cell">
        <div className="timeline-icon-container" style={{ paddingTop: "1rem" }}>
            <img src={spellToIconsMap[spell]} alt={spell} style={{ width: "5rem", height: "5rem", border: "0.1rem solid var(--border-colour-3)" }}/>
        </div>
    </div>
};

export default Spell;
