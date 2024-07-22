import React from "react";
import "./OptionContainer.scss";
import OptionSlider from "./OptionSlider/OptionSlider";
import OptionIcons from "./OptionIcons/OptionIcons";
import OptionCheckbox from "./OptionCheckbox/OptionCheckbox";

const OptionContainer = ({ type, props }) => {
    return <div className="option-container">
        {type === "slider" && (
            <OptionSlider {...props} />
        )}
        { type === "icons" && (
            <OptionIcons {...props} />
        )}
        { type === "checkbox" && (
            <OptionCheckbox {...props} />
        )}
    </div>;
};

export default OptionContainer;
