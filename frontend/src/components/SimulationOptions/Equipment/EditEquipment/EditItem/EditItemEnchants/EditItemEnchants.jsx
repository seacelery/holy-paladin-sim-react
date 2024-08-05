import React, { useState, useContext, useEffect } from "react";
import "./EditItemEnchants.scss";
import Dropdown from "../../../../../Dropdown/Dropdown";
import { VersionContext } from "../../../../../../context/VersionContext";
import {
    itemSlotBonuses,
    ptrItemSlotBonuses,
} from "../../../../../../utils/item-level-calculations/item-slot-bonuses";
import { formatEnchantName } from "../../../formatEquipment";
import { itemSlotsMap } from "../../../../../../utils/item-slots-map";

const EditItemEnchants = ({ setCharacterData, updateStats, item, selectedSlot, updateEquipment, setNewItem }) => {
    const { version } = useContext(VersionContext);

    const enchants =
        version === "live"
            ? itemSlotBonuses[selectedSlot].enchants
            : ptrItemSlotBonuses[selectedSlot].enchants;

    const [selectedEnchant, setSelectedEnchant] = useState(
        item.enchantments && item.enchantments.length > 0
            ? formatEnchantName(item.enchantments[0])
            : enchants.length > 0
                ? "No enchant"
                : ""
    );

    const [dropdownOpen, setDropdownOpen] = useState(false);
    

    const toggleDropdown = () => {
        if (enchants.length > 1) {
            setDropdownOpen((prevState) => !prevState);
        };
    };

    useEffect(() => {
        setSelectedEnchant(
            item.enchantments && item.enchantments.length > 0
            ? formatEnchantName(item.enchantments[0])
            : enchants.length > 0
                ? "No enchant"
                : ""
        );
        setDropdownOpen(false);
    }, [item]);

    useEffect(() => {
        if (updateEquipment) {
            setCharacterData((prevState) => {
                const newState = { ...prevState };
    
                if (!selectedEnchant) {
                    return prevState;
                } else if (selectedEnchant === "No enchant") {
                    newState.equipment[itemSlotsMap[selectedSlot.toLowerCase()]].enchantments = [];
                } else {
                    newState.equipment[itemSlotsMap[selectedSlot.toLowerCase()]].enchantments = [`Enchanted: ${[selectedEnchant]}`];
                };
    
                return newState;
            });
    
            updateStats();
        } else { 
            setNewItem({
                ...item,
                enchantments: selectedEnchant === "No enchant" ? [] : [`Enchanted: ${[selectedEnchant]}`]
            });
        };
    }, [selectedEnchant]);

    return (
        <div className="edit-item-enchants">
            <Dropdown
                dropdownOptions={enchants}
                selectedOption={`${enchants.length > 1 ? selectedEnchant : "No enchants available"}`}
                setSelectedOption={setSelectedEnchant}
                isOpen={dropdownOpen}
                toggleDropdown={toggleDropdown}
                customClassName={`
                    ${enchants.length > 3 ? "edit-enchants-dropdown-narrow" : ""} 
                    edit-enchants-dropdown
                    ${`item-rarity-${item.quality.toLowerCase()}`}
                    ${selectedEnchant === "No enchant" ? "" : selectedEnchant === "" ? "no-enchants-text" : "enchanted-text"}`
                }
                hideArrow={enchants.length <= 1}
            />
        </div>
    );
};

export default EditItemEnchants;
