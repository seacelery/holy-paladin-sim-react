import { useState } from "react";
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
    const [characterImported, setCharacterImported] = useState(false);
    const [activeTab, setActiveTab] = useState("Options");

    return <div className="simulation-options-container">
        {!characterImported && (
            <ImportCharacterMain setCharacterImported={setCharacterImported} />
        )}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} characterImported={characterImported} />
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
