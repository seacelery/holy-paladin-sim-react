import React, { useState, Fragment } from "react";
import "./HolyPowerTable.scss";
import TableCell from "./TableCell/TableCell";
import { holyPowerHeaders } from "../../../../../data/breakdown-objects";
import { sortHolyPowerBreakdown, sortBreakdownByHeader, formatHolyPower, formatHolyPowerGained, formatHolyPowerWasted, formatHolyPowerSpent, aggregateOverallHealingData, formatFixedNumber } from "../../../../../data/breakdown-functions";
import { spellToIconsMap } from "../../../../../utils/spell-to-icons-map";

const HolyPowerTable = ({ simulationResult }) => {
    const holyPowerBreakdown = simulationResult.results.ability_breakdown;
    const [sortHeader, setSortHeader] = useState("Holy Power Gained");
    const [sortDirection, setSortDirection] = useState("descending");
    
    const [rowsExpanded, setRowsExpanded] = useState([]);
    const [breakdown, setBreakdown] = useState(sortHolyPowerBreakdown(holyPowerBreakdown));
    const overallData = aggregateOverallHealingData(breakdown, simulationResult.simulation_details.encounter_length);

    const handleHeaderClick = (header) => {
        let newDirection;
        if (header === sortHeader) {
            newDirection = sortDirection === "ascending" ? "descending" : "ascending";
        } else {
            newDirection = "descending";
        };
        setSortHeader(header);
        setSortDirection(newDirection);
        setBreakdown(sortBreakdownByHeader(holyPowerBreakdown, header, newDirection));
    };

    return <>
        <div className="table-container">
            <div className="table-header-grid holy-power-table">
                {holyPowerHeaders.map((header, index) => {
                    return <TableCell key={`header-${index}`} type="header" breakdown={breakdown} handleHeaderClick={handleHeaderClick} sortHeader={sortHeader} sortDirection={sortDirection} rowsExpanded={rowsExpanded} setRowsExpanded={setRowsExpanded} customClassName="large-header">{header}</TableCell>
                })}
            </div>

            <div className="table-body-grid holy-power-table">
                {Object.keys(breakdown).map((spellName, rowIndex) => {
                    const spellData = breakdown[spellName];

                    if (spellData.holy_power_gained === 0 && spellData.holy_power_spent === 0) {
                        return null;
                    };

                    const formattedHolyPowerGained = spellData.holy_power_gained > 0 ? `${formatHolyPowerGained(spellData.holy_power_gained)}` : "";
                    const formattedHolyPowerWasted = spellData.holy_power_wasted > 0 ? `${formatHolyPowerWasted(spellData.holy_power_wasted)}` : "";
                    const formattedHolyPowerSpent = spellData.holy_power_spent > 0 ? `${formatHolyPowerSpent(spellData.holy_power_spent)}` : "";

                    let subSpellHasHolyPower = null;
                    for (const subSpell in spellData.sub_spells) {
                        if ((spellData.sub_spells[subSpell].holy_power_gained > 0 || spellData.sub_spells[subSpell].holy_power_spent > 0) && !["Holy Light", "Eternal Flame", "Word of Glory"].includes(spellName)) {
                            subSpellHasHolyPower = true;
                            break;
                        };
                    };

                    return (
                        <Fragment key={`resource-row-${rowIndex}`}>
                            <TableCell key={`resource-${rowIndex}-name`} index={rowIndex} type="body" style={{ color: "var(--holy-font)", justifyContent: "left" }} rowsExpanded={rowsExpanded} setRowsExpanded={setRowsExpanded} subSpells={spellData.sub_spells} subSpellHasHolyPower={subSpellHasHolyPower}>
                                <img src={spellToIconsMap[spellName]} className="table-spell-icon" />
                                <span style={{ fontWeight: 300 }}>{spellName}</span>
                            </TableCell>
                            <TableCell key={`resource-${rowIndex}-holy-power-gained`} type="body" style={{ color: "var(--holy-power-gain)" }}>{formattedHolyPowerGained}</TableCell>
                            <TableCell key={`resource-${rowIndex}-holy-power-wasted`} type="body" style={{ color: "var(--holy-power-loss)" }}>{formattedHolyPowerWasted}</TableCell>
                            <TableCell key={`resource-${rowIndex}-holy-power-spent`} type="body" style={{ color: "var(--holy-power-loss)" }}>{formattedHolyPowerSpent}</TableCell>

                            {rowsExpanded.includes(rowIndex) && Object.keys(spellData.sub_spells).map((subSpellName, subRowIndex) => {
                                const subSpellData = spellData.sub_spells[subSpellName];

                                if ((subSpellData.holy_power_gained === 0 && subSpellData.holy_power_spent === 0) || subSpellName === spellName) {
                                    return null;
                                };

                                const formattedSubSpellHolyPowerGained = subSpellData.holy_power_gained > 0 ? `${formatHolyPowerGained(subSpellData.holy_power_gained)}` : "";
                                const formattedSubSpellHolyPowerWasted = subSpellData.holy_power_wasted > 0 ? `${formatHolyPowerWasted(subSpellData.holy_power_wasted)}` : "";
                                const formattedSubSpellHolyPowerSpent = subSpellData.holy_power_spent > 0 ? `${formatHolyPowerSpent(subSpellData.holy_power_spent)}` : "";

                                return (
                                    <Fragment key={`subspell-row-${rowIndex}-${subRowIndex}`}>
                                        <TableCell key={`resource-${rowIndex}-name`} index={rowIndex} type="body" style={{ color: "var(--holy-font)", justifyContent: "left" }} customClassName="subrow">
                                            <img src={spellToIconsMap[subSpellName]} className="table-spell-icon" style={{ marginLeft: "3rem" }} />
                                            <span style={{ fontWeight: 300 }}>{subSpellName}</span>
                                        </TableCell>
                                        <TableCell key={`subrow-${rowIndex}-holy-power-gained`} type="body" style={{ color: "var(--holy-power-gain)" }}>{formattedSubSpellHolyPowerGained}</TableCell>
                                        <TableCell key={`subrow-${rowIndex}-holy-power-wasted`} type="body" style={{ color: "var(--holy-power-loss)" }}>{formattedSubSpellHolyPowerWasted}</TableCell>
                                        <TableCell key={`subrow-${rowIndex}-holy-power-spent`} type="body" style={{ color: "var(--holy-power-loss)" }}>{formattedSubSpellHolyPowerSpent}</TableCell>
                                    </Fragment>
                                );
                            })}
                        </Fragment>
                    );
                })}
            </div>

            <div className="table-footer-grid holy-power-table">
                <TableCell type="footer" style={{ textAlign: "center" }}>Total</TableCell>
                <TableCell type="footer" style={{ color: "var(--holy-power-gain)" }}>+{formatFixedNumber(overallData.holyPowerGained, 1)}</TableCell>
                <TableCell type="footer" style={{ color: "var(--holy-power-loss)" }}>-{formatFixedNumber(overallData.holyPowerWasted, 1)}</TableCell>
                <TableCell type="footer" style={{ color: "var(--holy-power-loss)" }}>-{formatFixedNumber(overallData.holyPowerSpent, 1)}</TableCell>
            </div>
        </div>
    </>
};

export default HolyPowerTable;
