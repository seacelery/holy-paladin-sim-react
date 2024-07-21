import React from "react";
import "./ImportCharacter.css";
import Button from "../../../Button/Button";

const ImportCharacter = () => {
    return (
        <div className="import-character-container">
            <div className="import-character-options-container">
                <select className="character-input-field character-region-input">
                    <option value="EU">EU</option>
                    <option value="US">US</option>
                </select>
                <select
                    type="text"
                    className="character-input-field character-realm-input"
                    translate="no"
                ></select>
                <input
                    type="text"
                    className="character-input-field character-name-input"
                ></input>
                <Button width="7.5rem" height="2.7rem" grow={false} className="import-button">
                    Import
                </Button>
            </div>
        </div>
    );
};

export default ImportCharacter;
