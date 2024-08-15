import React, { useState, Fragment } from "react";
import "./HealingTable.scss";
import TableCell from "./TableCell/TableCell";
import { healingHeaders, excludedSpells } from "../../../../../data/breakdown-objects";
import { formatFixedNumber, formatThousands, formatThousandsWithoutRounding, formatPercentage, sortAbilityBreakdown, aggregateOverallHealingData, formatCasts, formatAverage, formatCritPercent, formatManaSpent, formatHolyPower, formatCPM, formatOverhealing } from "../../../../../data/breakdown-functions";
import { spellToIconsMap } from "../../../../../utils/spell-to-icons-map";

const HealingTable = ({ simulationResult }) => {
    const [rowsExpanded, setRowsExpanded] = useState([]);

    const abilityBreakdown = simulationResult.results.ability_breakdown;
    const sortedAbilityBreakdown = sortAbilityBreakdown(abilityBreakdown);
    const encounterLength = simulationResult.simulation_details.encounter_length;
    const overallData = aggregateOverallHealingData(sortedAbilityBreakdown, encounterLength);

    return <>
        <div className="table-container">
            <div className="table-header-grid">
                {healingHeaders.map((header, index) => (
                    <TableCell key={index} type="header">{header}</TableCell>
                ))}
            </div>

            <div className="table-body-grid">
                {Object.keys(sortedAbilityBreakdown).map((spellName, rowIndex) => {
                    const spellData = sortedAbilityBreakdown[spellName];

                    if (excludedSpells.includes(spellName)) {
                        return;
                    };

                    return (
                        <Fragment key={rowIndex}>
                            <TableCell index={rowIndex} type="body" style={{ color: "var(--holy-font)", justifyContent: "left" }} subSpells={spellData.sub_spells} rowsExpanded={rowsExpanded} setRowsExpanded={setRowsExpanded}>
                                <img src={spellToIconsMap[spellName]} alt={spellName} className="table-spell-icon" />
                                <span style={{ fontWeight: 300 }}>{spellName}</span>
                            </TableCell>
                            <TableCell type="body">{formatPercentage(spellData.total_healing / overallData.healing)}</TableCell>
                            <TableCell type="body" style={{ color: spellData.total_healing >= 0 ? "var(--healing-font)" : "var(--red-font-hover)" }}>{formatThousands(spellData.total_healing)}</TableCell>
                            <TableCell type="body" style={{ color: spellData.total_healing >= 0 ? "var(--healing-font)" : "var(--red-font-hover)" }}>{formatThousands(spellData.total_healing / encounterLength)}</TableCell>
                            <TableCell type="body">{formatCasts(spellName, spellData.casts)}</TableCell>
                            <TableCell type="body" style={{ color: spellData.total_healing >= 0 ? "var(--healing-font)" : "var(--red-font-hover)" }}>{formatAverage(spellName, spellData.total_healing, spellData.hits, spellData.casts)}</TableCell>
                            <TableCell type="body">{spellData.hits > 0 ? formatFixedNumber(spellData.hits, 1) : ""}</TableCell>
                            <TableCell type="body">{formatCritPercent(spellName, spellData.crit_percent)}</TableCell>
                            <TableCell type="body" style={{ color: "var(--mana)" }}>{formatManaSpent(spellData.mana_spent)}</TableCell>
                            <TableCell type="body" style={{ color: spellData.holy_power_gained > 0 ? "var(--holy-power-gain)" : "var(--holy-power-loss)" }}>{formatHolyPower(spellData.holy_power_gained, spellData.holy_power_spent)}</TableCell>
                            <TableCell type="body">{formatCPM(spellData.casts, encounterLength)}</TableCell>
                            <TableCell type="body">{formatOverhealing(spellData.overhealing)}</TableCell>
                        </Fragment>
                    )
                })}
            </div>

            <div className="table-footer-grid">
                <TableCell type="footer" style={{ textAlign: "center" }}>Total</TableCell>
                <TableCell type="footer">100%</TableCell>
                <TableCell type="footer" style={{ color: overallData.healing >= 0 ? "var(--healing-font)" : "var(--red-font-hover)" }}>{formatThousands(overallData.healing)}</TableCell>
                <TableCell type="footer" style={{ color: overallData.healing >= 0 ? "var(--healing-font)" : "var(--red-font-hover)" }}>{formatThousands(overallData.HPS)}</TableCell>
                <TableCell type="footer">{formatFixedNumber(overallData.casts, 1)}</TableCell>
                <TableCell type="footer"></TableCell>
                <TableCell type="footer"></TableCell>
                <TableCell type="footer"></TableCell>
                <TableCell type="footer" style={{ color: "var(--mana)" }}>{formatThousands(overallData.manaSpent)}</TableCell>
                <TableCell type="footer"></TableCell>
                <TableCell type="footer">{formatFixedNumber(overallData.CPM, 1)}</TableCell>
                <TableCell type="footer"></TableCell>
            </div>
        </div>
    </>
};

export default HealingTable;
