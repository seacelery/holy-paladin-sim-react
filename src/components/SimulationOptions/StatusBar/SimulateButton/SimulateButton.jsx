import React from "react";
import "./SimulateButton.css";
import Button from "../../../Button/Button";

const SimulateButton = () => {
    

    return <div className="simulate-button-container">
        <input className="simulation-name-text-input" defaultValue="Simulation 1"></input>
        <Button className="simulate-button" grow={false}>Simulate</Button>
    </div>;
};

export default SimulateButton;
