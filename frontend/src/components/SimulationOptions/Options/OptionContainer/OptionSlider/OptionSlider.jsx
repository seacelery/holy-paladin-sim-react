import React, { useState, useRef, useEffect } from "react";
import "./OptionSlider.scss";
import { FaCircleInfo } from "react-icons/fa6";
import Tooltip from "../../../../Tooltip/Tooltip";

const OptionSlider = ({
    sliderType,
    name,
    min,
    max,
    step,
    defaultValue,
    showInfo = false,
    tooltipText = null,
    updateParameter = null,
    variableSteps = [],
    snapValues = [],
    snapRange = 0
}) => {
    const formatValue = (value) => {
        if (sliderType === "integer" || sliderType === "float") {
            return value;
        } else if (sliderType === "percentage") {
            return `${value}%`;
        } else if (sliderType === "time") {
            const minutes = Math.floor(value / 60);
            const seconds = value % 60;
            return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
        }
    };

    const getStepAmount = (currentValue) => {
        if (variableSteps.length > 0) {
            for (let i = 0; i < variableSteps.length; i++) {
                if (currentValue >= variableSteps[i].threshold) {
                    return variableSteps[i].step;
                };
            };
        };

        return step;
    };

    const getClosestSnapValue = (currentValue) => {
        let closestSnap = currentValue;

        snapValues.forEach((snapValue) => {
            if (Math.abs(currentValue - snapValue) <= snapRange) {
                closestSnap = snapValue;
            };
        });

        return closestSnap;
    };

    const handleSliderChange = (e) => {
        let newValue = parseFloat(e.target.value);
    
        newValue = getClosestSnapValue(newValue);
        let step = getStepAmount(newValue);
    
        newValue = Math.round(newValue / step) * step;
    
        setValue(newValue);
        setInputValue(formatValue(newValue));
    };

    const handleInputChange = (e) => {
        const newValue = e.target.value;
        setInputValue(newValue);

        if (isValidInput(newValue)) {
            let parsedValue = parseValue(newValue);

            if (
                !isNaN(parsedValue) &&
                parsedValue >= min &&
                parsedValue <= max
            ) {
                setValue(parsedValue);
            };
        };
    };

    const handleInputEnter = (e) => {
        if (e.key === "Enter") {
            e.target.blur();
        };
    };

    const parseValue = (value) => {
        if (sliderType === "integer") {
            return parseInt(value);
        } else if (sliderType === "float") {
            return parseFloat(value);
        } else if (sliderType === "percentage") {
            return parseInt(value.replace("%", ""));
        } else if (sliderType === "time") {
            const [minutes, seconds] = value.split(":").map(Number);
            return minutes * 60 + (seconds || 0);
        };
    };

    const isValidInput = (value) => {
        if (sliderType === "integer") {
            return /^\d*$/.test(value);
        } else if (sliderType === "float") {
            return /^-?\d*\.?\d*$/.test(value);
        } else if (sliderType === "percentage") {
            return /^\d*%?$/.test(value);
        } else if (sliderType === "time") {
            return /^(\d*:\d{0,2})?$/.test(value);
        };
    };

    const [value, setValue] = useState(defaultValue);
    const [inputValue, setInputValue] = useState(formatValue(defaultValue));
    const formattedName = name.toLowerCase().replace(" ", "-");

    const [hoverElement, setHoverElement] = useState(null);
    const infoIconRef = useRef(null);
    useEffect(() => {
        setHoverElement(infoIconRef.current);
    }, []);

    useEffect(() => {
        if (updateParameter) {
            updateParameter(value);
        }
    }, [value]);

    return (
        <>
            <div className="option-slider-label-container">
                <label
                    htmlFor={`${formattedName}-option`}
                    className="option-slider-label"
                >
                    {name}
                </label>
                {showInfo && (
                    <div className="option-slider-info" ref={infoIconRef}>
                        <FaCircleInfo className="option-info-circle" />
                        {hoverElement && (
                            <Tooltip type="option" hoverElement={hoverElement}>
                                {tooltipText}
                            </Tooltip>
                        )}
                    </div>
                )}
            </div>

            <div className="slider-container">
                <div className="slider-value-container">
                    <input
                        id={`${formattedName}-value`}
                        className="slider-value"
                        value={inputValue}
                        onChange={handleInputChange}
                        onBlur={() => setInputValue(formatValue(value))}
                        onKeyDown={handleInputEnter}
                    />
                </div>
                <input
                    type="range"
                    id={`${formattedName}-option`}
                    className="options-option option-slider"
                    value={value}
                    min={min}
                    max={max}
                    step={getStepAmount(value)}
                    onChange={handleSliderChange}
                />
            </div>
        </>
    );
};

export default OptionSlider;
