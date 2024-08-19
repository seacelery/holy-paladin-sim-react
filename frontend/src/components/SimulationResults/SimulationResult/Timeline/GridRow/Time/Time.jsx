import React from "react";
import "./Time.scss";
import { formatPriorityTime } from "../../../../../../data/breakdown-functions";

const Time = ({ time }) => {
    return <div className="timeline-grid-cell" style={{ paddingTop: "2.3rem", fontSize: "1.6rem" }}>{formatPriorityTime(time)}</div>
};

export default Time;
