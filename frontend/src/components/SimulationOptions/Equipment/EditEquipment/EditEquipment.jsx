import React, { useState, useEffect } from "react";
import "./EditEquipment.scss";
import Dropdown from "../../../Dropdown/Dropdown";
import EditItem from "./EditItem/EditItem";
import { itemSlotsMap } from "../../../../utils/item-slots-map";

const EditEquipment = ({ equipmentData, selectedSlot, setSelectedSlot, selectedItem, setSelectedItem }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [newItem, setNewItem] = useState(null);

    const selectedItemRarityStyle = selectedItem ? `var(--rarity-${selectedItem.quality.toLowerCase()})` : "var(--rarity-common)";
    const newItemRarityStyle = newItem ? `var(--rarity-${newItem.quality.toLowerCase()})` : "var(--rarity-common)";

    const slots = [
        "Head",
        "Shoulders",
        "Necklace",
        "Cloak",
        "Gloves",
        "Body",
        "Bracers",
        "Main Hand",
        "Off Hand",
        "Belt",
        "Legs",
        "Ring 1",
        "Ring 2",
        "Trinket 1",
        "Trinket 2",
    ];

    const toggleDropdown = () => {
        setDropdownOpen(prevState => !prevState);
    };

    useEffect(() => {
        if (selectedSlot) {
            setSelectedItem(equipmentData[itemSlotsMap[selectedSlot.toLowerCase()]])
        };
    }, [selectedSlot])

    return <div className="edit-equipment-container">
        <Dropdown
            dropdownOptions={slots}
            selectedOption={selectedSlot}
            setSelectedOption={setSelectedSlot}
            isOpen={dropdownOpen}
            toggleDropdown={toggleDropdown}
            customClassName={"edit-equipment-dropdown"}
        ></Dropdown>

        <div className="edit-equipment">
            <div className="edit-item-container">
                <div className="edit-item-header">Currently equipped: <span style={{color: selectedItemRarityStyle}}>{selectedItem.name}</span></div>
                <EditItem selectedItem={selectedItem} selectedSlot={selectedSlot} />
            </div>

            <div className="edit-item-container">
                <div className="edit-item-header" style={{color: newItemRarityStyle}}>{newItem?.name}</div>
                <EditItem selectedItem={newItem} selectedSlot={selectedSlot} />
            </div>
        </div>
    </div>;
};

export default EditEquipment;
