import React, { useState, useRef, useEffect } from "react";
import "./PriorityListAbility.scss";
import AbilitySuggest from "./AbilitySuggest/AbilitySuggest";
import { abilityNames } from "../../../../../../data/breakdown-objects";

const PriorityListAbility = ({ text, setTextParts }) => {
    const [inputValue, setInputValue] = useState(text);
    const textareaRef = useRef(null);
    const [suggestionsVisible, setSuggestionsVisible] = useState(false);

    useEffect(() => {
        setInputValue(text);
    }, [text]);

    const handleInputChange = (e) => {
        let value = e.target.value;

        const lowercaseAbilityNames = abilityNames.map((ability) => ability.toLowerCase());
        if (lowercaseAbilityNames.includes(value.toLowerCase())) {
            
            value = value
                .split(" ")
                .map((word) => {
                    if (!["of", "the", "on"].includes(word.toLowerCase())) {
                        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
                    }
                    return word;
                })
                .join(" ");
        };

        updateTextValue(value);
        setSuggestionsVisible(!lowercaseAbilityNames.includes(value.toLowerCase()));
    };

    const updateTextValue = (value) => {
        setInputValue(value);
        setTextParts((prevTextParts) => {
            const newTextParts = [...prevTextParts];
            newTextParts[0] = value;
            return newTextParts;
        });
    };

    useEffect(() => {
        const textarea = textareaRef.current;
        textarea.style.lineHeight = "4rem";
        const lineHeight = parseInt(window.getComputedStyle(textarea).lineHeight);
        const numberOfLines = textarea.scrollHeight / lineHeight;

        if (numberOfLines <= 1) {
            textarea.style.lineHeight = "4rem";
        } else {
            textarea.style.lineHeight = "2rem";
        }
    }, [inputValue]);

    return (
        <div className="priority-list-item-ability">
            <textarea
                className="priority-list-item-ability-text"
                value={inputValue}
                onChange={handleInputChange}
                ref={textareaRef}
            />
            <AbilitySuggest 
                visible={suggestionsVisible}
                setVisible={setSuggestionsVisible}
                text={inputValue}
                setText={updateTextValue}
                onClose={() => setSuggestionsVisible(false)}
            />
        </div>
    );
};

export default PriorityListAbility;
