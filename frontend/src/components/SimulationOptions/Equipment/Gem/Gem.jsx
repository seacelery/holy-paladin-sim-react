import React, { useContext, useRef, useState, useEffect } from "react";
import "./Gem.scss";
import Tooltip from "../../../Tooltip/Tooltip";
import {
    groupedGems,
    ptrGroupedGems,
} from "../../../../utils/items-to-icons-map";
import { VersionContext } from "../../../../context/VersionContext";

const Gem = ({ gemName, size = "small", tooltip = false, customClassName = "", onClick = null }) => {
    const { version } = useContext(VersionContext);
    const gemSet = version === "live" ? groupedGems : ptrGroupedGems;

    const [hoverElement, setHoverElement] = useState(null);
    const iconRef = useRef(null);
    useEffect(() => {
        setHoverElement(iconRef.current);
    }, []);

    const findGem = (gemName) => {
        for (const gemType in gemSet) {
            for (const gemInfo of gemSet[gemType].gems) {
                if (gemName === gemInfo[0]) {
                    return gemInfo;
                }
            }
        }

        return [null, null];
    };

    const [gem, gemIconSrc] = findGem(gemName);

    const findGemStats = (gemName) => {
        const gemStats = [];

        for (const gemType in gemSet) {
            for (const gemInfo of gemSet[gemType].gems) {
                if (gemName === gemInfo[0]) {
                    gemStats.push(gemInfo[2]);
                    if (gemInfo[3]) {
                        gemStats.push(gemInfo[3]);
                    };
                };
            };
        };

        return gemStats;
    };

    const gemStats = findGemStats(gemName);
    let firstStat, secondStat;

    if (gemStats) {
        if (gemStats[0]) {
            firstStat = gemStats[0].match(/[haste]?[mastery]?[crit]?[versatility]?[intellect]?/gi).join("").toLowerCase();
        }
        if (gemStats[1]) {
            secondStat = gemStats[1].match(/[haste]?[mastery]?[crit]?[versatility]?[intellect]?/gi).join("").toLowerCase();
        };
    };

    return (
        <div className={`item-gem-container ${customClassName}`} ref={iconRef} onClick={onClick} >
            <img
                className={`item-gem-icon item-gem-icon-${size}`}
                src={gemIconSrc}
            />
            {tooltip && (
                <Tooltip
                    children={
                        <>
                            <div style={{color: `var(--stat-${firstStat}`}}>{gemName}</div>
                            <div>
                                <span className="gem-tooltip-stat" style={{color: `var(--stat-${firstStat})`}}>{gemStats[0]}</span>
                                {gemStats[1] && (
                                    <>
                                        <span className="gem-tooltip-stat"> & </span>
                                        <span className="gem-tooltip-stat" style={{color: `var(--stat-${secondStat})`}}>{gemStats[1]}</span>
                                    </>
                                )}
                            </div>
                        </>
                    }
                    hoverElement={hoverElement}
                    customClassName={`gem-tooltip border-${firstStat}`}
                />
            )}
        </div>
    );
};

export default Gem;
