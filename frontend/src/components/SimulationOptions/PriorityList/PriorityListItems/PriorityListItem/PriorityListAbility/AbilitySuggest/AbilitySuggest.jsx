import React, { useRef, useEffect } from "react";
import "./AbilitySuggest.scss";
import { abilityNames } from "../../../../../../../data/breakdown-objects";

const AbilitySuggest = ({ visible, setVisible, text, setText, onClose }) => {
    const suggestions = abilityNames.filter((ability) => ability.toLowerCase().includes(text.toLowerCase()));

    const handleSuggestionClick = (suggestion) => {
        setVisible(false);
        setText(suggestion);
    };

    const modalRef = useRef(null);

    const handleClickOutside = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            onClose();
        };
    };

    useEffect(() => {
        if (onClose) {
            document.addEventListener("mousedown", handleClickOutside);
        };

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <>
            {visible && (
                <ul className="ability-suggestions-container" ref={modalRef}>
                    {suggestions.map((suggestion, index) => {
                        return (
                            <li key={index} className="ability-suggestion" onClick={() => handleSuggestionClick(suggestion)}>
                                {suggestion}
                            </li>
                        );
                    })}
                </ul>
            )}
        </>
    );
};

export default AbilitySuggest;
