import React, { useState, useEffect } from "react";
import "./EditItemTrinkets.scss";
import { trinketsWithOptions, defaultTrinketOption } from "../../../../../../data/trinket-options";
import { itemSlotsMap } from "../../../../../../utils/item-slots-map";
import Dropdown from "../../../../../Dropdown/Dropdown";

const EditItemTrinkets = ({ setCharacterData, selectedSlot, item, trinketOptions, updateEquipment, setNewItem }) => {
    const trinketEffect = item.effects[0];

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggleDropdown = () => setDropdownOpen(prevState => !prevState);
    
    useEffect(() => {
        if (!trinketEffect.trinket_options && Object.keys(trinketsWithOptions).includes(item.name)) {
            setCharacterData((prevData) => {
                const newCharacterData = { ...prevData };
                newCharacterData.equipment[itemSlotsMap[selectedSlot.toLowerCase()]].effects[0].trinket_options = defaultTrinketOption[item.name];
                return newCharacterData;
            });
        }
    }, [item]);

    const handleOptionChange = (option) => {
        if (updateEquipment) {
            setCharacterData((prevData) => {
                const newCharacterData = { ...prevData };
                newCharacterData.equipment[itemSlotsMap[selectedSlot.toLowerCase()]].effects[0].trinket_options = option;
                return newCharacterData;
            });
        } else {
            setNewItem((prevItem) => {
                const newItem = { ...prevItem };
                newItem.effects[0].trinket_options = option;
                return newItem;
            });
        };
    };

    return <div className="edit-item-trinkets">
        <div className="edit-item-trinket-effect" style={{ height: Object.keys(trinketsWithOptions).includes(item.name) ? "10.7rem" : "100%" }}>{trinketEffect?.description.replaceAll("*", "")}</div>

        {Object.keys(trinketsWithOptions).includes(item.name) && <Dropdown
            dropdownOptions={trinketsWithOptions[item.name]}
            selectedOption={item.effects[0].trinket_options}
            setSelectedOption={handleOptionChange}
            isOpen={dropdownOpen}
            toggleDropdown={toggleDropdown}
            customClassName={`trinket-option-dropdown trinket-option-${item.quality.toLowerCase()}`}
        ></Dropdown>}
    </div>;
};

export default EditItemTrinkets;
