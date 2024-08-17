import React from "react";
import "./TableCell.scss";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";
import { excludedSpells } from "../../../../../../data/breakdown-objects";

const TableCell = ({ index, type, style, children, subSpells, targets, rowsExpanded, setRowsExpanded, customClassName, breakdown, handleHeaderClick, sortHeader, sortDirection }) => {
    const handleSubspellArrowClick = () => {
        if (rowsExpanded.includes(index)) {
            setRowsExpanded(rowsExpanded.filter(row => row !== index));
        } else {
            setRowsExpanded([...rowsExpanded, index]);
        };
    };

    const showSubspellArrow = () => {
        if (!subSpells || Object.keys(subSpells).length === 0) {
            return false;
        };
        return Object.keys(subSpells).some(spell => !excludedSpells.includes(spell));
    };

    const showTargetArrow = () => {
        if (!targets || Object.keys(targets).length === 0) {
            return false;
        };
        return Object.keys(targets).some(target => !excludedSpells.includes(target));
    };

    const handleHeaderArrowClick = (e) => {
        e.stopPropagation();
        if (rowsExpanded.length === Object.keys(breakdown).length) {
            setRowsExpanded([]);
        } else {
            setRowsExpanded(Object.keys(breakdown).map((_, index) => index));
        };
    };

    const showHeaderArrow = () => {
        return type === "header" && children === "Spell Name";
    };

    const showHeaderSortArrow =() => {
        if (sortHeader) {
            return sortHeader === children;
        };
    };

    return <div className={`table-${type}-cell ${customClassName}`} style={style} onClick={() => {
        if (type === "header") {
            handleHeaderClick(children);
        }}}>
        {children}
        {showSubspellArrow() && (
            <div className="table-subspell-arrow-container" onClick={handleSubspellArrowClick}>
                {rowsExpanded.includes(index) ? <FaCaretDown className="table-subspell-arrow-down" /> : <FaCaretRight className="table-subspell-arrow-right" />}
            </div>
        )}
        {showTargetArrow() && (
            <div className="table-subspell-arrow-container" onClick={handleSubspellArrowClick}>
                {rowsExpanded.includes(index) ? <FaCaretDown className="table-subspell-arrow-down" /> : <FaCaretRight className="table-subspell-arrow-right" />}
            </div>
        )}
        {showHeaderArrow() && (
            <div className="table-subspell-arrow-container" onClick={handleHeaderArrowClick}>
                {rowsExpanded.length === Object.keys(breakdown).length ? <FaCaretDown className="table-subspell-arrow-down" /> : <FaCaretRight className="table-subspell-arrow-right" />}
            </div>
        )}
        {showHeaderSortArrow() && (
            <div className="table-sort-arrow-container">
                {sortDirection === "descending" ? <FaCaretDown className="table-sort-arrow-down" /> : <FaCaretUp className="table-sort-arrow-up" />}
            </div>
        )}
    </div>;
};

export default TableCell;
