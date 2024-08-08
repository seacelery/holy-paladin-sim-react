import React, { useState, useRef, useEffect } from "react";
import "./PriorityListCondition.scss";

const PriorityListCondition = ({ text, setTextParts, index }) => {
    const [inputValue, setInputValue] = useState(text);
    const textareaRef = useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        setInputValue(text);
    }, [text]);

    useEffect(() => {
        const textarea = textareaRef.current;

        textarea.style.lineHeight = "4rem";
        let lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
        let numberOfLines = textarea.scrollHeight / lineHeight;

        if (numberOfLines <= 1) {
            textarea.style.lineHeight = "4rem";
        } else {
            textarea.style.lineHeight = "2rem";
        };

        setTextParts((prevTextParts) => {
            const newTextParts = [...prevTextParts];
            newTextParts[index] = inputValue;
            return newTextParts;
        });
    }, [inputValue]);

    return (
        <div
            className="priority-list-item-condition"
        >
            <textarea
                className={`priority-list-item-condition-text`}
                value={inputValue}
                onChange={(e) => handleInputChange(e)}
                ref={textareaRef}
            />
        </div>
    );
};

export default PriorityListCondition;
