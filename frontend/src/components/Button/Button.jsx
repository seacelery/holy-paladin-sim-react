import React from "react";
import "./Button.scss";

const Button = ({ children, width, height, margin, fontSize, grow, onClick, customClassName, ...props }) => {
    const styles = {
        width: width,
        height: height,
        margin: margin,
        fontSize: fontSize
    };

    return (
        <button className={`button ${grow ? "button-grow" : ""} ${customClassName}`} onClick={onClick} style={styles} {...props}>
            {children}
        </button>
    );
};

export default Button;
