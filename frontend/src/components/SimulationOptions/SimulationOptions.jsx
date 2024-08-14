import { useState } from "react";
import Navbar from "./Navbar/Navbar";
import Options from "./Options/Options";
import Talents from "./Talents/Talents";
import Equipment from "./Equipment/Equipment";
import Buffs from "./Buffs/Buffs";
import PriorityList from "./PriorityList/PriorityList";
import StatusBar from "./StatusBar/StatusBar";
import ImportCharacterMain from "./ImportCharacterMain/ImportCharacterMain";
import Loader from "../Loader/Loader";
import "./SimulationOptions.css";

const SimulationOptions = ({ characterImported, setCharacterImported, activeTab, setActiveTab }) => {
    const [importing, setImporting] = useState(false);

    return <div className="simulation-options-container">
        {!characterImported && (
            <ImportCharacterMain setCharacterImported={setCharacterImported} />
        )}
        {importing && (
            <>
                <div className="import-overlay">
                    <Loader loading={importing} size="large" />
                </div>
                
            </>
        )}
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} characterImported={characterImported} setImporting={setImporting} />
        <div className="options-window">
            {activeTab === "Options" && <Options />}
            {activeTab === "Talents" && <Talents />}
            {activeTab === "Equipment" && <Equipment />}
            {activeTab === "Buffs & Consumables" && <Buffs />}
            {activeTab === "Priority List" && <PriorityList />}
        </div>
        <StatusBar />
    </div>;
};

export default SimulationOptions;
