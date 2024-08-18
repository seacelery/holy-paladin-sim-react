import React, { useState, Fragment } from "react";
import "./ManaTable.scss";
import TableCell from "./TableCell/TableCell";
import { manaHeaders, manaMap } from "../../../../../data/breakdown-objects";
import { sortManaBreakdown, sortBreakdownByHeader, formatManaSpent, formatManaGained, aggregateOverallHealingData, formatThousands } from "../../../../../data/breakdown-functions";
import { spellToIconsMap } from "../../../../../utils/spell-to-icons-map";

const ManaTable = ({ simulationResult }) => {
    const manaBreakdown = simulationResult.results.ability_breakdown;
    const [sortHeader, setSortHeader] = useState("Mana Spent");
    const [sortDirection, setSortDirection] = useState("descending");
    
    const [rowsExpanded, setRowsExpanded] = useState([]);
    const [breakdown, setBreakdown] = useState(sortManaBreakdown(manaBreakdown));
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
        setBreakdown(sortBreakdownByHeader(manaBreakdown, header, newDirection));
    };

    return <>
        <div className="table-container">
            <div className="table-header-grid mana-table">
                {manaHeaders.map((header, index) => {
                    return <TableCell key={`header-${index}`} type="header" breakdown={breakdown} handleHeaderClick={handleHeaderClick} sortHeader={sortHeader} sortDirection={sortDirection} rowsExpanded={rowsExpanded} setRowsExpanded={setRowsExpanded}>{header}</TableCell>
                })}
            </div>

            <div className="table-body-grid mana-table">
                {Object.keys(breakdown).map((spellName, rowIndex) => {
                    const spellData = breakdown[spellName];

                    if (spellData.mana_gained === 0 && spellData.mana_spent === 0) {
                        return null;
                    };

                    const formattedManaSpent = spellData.mana_spent > 0 ? `-${formatManaSpent(spellData.mana_spent)}` : "";
                    const formattedManaGained = spellData.mana_gained > 0 ? `+${formatManaGained(spellData.mana_gained)}` : "";

                    let totalManaGained = 0;
                    for (const spell in spellData.sub_spells) {
                        totalManaGained += spellData.sub_spells[spell].mana_gained;
                    };

                    return (
                        <Fragment key={`resource-row-${rowIndex}`}>
                            <TableCell key={`resource-${rowIndex}-name`} index={rowIndex} type="body" style={{ color: "var(--holy-font)", justifyContent: "left" }} rowsExpanded={rowsExpanded} setRowsExpanded={setRowsExpanded} subSpells={spellData.sub_spells} totalManaGained={totalManaGained}>
                                <img src={spellToIconsMap[spellName]} className="table-spell-icon" />
                                <span style={{ fontWeight: 300 }}>{spellName}</span>
                            </TableCell>
                            <TableCell key={`resource-${rowIndex}-mana-gained`} type="body" style={{ color: "var(--mana)" }}>{formattedManaGained}</TableCell>
                            <TableCell key={`resource-${rowIndex}-mana-spent`} type="body" style={{ color: "var(--mana)" }}>{formattedManaSpent}</TableCell>

                            {rowsExpanded.includes(rowIndex) && Object.keys(spellData.sub_spells).map((subSpellName, subRowIndex) => {
                                const subSpellData = spellData.sub_spells[subSpellName];

                                if (totalManaGained === 0 || (subSpellData.mana_gained === 0 && subSpellData.mana_spent === 0) || subSpellName === spellName) {
                                    return null;
                                };

                                const formattedSubSpellManaSpent = subSpellData.mana_spent > 0 ? `-${formatManaSpent(subSpellData.mana_spent)}` : "";
                                const formattedSubSpellManaGained = subSpellData.mana_gained > 0 ? `+${formatManaGained(subSpellData.mana_gained)}` : "";

                                const filteredName = manaMap[subSpellName] ? manaMap[subSpellName] : subSpellName;

                                return (
                                    <Fragment key={`subspell-row-${rowIndex}-${subRowIndex}`}>
                                        <TableCell key={`resource-${rowIndex}-name`} index={rowIndex} type="body" style={{ color: "var(--holy-font)", justifyContent: "left" }} customClassName="subrow">
                                            <img src={spellToIconsMap[subSpellName]} className="table-spell-icon" style={{ marginLeft: "3rem" }} />
                                            <span style={{ fontWeight: 300 }}>{filteredName}</span>
                                        </TableCell>
                                        <TableCell key={`subrow-${rowIndex}-mana-gained`} type="body" style={{ color: "var(--mana)" }}>{formattedSubSpellManaGained}</TableCell>
                                        <TableCell key={`subrow-${rowIndex}-mana-spent`} type="body" style={{ color: "var(--mana)" }}>{formattedSubSpellManaSpent}</TableCell>
                                    </Fragment>
                                );
                            })}
                        </Fragment>
                    );
                })}
            </div>

            <div className="table-footer-grid mana-table">
                <TableCell type="footer" style={{ textAlign: "center" }}>Total</TableCell>
                <TableCell type="footer" style={{ color: "var(--mana)" }}>+{formatThousands(overallData.manaGained)}</TableCell>
                <TableCell type="footer" style={{ color: "var(--mana)" }}>-{formatThousands(overallData.manaSpent)}</TableCell>
            </div>
        </div>
    </>
};

export default ManaTable;
