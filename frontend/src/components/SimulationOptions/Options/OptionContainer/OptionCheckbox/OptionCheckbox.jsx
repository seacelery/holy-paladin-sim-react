import React, { useState } from "react";
import "./OptionCheckbox.scss";
import Button from "../../../../Button/Button";

const OptionCheckbox = ({ label, buttonEnabled, buttonText }) => {
    const [checked, setChecked] = useState(true);

    const handleCheckboxChange = () => {
        setChecked((prevState) => !prevState);
    };

    return (
        <>
            <div className="option-checkbox-button-container">
                <label className="option-checkbox-container">
                    {label}
                    <input
                        type="checkbox"
                        className="option-checkbox"
                        checked={checked}
                        onChange={handleCheckboxChange}
                    ></input>
                    <span className="options-checkbox-checkmark"></span>
                </label>
                {buttonEnabled && (
                    <Button
                        width="8rem"
                        height="3.5rem"
                        grow={true}
                    >
                        {buttonText}
                    </Button>
                )}
            </div>
            
        </>
    );
};

export default OptionCheckbox;
