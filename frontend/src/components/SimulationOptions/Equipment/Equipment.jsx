import React, { useState } from "react";
import "./Equipment.scss";
import EquipmentDisplay from "./EquipmentDisplay/EquipmentDisplay";
import StatsDisplay from "./StatsDisplay/StatsDisplay";
import EditEquipment from "./EditEquipment/EditEquipment";

const Equipment = () => {
    const [selectedItem, setSelectedItem] = useState(null);
    console.log(selectedItem)

    return (
        <div className="options-tab-content equipment-content">
            <div className="equipment-left">
                <EquipmentDisplay selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            </div>

            <div className="equipment-right">
                <StatsDisplay />
                <EditEquipment />
            </div>
        </div>
    );
};

export default Equipment;
