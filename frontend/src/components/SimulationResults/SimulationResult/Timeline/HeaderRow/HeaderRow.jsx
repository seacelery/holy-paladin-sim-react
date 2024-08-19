import React from "react";
import "./HeaderRow.scss";

const HeaderRow = ({ headers }) => {
    return <>
        {headers.map((header, index) => (
            <div key={index} className="timeline-header-cell">
                {header}
            </div>
        ))}
    </>;
};

export default HeaderRow;
