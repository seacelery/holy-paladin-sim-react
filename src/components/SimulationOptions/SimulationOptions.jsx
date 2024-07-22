import { act, useState } from "react";
import Navbar from "./Navbar/Navbar";
import Options from "./Options/Options";
import Talents from "./Talents/Talents";
import Equipment from "./Equipment/Equipment";
import BuffsAndConsumables from "./BuffsAndConsumables/BuffsAndConsumables";
import PriorityList from "./PriorityList/PriorityList";
import StatusBar from "./StatusBar/StatusBar";
import ImportCharacterMain from "./ImportCharacterMain/ImportCharacterMain";
import "./SimulationOptions.css";

const SimulationOptions = () => {
    const [activeTab, setActiveTab] = useState("Options");

    return <div className="simulation-options-container">
        <ImportCharacterMain />
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="options-window">
            {activeTab === "Options" && <Options />}
            {activeTab === "Talents" && <Talents />}
            {activeTab === "Equipment" && <Equipment />}
            {activeTab === "Buffs & Consumables" && <BuffsAndConsumables />}
            {activeTab === "Priority List" && <PriorityList />}
        </div>
        <StatusBar />
    </div>;
};

export default SimulationOptions;
