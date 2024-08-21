import React, { useState, useEffect } from "react";
import "./Tooltip.scss";

const Tooltip = ({ type, children, hoverElement, customClassName = "" }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (!hoverElement) return;

        const handleMouseMove = (e) => {
            const xOffset = 15;
            const yOffset = 15;
            const newPosition = {
                x: e.clientX + xOffset,
                y: e.clientY + yOffset,
            };
            setPosition(newPosition);
            setVisible(true);
        };

        const handleMouseOut = () => {
            setVisible(false);
        };

        hoverElement.addEventListener("mousemove", handleMouseMove);
        hoverElement.addEventListener("mouseout", handleMouseOut);

        return () => {
            hoverElement.removeEventListener("mousemove", handleMouseMove);
            hoverElement.removeEventListener("mouseout", handleMouseOut);
        };
    }, [hoverElement]);

    const style = {
        display: visible ? "block" : "none",
        left: position.x,
        top: position.y,
    };

    return (
        <div className={`tooltip ${customClassName}`} style={style}>
            {children}
        </div>
    );
};

export default Tooltip;
