import React from "react";
import "./TableCell.scss";

const TableCell = ({ type, style, children, subSpells }) => {
    return <div className={`table-${type}-cell`} style={style}>
        {children}
    </div>;
};

export default TableCell;
