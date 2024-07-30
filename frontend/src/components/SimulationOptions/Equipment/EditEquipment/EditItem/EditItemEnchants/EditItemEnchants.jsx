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

const EditItemEnchants = ({ setCharacterData, item, selectedSlot, updateEquipment }) => {
    const { version } = useContext(VersionContext);
    const [selectedEnchant, setSelectedEnchant] = useState(
        item.enchantments
            ? formatEnchantName(item.enchantments[0])
            : "No enchants available"
    );
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const enchants =
        version === "live"
            ? itemSlotBonuses[selectedSlot].enchants
            : ptrItemSlotBonuses[selectedSlot].enchants;

    const toggleDropdown = () => {
        if (enchants.length > 1) {
            setDropdownOpen((prevState) => !prevState);
        };
    };

    useEffect(() => {
        setSelectedEnchant(
            item.enchantments
                ? formatEnchantName(item.enchantments[0])
                : "No enchants available"
        );
        setDropdownOpen(false);
    }, [item]);

    useEffect(() => {
        setCharacterData((prevState) => {
            if (!selectedEnchant || selectedEnchant === "No enchants available") {
                return prevState;
            };

            const newState = { ...prevState };
            newState.equipment[itemSlotsMap[selectedSlot.toLowerCase()]].enchantments = [`Enchanted: ${[selectedEnchant]}`];
            return newState;
        });
    }, [selectedEnchant]);

    return (
        <div className="edit-item-enchants">
            <Dropdown
                dropdownOptions={enchants}
                selectedOption={selectedEnchant}
                setSelectedOption={setSelectedEnchant}
                isOpen={dropdownOpen}
                toggleDropdown={toggleDropdown}
                customClassName={`
                    ${enchants.length > 3 ? "edit-enchants-dropdown-narrow" : ""} 
                    edit-enchants-dropdown
                    border-bottom-${item.quality.toLowerCase()}`
                }
            />
        </div>
    );
};

export default EditItemEnchants;
