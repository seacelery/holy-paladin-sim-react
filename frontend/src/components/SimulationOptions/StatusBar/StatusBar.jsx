import React from "react";
import "./StatusBar.css";
import { FaRegCheckCircle } from "react-icons/fa";
import SimulateButton from "./SimulateButton/SimulateButton";

const StatusBar = () => {
    return (
        <>
            <div className="options-status-bar">
                <div className="saving-data-status">Saving changes...</div>
                <div className="saved-data-status">
                    <FaRegCheckCircle className="saved-data-status-check"></FaRegCheckCircle>
                    Changes saved
                </div>

                <SimulateButton />

                {/* <div id="simulate-button-container">
                    <input className="simulation-name-text-input"></input>
                    <button className="simulate-button">Simulate</button>

                    <div id="simulate-button-error-modal" class="error-modal">
                        <div id="simulate-button-error-modal-message">Add a priority list before simulating</div>
                    </div>

                    <div id="simulation-progress-bar-container">                      
                        <div id="simulation-progress-bar"></div>
                        <span id="simulation-progress-bar-text"></span>
                        <div class="simulation-progress-bar-check-container"> 
                            <svg class="simulation-progress-bar-checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> 
                                <circle class="simulation-progress-bar-checkmark-circle" cx="26" cy="26" r="25" fill="none"/> 
                                <path class="simulation-progress-bar-checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>                    
                            </svg>

                            <svg class="simulation-progress-bar-cancel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52" style="display:none"> 
                                <circle class="simulation-progress-bar-cancel-circle" cx="26" cy="26" r="25" fill="none"/> 
                                <path class="simulation-progress-bar-cancel-x" fill="none" d="M16 16 L36 36 M36 16 L16 36"/>
                            </svg>
                        </div>
                    </div>          
                </div> */}
            </div>
        </>
    );
};

export default StatusBar;
