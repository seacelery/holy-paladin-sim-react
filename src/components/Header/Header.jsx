import React from "react";
import Button from "../Button/Button";
import "./Header.scss";

const Header = () => {
    return (
        <div className="header-container">
            <Button width="140px" height="32px" grow={false}>
                Import Template
            </Button>

            <div className="version-toggle-container">
                <div className="version-input">
                    <div className="version-selected-version"></div>
                    <i className="fa-solid fa-chevron-down custom-version-select-arrow-down"></i>
                </div>
                <div className="version-suggestions">
                    <div className="version-option">Patch 10.2.7</div>
                    <div className="version-option">The War Within</div>
                </div>
            </div>

            <div className="theme-toggle-container">                   
                <div className="theme-toggle">
                    <div className="theme-circle">
                        <i className="fa-solid fa-moon theme-icon-hidden theme-moon-icon"></i>
                        <img className="theme-paladin-icon" src="src\assets\custom-icons\paladin-pink.png"/>
                    </div>                        
                </div>
            </div>
        </div> 
    );
};

export default Header;
