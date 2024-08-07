import React, { useState, useRef } from "react";
import "./PriorityListAbility.scss";

const PriorityListAbility = ({ text }) => {
    const [inputValue, setInputValue] = useState(text);

    const handleInputChange = (e) => {
        setInputValue(e.target.value); 
    };

    return <div className={`priority-list-item-ability ${text.includes('\n') ? 'multi-line' : ''}`}>
        <textarea className="priority-list-item-ability-text" value={inputValue} onChange={(e) => handleInputChange(e)} />
    </div>;
};

export default PriorityListAbility;
