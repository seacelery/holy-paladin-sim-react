import React, { useState, Fragment } from "react";
import "./TargetBuffsTable.scss";
import TableCell from "./TableCell/TableCell";
import { selfBuffHeaders, targetBuffsMap } from "../../../../../data/breakdown-objects";
import { sortBuffsBreakdown, sortBreakdownByHeader, formatFixedNumber } from "../../../../../data/breakdown-functions";
import { buffsToIconsMap } from "../../../../../utils/buffs-to-icons-map";

const TargetBuffsTable = ({ simulationResult }) => {
    const buffsBreakdown = simulationResult.results.target_buff_breakdown;
    const combinedBuffsBreakdown = simulationResult.results.aggregated_target_buff_breakdown;

    const [sortHeader, setSortHeader] = useState("Uptime");
    const [sortDirection, setSortDirection] = useState("descending");

    const [breakdown, setBreakdown] = useState(sortBuffsBreakdown(combinedBuffsBreakdown));
    const [targetsBreakdown, setTargetsBreakdown] = useState(sortBuffsBreakdown(buffsBreakdown));
    const [rowsExpanded, setRowsExpanded] = useState([]);

    const handleHeaderClick = (header) => {
        let newDirection;
        if (header === sortHeader) {
            newDirection = sortDirection === "ascending" ? "descending" : "ascending";
        } else {
            newDirection = "descending";
        };
        setSortHeader(header);
        setSortDirection(newDirection);
        setBreakdown(sortBreakdownByHeader(combinedBuffsBreakdown, header, newDirection));
        setTargetsBreakdown(sortBreakdownByHeader(buffsBreakdown, header, newDirection));
    };

    return <>
        <div className="table-container">
            <div className="table-header-grid target-buffs-table">
                {selfBuffHeaders.map((header, index) => {
                    if (header !== "Average Duration") {
                        return <TableCell key={`header-${index}`} type="header" rowsExpanded={rowsExpanded} setRowsExpanded={setRowsExpanded} breakdown={breakdown} handleHeaderClick={handleHeaderClick} sortHeader={sortHeader} sortDirection={sortDirection}>{header}</TableCell>
                    } else {
                        return null;
                    };
                })}
            </div>

            <div className="table-body-grid target-buffs-table">
                {Object.keys(breakdown).map((buffName, rowIndex) => {
                    const buffData = breakdown[buffName];

                    const filteredBuffName = targetBuffsMap[buffName] || buffName;

                    return (
                        <Fragment key={`buff-row-${rowIndex}`}>
                            <TableCell key={`buff-${rowIndex}-name`} index={rowIndex} type="body" style={{ color: "var(--holy-font)", justifyContent: "left" }} targets={targetsBreakdown[buffName]} rowsExpanded={rowsExpanded} setRowsExpanded={setRowsExpanded}>
                                <img src={buffsToIconsMap[buffName]} className="table-spell-icon" />
                                <span style={{ fontWeight: 300 }}>{filteredBuffName}</span>
                            </TableCell>
                            <TableCell key={`buff-${rowIndex}-count`} type="body">{formatFixedNumber(buffData.count, 1)}</TableCell>
                            <TableCell key={`buff-${rowIndex}-healing`} type="body">{(buffData.uptime * 100).toFixed(2) + "%"}</TableCell>

                            {rowsExpanded.includes(rowIndex) && Object.keys(targetsBreakdown[buffName]).map((targetName, subRowIndex) => {
                                const targetData = targetsBreakdown[buffName][targetName];

                                return (
                                    <Fragment key={`subspell-row-${rowIndex}-${subRowIndex}`}>
                                        <TableCell key={`buff-${rowIndex}-name`} index={rowIndex} type="body" style={{ color: "var(--holy-font)", justifyContent: "left" }} rowsExpanded={rowsExpanded} setRowsExpanded={setRowsExpanded} customClassName="subrow">
                                            <img src={buffsToIconsMap[buffName]} className="table-spell-icon"  style={{ marginLeft: "3rem" }} />
                                            <span style={{ fontWeight: 300 }}>{targetName}</span>
                                        </TableCell>
                                        <TableCell key={`buff-${rowIndex}-count`} type="body">{formatFixedNumber(targetData.count, 1)}</TableCell>
                                        <TableCell key={`buff-${rowIndex}-healing`} type="body">{(targetData.uptime * 100).toFixed(2) + "%"}</TableCell>

                                    </Fragment>
                                );
                            })}
                        </Fragment>
                    );
                })}
            </div>
        </div>
    </>
};

export default TargetBuffsTable;
