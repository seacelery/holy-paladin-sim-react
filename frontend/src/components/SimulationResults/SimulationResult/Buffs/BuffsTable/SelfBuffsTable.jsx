import React, { useState, Fragment, useEffect } from "react";
import "./SelfBuffsTable.scss";
import TableCell from "./TableCell/TableCell";
import { selfBuffHeaders, overlappingBuffs, selfBuffsMap } from "../../../../../data/breakdown-objects";
import { sortBuffsBreakdown, sortBreakdownByHeader, handleOverlappingBuffs, formatFixedNumber, formatThousands, formatPercentage, formatHealingPercent, formatHealing, formatHPS, formatCasts, formatAverage, formatCritPercent, formatManaSpent, formatHolyPower, formatCPM, formatOverhealing } from "../../../../../data/breakdown-functions";
import { buffsToIconsMap } from "../../../../../utils/buffs-to-icons-map";

const SelfBuffsTable = ({ simulationResult }) => {
    const buffsBreakdown = simulationResult.results.self_buff_breakdown;
    const [sortHeader, setSortHeader] = useState("Uptime");
    const [sortDirection, setSortDirection] = useState("descending");
    
    const [breakdown, setBreakdown] = useState(sortBuffsBreakdown(buffsBreakdown));
    
    useEffect(() => {
        let updatedBreakdown = { ...breakdown };
        
        overlappingBuffs.forEach((buffName) => {
            updatedBreakdown = handleOverlappingBuffs(buffName, updatedBreakdown);
        });
    
        setBreakdown(updatedBreakdown);
    }, []);

    const handleHeaderClick = (header) => {
        let newDirection;
        if (header === sortHeader) {
            newDirection = sortDirection === "ascending" ? "descending" : "ascending";
        } else {
            newDirection = "descending";
        };
        setSortHeader(header);
        setSortDirection(newDirection);
        setBreakdown(sortBreakdownByHeader(buffsBreakdown, header, newDirection));
    };

    return <>
        <div className="table-container">
            <div className="table-header-grid self-buffs-table">
                {selfBuffHeaders.map((header, index) => {
                    return <TableCell key={`header-${index}`} type="header" breakdown={breakdown} handleHeaderClick={handleHeaderClick} sortHeader={sortHeader} sortDirection={sortDirection} customClassName="large-header">{header}</TableCell>
                })}
            </div>

            <div className="table-body-grid self-buffs-table">
                {Object.keys(breakdown).map((buffName, rowIndex) => {
                    const buffData = breakdown[buffName];

                    const filteredBuffName = selfBuffsMap[buffName] || buffName;

                    return (
                        <Fragment key={`buff-row-${rowIndex}`}>
                            <TableCell key={`buff-${rowIndex}-name`} index={rowIndex} type="body" style={{ color: "var(--holy-font)", justifyContent: "left" }}>
                                <img src={buffsToIconsMap[buffName]} className="table-spell-icon" />
                                <span style={{ fontWeight: 300 }}>{filteredBuffName}</span>
                            </TableCell>
                            <TableCell key={`buff-${rowIndex}-count`} type="body">{formatFixedNumber(buffData.count, 1)}</TableCell>
                            <TableCell key={`buff-${rowIndex}-healing`} type="body">{(buffData.uptime * 100).toFixed(2) + "%"}</TableCell>
                            <TableCell key={`buff-${rowIndex}-hps`} type="body" >{formatFixedNumber(buffData.average_duration, 1)}</TableCell>
                        </Fragment>
                    );
                })}
            </div>
        </div>
    </>
};

export default SelfBuffsTable;
