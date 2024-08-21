import React from "react";
import "./LoadoutEquipment.scss";
import LoadoutEquipmentItem from "./LoadoutEquipmentItem/LoadoutEquipmentItem";

const LoadoutEquipment = ({ equipment }) => {
    const sortEquipment = (equipmentArray) => {
        const equipmentOrder = ["head", "neck", "shoulder", "back", "chest", "wrist", "hands", "waist", "legs", "feet", "finger_1", "finger_2", "trinket_1", "trinket_2", "main_hand", "off_hand"];

        let sortedEquipment = equipmentArray.sort((a, b) => {
            const A = equipmentOrder.indexOf(a[0]);
            const B = equipmentOrder.indexOf(b[0]);
            return A - B;
        });
    
        sortedEquipment = sortedEquipment.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        return sortedEquipment;
    };

    const sortedEquipment = sortEquipment(Object.entries(equipment));
    
    return <div className="loadout-container">
        <div className="loadout-header">Equipment</div>
        <div className="loadout-equipment">
            {Object.entries(sortedEquipment).map(([slot, itemData]) => {
                return <LoadoutEquipmentItem itemData={itemData} key={slot} />
            })}
        </div>
    </div>
};

export default LoadoutEquipment;
