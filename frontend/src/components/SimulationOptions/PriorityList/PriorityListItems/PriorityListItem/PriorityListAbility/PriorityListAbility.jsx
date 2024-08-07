import React, { useState, useRef, useEffect } from "react";
import "./PriorityListAbility.scss";

const PriorityListAbility = ({ text, setTextParts }) => {
    const [inputValue, setInputValue] = useState(text);
    const textareaRef = useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    useEffect(() => {
        const textarea = textareaRef.current;

        textarea.style.lineHeight = "4rem";
        let lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
        let numberOfLines = textarea.scrollHeight / lineHeight;

        if (numberOfLines <= 1) {
            textarea.style.lineHeight = "4rem";
        } else {
            textarea.style.lineHeight = "1.6rem";
        };

        setTextParts((prevTextParts) => {
            const newTextParts = [...prevTextParts];
            newTextParts[0] = inputValue;
            return newTextParts;
        });
    }, [inputValue]);

    return (
        <div
            className="priority-list-item-ability"
        >
            <textarea
                className={`priority-list-item-ability-text`}
                value={inputValue}
                onChange={(e) => handleInputChange(e)}
                ref={textareaRef}
            />
        </div>
    );
};

export default PriorityListAbility;
