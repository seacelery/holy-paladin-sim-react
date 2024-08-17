import React, { useState, Fragment } from "react";
import "./HealingTable.scss";
import TableCell from "./TableCell/TableCell";
import { healingHeaders, excludedSpells } from "../../../../../data/breakdown-objects";
import { formatFixedNumber, formatThousands, formatPercentage, sortAbilityBreakdown, sortBreakdownByHeader, aggregateOverallHealingData, formatHealingPercent, formatHealing, formatHPS, formatCasts, formatAverage, formatCritPercent, formatManaSpent, formatHolyPower, formatCPM, formatOverhealing } from "../../../../../data/breakdown-functions";
import { spellToIconsMap } from "../../../../../utils/spell-to-icons-map";

const HealingTable = ({ simulationResult }) => {
    const abilityBreakdown = simulationResult.results.ability_breakdown;

    const [sortHeader, setSortHeader] = useState("Healing");
    const [sortDirection, setSortDirection] = useState("descending");

    const [breakdown, setBreakdown] = useState(sortBreakdownByHeader(abilityBreakdown, sortHeader, sortDirection));
    const [rowsExpanded, setRowsExpanded] = useState([]);
    
    const encounterLength = simulationResult.simulation_details.encounter_length;
    const overallData = aggregateOverallHealingData(breakdown, encounterLength);

    const handleHeaderClick = (header) => {
        let newDirection;
        if (header === sortHeader) {
            newDirection = sortDirection === "ascending" ? "descending" : "ascending";
        } else {
            newDirection = "descending";
        };
        setSortHeader(header);
        setSortDirection(newDirection);
        setBreakdown(sortBreakdownByHeader(abilityBreakdown, header, newDirection));
    };

    return <>
        <div className="table-container">
            <div className="table-header-grid healing-table">
                {healingHeaders.map((header, index) => {
                    return <TableCell key={`header-${index}`} type="header" rowsExpanded={rowsExpanded} setRowsExpanded={setRowsExpanded} breakdown={breakdown} handleHeaderClick={handleHeaderClick} sortHeader={sortHeader} sortDirection={sortDirection}>{header}</TableCell>
                })}
            </div>

            <div className="table-body-grid healing-table">
                {Object.keys(breakdown).map((spellName, rowIndex) => {
                    const spellData = breakdown[spellName];

                    if (excludedSpells.includes(spellName)) {
                        return null;
                    };

                    return (
                        <Fragment key={`spell-row-${rowIndex}`}>
                            <TableCell key={`spell-${rowIndex}-name`} index={rowIndex} type="body" style={{ color: "var(--holy-font)", justifyContent: "left" }} subSpells={spellData.sub_spells} sourceSpells={spellData.source_spells} rowsExpanded={rowsExpanded} setRowsExpanded={setRowsExpanded}>
                                <img src={spellToIconsMap[spellName]} className="table-spell-icon" alt={spellName} />
                                <span style={{ fontWeight: 300 }}>{spellName}</span>
                            </TableCell>
                            <TableCell key={`spell-${rowIndex}-percent`} type="body">{formatHealingPercent(spellName, spellData.total_healing, overallData.healing)}</TableCell>
                            <TableCell key={`spell-${rowIndex}-healing`} type="body" style={{ color: spellData.total_healing >= 0 ? "var(--healing-font)" : "var(--red-font-hover)" }}>{formatHealing(spellName, spellData.total_healing)}</TableCell>
                            <TableCell key={`spell-${rowIndex}-hps`} type="body" style={{ color: spellData.total_healing >= 0 ? "var(--healing-font)" : "var(--red-font-hover)" }}>{formatHPS(spellName, spellData.total_healing, encounterLength)}</TableCell>
                            <TableCell key={`spell-${rowIndex}-casts`} type="body">{formatCasts(spellName, spellData.casts)}</TableCell>
                            <TableCell key={`spell-${rowIndex}-average`} type="body" style={{ color: spellData.total_healing >= 0 ? "var(--healing-font)" : "var(--red-font-hover)" }}>{formatAverage(spellName, spellData.total_healing, spellData.hits, spellData.casts)}</TableCell>
                            <TableCell key={`spell-${rowIndex}-hits`} type="body">{spellData.hits > 0 ? formatFixedNumber(spellData.hits, 1) : ""}</TableCell>
                            <TableCell key={`spell-${rowIndex}-crit`} type="body">{formatCritPercent(spellName, spellData.crit_percent)}</TableCell>
                            <TableCell key={`spell-${rowIndex}-mana`} type="body" style={{ color: "var(--mana)" }}>{formatManaSpent(spellData.mana_spent)}</TableCell>
                            <TableCell key={`spell-${rowIndex}-holy-power`} type="body" style={{ color: spellData.holy_power_gained > 0 ? "var(--holy-power-gain)" : "var(--holy-power-loss)" }}>{formatHolyPower(spellData.holy_power_gained, spellData.holy_power_spent)}</TableCell>
                            <TableCell key={`spell-${rowIndex}-cpm`} type="body">{formatCPM(spellData.casts, encounterLength)}</TableCell>
                            <TableCell key={`spell-${rowIndex}-overhealing`} type="body">{formatOverhealing(spellData.overhealing)}</TableCell>

                            {rowsExpanded.includes(rowIndex) && Object.keys(spellData.sub_spells).map((subSpellName, subRowIndex) => {
                                const subSpellData = spellData.sub_spells[subSpellName];

                                if (excludedSpells.includes(subSpellName)) {
                                    return null;
                                };

                                return (
                                    <Fragment key={`subspell-row-${rowIndex}-${subRowIndex}`}>
                                        <TableCell key={`subspell-${rowIndex}-${subRowIndex}-name`} type="body" style={{ color: "var(--holy-font)", justifyContent: "left" }} customClassName="subrow">
                                            <img src={spellToIconsMap[subSpellName]} className="table-spell-icon" style={{ marginLeft: "3rem" }} alt={subSpellName} />
                                            <span style={{ fontWeight: 300 }}>{subSpellName}</span>
                                        </TableCell>
                                        <TableCell key={`subspell-${rowIndex}-${subRowIndex}-percent`} type="body">{formatPercentage(subSpellData.total_healing / overallData.healing)}</TableCell>
                                        <TableCell key={`subspell-${rowIndex}-${subRowIndex}-healing`} type="body" style={{ color: subSpellData.total_healing >= 0 ? "var(--healing-font)" : "var(--red-font-hover)" }}>{formatThousands(subSpellData.total_healing)}</TableCell>
                                        <TableCell key={`subspell-${rowIndex}-${subRowIndex}-hps`} type="body" style={{ color: subSpellData.total_healing >= 0 ? "var(--healing-font)" : "var(--red-font-hover)" }}>{formatThousands(subSpellData.total_healing / encounterLength)}</TableCell>
                                        <TableCell key={`subspell-${rowIndex}-${subRowIndex}-casts`} type="body">{formatCasts(subSpellName, subSpellData.casts)}</TableCell>
                                        <TableCell key={`subspell-${rowIndex}-${subRowIndex}-average`} type="body" style={{ color: subSpellData.total_healing >= 0 ? "var(--healing-font)" : "var(--red-font-hover)" }}>{formatAverage(subSpellName, subSpellData.total_healing, subSpellData.hits, subSpellData.casts)}</TableCell>
                                        <TableCell key={`subspell-${rowIndex}-${subRowIndex}-hits`} type="body">{subSpellData.hits > 0 ? formatFixedNumber(subSpellData.hits, 1) : ""}</TableCell>
                                        <TableCell key={`subspell-${rowIndex}-${subRowIndex}-crit`} type="body">{formatCritPercent(subSpellName, subSpellData.crit_percent)}</TableCell>
                                        <TableCell key={`subspell-${rowIndex}-${subRowIndex}-mana`} type="body" style={{ color: "var(--mana)" }}>{formatManaSpent(subSpellData.mana_spent)}</TableCell>
                                        <TableCell key={`subspell-${rowIndex}-${subRowIndex}-holy-power`} type="body" style={{ color: subSpellData.holy_power_gained > 0 ? "var(--holy-power-gain)" : "var(--holy-power-loss)" }}>{formatHolyPower(subSpellData.holy_power_gained, subSpellData.holy_power_spent)}</TableCell>
                                        <TableCell key={`subspell-${rowIndex}-${subRowIndex}-cpm`} type="body">{formatCPM(subSpellData.casts, encounterLength)}</TableCell>
                                        <TableCell key={`subspell-${rowIndex}-${subRowIndex}-overhealing`} type="body">{formatOverhealing(subSpellData.overhealing)}</TableCell>
                                    </Fragment>
                                );
                            })}

                            {rowsExpanded.includes(rowIndex) && spellData.source_spells && Object.keys(spellData.source_spells).map((sourceSpellName, subRowIndex) => {
                                const sourceSpellData = spellData.source_spells[sourceSpellName];

                                if (excludedSpells.includes(sourceSpellName)) {
                                    return null;
                                };

                                return (
                                    <Fragment key={`sourcespell-row-${rowIndex}-${subRowIndex}`}>
                                        <TableCell key={`sourcespell-${rowIndex}-${subRowIndex}-name`} type="body" style={{ color: "var(--holy-font)", justifyContent: "left" }} customClassName="subrow">
                                            <img src={spellToIconsMap[sourceSpellName]} className="table-spell-icon" style={{ marginLeft: "3rem" }} alt={sourceSpellName} />
                                            <span style={{ fontWeight: 300 }}>{sourceSpellName}</span>
                                        </TableCell>
                                        <TableCell key={`sourcespell-${rowIndex}-${subRowIndex}-percent`} type="body">{formatPercentage(sourceSpellData.healing / overallData.healing)}</TableCell>
                                        <TableCell key={`sourcespell-${rowIndex}-${subRowIndex}-healing`} type="body" style={{ color: sourceSpellData.healing >= 0 ? "var(--healing-font)" : "var(--red-font-hover)" }}>{formatThousands(sourceSpellData.healing)}</TableCell>
                                        <TableCell key={`sourcespell-${rowIndex}-${subRowIndex}-hps`} type="body" style={{ color: sourceSpellData.healing >= 0 ? "var(--healing-font)" : "var(--red-font-hover)" }}>{formatThousands(sourceSpellData.healing / encounterLength)}</TableCell>
                                        <TableCell key={`sourcespell-${rowIndex}-${subRowIndex}-casts`} type="body">{}</TableCell>
                                        <TableCell key={`sourcespell-${rowIndex}-${subRowIndex}-average`} type="body" style={{ color: sourceSpellData.healing >= 0 ? "var(--healing-font)" : "var(--red-font-hover)" }}>{formatAverage(sourceSpellName, sourceSpellData.healing, sourceSpellData.hits, null)}</TableCell>
                                        <TableCell key={`sourcespell-${rowIndex}-${subRowIndex}-hits`} type="body">{sourceSpellData.hits > 0 ? formatFixedNumber(sourceSpellData.hits, 1) : ""}</TableCell>
                                        <TableCell key={`sourcespell-${rowIndex}-${subRowIndex}-crit`} type="body"></TableCell>
                                        <TableCell key={`sourcespell-${rowIndex}-${subRowIndex}-mana`} type="body"></TableCell>
                                        <TableCell key={`sourcespell-${rowIndex}-${subRowIndex}-holy-power`} type="body"></TableCell>
                                        <TableCell key={`sourcespell-${rowIndex}-${subRowIndex}-cpm`} type="body"></TableCell>
                                        <TableCell key={`sourcespell-${rowIndex}-${subRowIndex}-overhealing`} type="body"></TableCell>
                                    </Fragment>
                                );
                            })}
                        </Fragment>
                    );
                })}
            </div>

            <div className="table-footer-grid healing-table">
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
