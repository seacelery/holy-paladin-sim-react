import React from "react";
import "./TableCell.scss";
import { FaCaretRight } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa";

const TableCell = ({ index, type, style, children, subSpells, rowsExpanded, setRowsExpanded }) => {
    const handleArrowClick = () => {
        if (rowsExpanded.includes(index)) {
            setRowsExpanded(rowsExpanded.filter(row => row !== index));
        } else {
            setRowsExpanded([...rowsExpanded, index]);
        };
    };

    return <div className={`table-${type}-cell`} style={style}>
        {children}
        {(subSpells && Object.keys(subSpells).length > 0) && (
            <div className="table-subspell-arrow-container" onClick={handleArrowClick}>
                {rowsExpanded.includes(index) ? <FaCaretDown className="table-subspell-arrow-down" /> : <FaCaretRight className="table-subspell-arrow-right" />}
            </div>
        )}
    </div>;
};

export default TableCell;
