import React from "react";
import "./ResultNavbar.scss";
import Tabs from "./Tabs/Tabs";

const ResultNavbar = ({ activeTab, setActiveTab }) => {
    return <div className="options-row-container">
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>;
};

export default ResultNavbar;
