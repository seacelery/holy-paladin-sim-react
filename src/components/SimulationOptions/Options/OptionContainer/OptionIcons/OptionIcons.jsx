import React from "react";
import "./OptionIcons.scss";

const OptionIcons = ({ icons, dataType }) => {
    return (
        <>
            <div className="option-icons-label">{dataType[0].toUpperCase() + dataType.slice(1).toLowerCase()}:</div>
            <div className="option-icons-container">
                {icons.map((icon, index) => (
                    <img
                        key={index}
                        className="option-image option-image-unselected"
                        src={icon.image}
                        alt={`${icon.name} icon`}
                        draggable="false"
                        {...{ [`data-${dataType}`]: icon.name }} 
                    />
                ))}
            </div>
        </>
    );
};

export default OptionIcons;
