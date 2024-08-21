import React, { useState, useEffect, useRef } from "react";
import "./LoadoutTalentIcon.scss";
import Tooltip from "../../../../../Tooltip/Tooltip";
import { talentsToIcons } from "../../../../../../utils/talents-to-icons-map";

const LoadoutTalentIcon = ({ talentName, talentRanks }) => {
    const [hoverElement, setHoverElement] = useState(null);
    const iconRef = useRef(null);
    useEffect(() => {
        setHoverElement(iconRef.current);
    }, []);

    const talentTooltipText = talentRanks ? `${talentName}: ${talentRanks.ranks["current rank"]} / ${talentRanks.ranks["max rank"]}` : talentName;

    return (
        <>
            <img className="loadout-talent-icon" src={talentsToIcons[talentName]} alt={talentName} ref={iconRef} />
            <Tooltip children={talentTooltipText} hoverElement={hoverElement} customClassName="loadout-talent-tooltip" />
        </>
    )
};

export default LoadoutTalentIcon;
