import React from "react";
import "./Healing.scss";
import GraphResource from "../GraphResource/GraphResource";
import HealingTable from "./HealingTable/HealingTable";

const Healing = ({ simulationResult }) => {
    return <div className="breakdown-container">
        <GraphResource />
        <HealingTable simulationResult={simulationResult} />
    </div>;
};

export default Healing;
