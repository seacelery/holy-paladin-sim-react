import React, { useState, useContext, useEffect } from "react";
import "./StatusBar.css";
import { FaRegCheckCircle } from "react-icons/fa";
import SimulateButton from "./SimulateButton/SimulateButton";
import { CharacterDataContext } from "../../../context/CharacterDataContext";

const StatusBar = () => {
    // const [savedDataStatus, setSavedDataStatus] = useState(false);
    // const { characterData } = useContext(CharacterDataContext);

    // useEffect(() => {
    //     setSavedDataStatus(true);
    //     const timer = setTimeout(() => {
    //         setSavedDataStatus(false);
    //     }, 5000);
    //     return () => clearTimeout(timer);
    // }, [characterData]);

    return (
        <>
            <div className="options-status-bar">
                {/* <div className="saved-data-status" style={{ opacity: savedDataStatus ? 1 : 0 }}>
                    <FaRegCheckCircle className="saved-data-status-check"></FaRegCheckCircle>
                    <span className="saved-data-status-text">Changes saved</span>
                </div> */}

                <SimulateButton />
            </div>
        </>
    );
};

export default StatusBar;
