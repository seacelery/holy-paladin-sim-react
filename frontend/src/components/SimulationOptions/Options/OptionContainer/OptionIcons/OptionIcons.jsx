import React, { useState, useRef } from "react";
import "./OptionIcons.scss";
import Tooltip from "../../../../Tooltip/Tooltip";

const OptionIcons = ({ icons, label, dataType, showTooltip = false, exclusiveSelection = true, allowDeselection = true, defaultSelectedIcons = [] }) => {
    const defaultSelectedIndices = icons.map((icon, index) => defaultSelectedIcons.includes(icon.name) ? index : null)
    const [selectedIcons, setSelectedIcons] = useState(defaultSelectedIndices);

    const [hoverElement, setHoverElement] = useState(null);
    const [tooltipText, setTooltipText] = useState(null);
    const iconRefs = useRef([]);

    const handleMouseEnter = (iconName, index) => {
        setTooltipText(iconName);
        setHoverElement(iconRefs.current[index]);
    };

    const handleMouseLeave = () => {
        setTooltipText(null);
        setHoverElement(null);
    };

    const handleClick = (index) => {
        setSelectedIcons(prevSelectedIcons => {
            if (prevSelectedIcons.includes(index) && allowDeselection) {
                return prevSelectedIcons.filter(iconIndex => iconIndex !== index);
            } else if (exclusiveSelection) {
                return [index];
            } else {
                return [...prevSelectedIcons, index];
            };
        });
    };

    return (
        <>
            <div className="option-icons-label">{label}</div>
            <div className="option-icons-container">
                {icons.map((icon, index) => (
                    <img
                        key={index}
                        className={`option-image ${selectedIcons.includes(index) ? "option-image-selected" : "option-image-unselected"}`}
                        src={icon.image}
                        alt={`${icon.name} icon`}
                        draggable="false"
                        {...{ [`data-${dataType}`]: icon.name }}
                        ref={element => iconRefs.current[index] = element}
                        onMouseEnter={() => handleMouseEnter(icon.name, index)}
                        onMouseLeave={handleMouseLeave}
                        onClick={() => handleClick(index)}
                    />
                ))}
                {hoverElement && showTooltip && (
                    <Tooltip
                        type="option"
                        text={tooltipText}
                        hoverElement={hoverElement}
                    />
                )}
            </div>
        </>
    );
};

export default OptionIcons;
