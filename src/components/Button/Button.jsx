import React from "react";
import "./Button.scss";

const Button = ({ children, width, height, grow, onClick, ...props }) => {
    const styles = {
        width: width,
        height: height,
    };

    return (
        <button className={`button ${grow ? "button-grow" : ""}`} onClick={onClick} style={styles} {...props}>
            {children}
        </button>
    );
};

export default Button;
