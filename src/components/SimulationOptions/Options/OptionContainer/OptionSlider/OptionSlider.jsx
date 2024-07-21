import React, { useState } from "react";
import "./OptionSlider.scss";

const OptionSlider = ({ sliderType, name, min, max, step, defaultValue }) => {
    const [value, setValue] = useState(defaultValue);
    const formattedName = name.toLowerCase().replace(" ", "-");

    const handleValueChange = (e) => {
        setValue(e.target.value);
    };

    const formatValue = (value) => {
        if (sliderType === "integer" || sliderType === "float") {
            return value;
        } else if (sliderType === "percentage") {
            return `${value}%`;
        } else if (sliderType === "time") {
            const minutes = Math.floor(value / 60);
            const seconds = value % 60;
            return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
        };
    };

    return (
        <>
            <label
                htmlFor={`${formattedName}-option`}
                className="option-slider-label"
            >
                {name}
            </label>
            <div className="slider-container">
                <div className="slider-value-container">
                    <div id={`${formattedName}-value`} className="slider-value">
                        {formatValue(value)}
                    </div>
                </div>
                <input
                    type="range"
                    id={`${formattedName}-option`}
                    className="options-option option-slider"
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleValueChange}
                ></input>
            </div>
        </>
    );
};

export default OptionSlider;
