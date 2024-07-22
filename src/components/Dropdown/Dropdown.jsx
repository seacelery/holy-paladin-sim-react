import React, { useEffect, useState, useRef } from "react";
import "./Dropdown.css";
import { FaChevronDown } from "react-icons/fa";

const Dropdown = ({ dropdownOptions, isOpen, toggleDropdown, ...props }) => {
    const { selectedOption, setSelectedOption } = props;
    const selectedOptionRef = useRef(null);

    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        const foundOption = dropdownOptions.find((option) =>
            option.toLowerCase().startsWith(searchString.toLowerCase())
        );
        if (foundOption && isOpen) {
            setSelectedOption(foundOption);
            if (selectedOptionRef.current) {
                selectedOptionRef.current.scrollIntoView({
                    block: "start"
                });
            };
        };
    }, [searchString]);

    useEffect(() => {
        setSearchString("");
    }, [isOpen]);

    const formatOption = (option) => {
        const capitalisedOption = searchString
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ");

        const start = capitalisedOption;
        const end = option.slice(capitalisedOption.length);

        return (
            <>
                <span className="highlighted-text">
                    {start.replace(/ /g, "\u00A0")}
                </span>
                <span>{end.replace(/ /g, "\u00A0")}</span>
            </>
        );
    };

    const handleKeypress = (e) => {
        let remainingOptions = dropdownOptions.filter((option) =>
            option.toLowerCase().startsWith(searchString.toLowerCase())
        );

        if (e.key.match(/^[a-zA-Z\s]$/)) {
            for (const option of remainingOptions) {
                if (
                    e.key.toLowerCase() ===
                    option[searchString.length].toLowerCase()
                ) {
                    setSearchString(
                        (prevSearchString) => prevSearchString + e.key
                    );
                    break;
                };
            };
        };

        if (e.key === "Backspace") {
            setSearchString((prevSearchString) =>
                prevSearchString.slice(0, -1)
            );
        };

        if (e.key === "Enter") {
            setSelectedOption(remainingOptions[0]);
            toggleDropdown();
            setSearchString("");
        };
    };

    const handleDropdownOpen = () => {
        toggleDropdown();
        setSearchString("");
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        toggleDropdown();
        setSearchString("");
    };

    return (
        <>
            <div
                type="text"
                className="dropdown-input-field"
                translate="no"
                tabIndex="0"
                onKeyDown={handleKeypress}
            >
                <div
                    className="dropdown-selected-input"
                    onClick={handleDropdownOpen}
                >
                    {formatOption(selectedOption)}
                </div>
                <FaChevronDown className="dropdown-arrow-down"></FaChevronDown>
                {isOpen && (
                    <div className="dropdown-options-container">
                        {dropdownOptions.map((option, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`dropdown-option ${
                                        selectedOption === option
                                            ? "dropdown-option-highlighted"
                                            : ""
                                    }`}
                                    onClick={() => handleOptionClick(option)}
                                    ref={
                                        option.toLowerCase() ===
                                        selectedOption.toLowerCase()
                                            ? selectedOptionRef
                                            : null
                                    }
                                >
                                    {option}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </>
    );
};

export default Dropdown;
