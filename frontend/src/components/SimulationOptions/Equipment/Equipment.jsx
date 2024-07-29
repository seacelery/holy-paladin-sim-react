import React, { useState, useContext } from "react";
import "./Equipment.scss";
import EquipmentDisplay from "./EquipmentDisplay/EquipmentDisplay";
import StatsDisplay from "./StatsDisplay/StatsDisplay";
import EditEquipment from "./EditEquipment/EditEquipment";
import { CharacterDataContext } from "../../../context/CharacterDataContext";

const Equipment = () => {
    const { characterData } = useContext(CharacterDataContext);
    const equipmentData = characterData.equipment;
    const statsData = characterData.stats;

    const [selectedSlot, setSelectedSlot] = useState("Head");
    const [selectedItem, setSelectedItem] = useState(equipmentData.head);

    return (
        <div className="options-tab-content equipment-content">
            <div className="equipment-left">
                <EquipmentDisplay equipmentData={equipmentData} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setSelectedSlot={setSelectedSlot} />
            </div>

            <div className="equipment-right">
                <StatsDisplay statsData={statsData} />
                <EditEquipment equipmentData={equipmentData} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            </div>
        </div>
    );
};

export default Equipment;
