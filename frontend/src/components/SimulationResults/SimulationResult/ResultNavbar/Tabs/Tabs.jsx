import React from "react";
import "./Tabs.scss";

const Tabs = ({ activeTab, setActiveTab }) => {
    const tabs = [
        "Healing",
        "Buffs",
        "Resources",
        "Timeline",
        "Cooldowns",
        "Distribution",
        "Loadout"
    ];

    return (
        <>
            <nav className="result-navbar">
                {tabs.map((tab, index) => (
                    <div
                        key={index}
                        className={`result-tab ${
                            activeTab === tab ? "active" : "inactive"
                        }`}
                        onClick={() => setActiveTab(tab)}
                    >
                        {tab}
                    </div>
                ))}
            </nav>
        </>
    );
};

export default Tabs;
