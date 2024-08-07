import React from "react";
import "./PriorityListCondition.scss";

const PriorityListCondition = ({ text }) => {
    return<div className="priority-list-item-condition">
        <textarea className="priority-list-item-condition-text" defaultValue={text} />
    </div>;
};

export default PriorityListCondition;
