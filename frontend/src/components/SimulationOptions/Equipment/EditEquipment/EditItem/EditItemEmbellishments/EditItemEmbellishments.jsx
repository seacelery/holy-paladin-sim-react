import React, { useState, useContext, useEffect } from "react";
import "./EditItemEmbellishments.scss";
import Dropdown from "../../../../../Dropdown/Dropdown";
import { VersionContext } from "../../../../../../context/VersionContext";
import {
    embellishmentsData,
    ptrEmbellishmentsData,
    craftedItems,
    ptrCraftedItems,
    embellishmentItems,
    ptrEmbellishmentItems
} from "../../../../../../utils/item-level-calculations/item-slot-bonuses";
import { itemSlotsMap } from "../../../../../../utils/item-slots-map";

const EditItemEmbellishments = ({ setCharacterData, updateStats, item, selectedSlot, updateEquipment, setNewItem }) => {
    const { version } = useContext(VersionContext);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const embellishmentsDataSet = version === "live" ? embellishmentsData : ptrEmbellishmentsData;
    const embellishments = Object.keys(embellishmentsDataSet);
    const craftedItemsSet = version === "live" ? craftedItems : ptrCraftedItems;
    const embellishmentsAvailable = item.name in craftedItemsSet;

    const [selectedEmbellishment, setSelectedEmbellishment] = useState(
        !embellishmentsAvailable 
            ? "No embellishments available" 
            : item.limit && item.limit.includes("Embellished") && item.effects.length > 0
                ? item.effects[0].name
                : "No embellishment"
    );

    useEffect(() => {
        if (item) {
            console.log(item)
            setSelectedEmbellishment(
                !embellishmentsAvailable 
                ? "No embellishments available" 
                : item.limit && item.limit.includes("Embellished") && item.effects.length > 0
                    ? item.effects[0].name
                    : "No embellishment"
            );
    
            setDropdownOpen(false);
        };
    }, [item]);

    useEffect(() => {
        if (updateEquipment) {
            setCharacterData((prevState) => {
                const newState = { ...prevState };
    
                if (!selectedEmbellishment || selectedEmbellishment === "No embellishments available") {
                    return prevState;
                } else if (selectedEmbellishment === "No embellishment") {
                    newState.equipment[itemSlotsMap[selectedSlot.toLowerCase()]].effects = [];
                    newState.equipment[itemSlotsMap[selectedSlot.toLowerCase()]].limit = null;
                } else {
                    newState.equipment[itemSlotsMap[selectedSlot.toLowerCase()]].effects = [embellishmentsDataSet[selectedEmbellishment]];
                    newState.equipment[itemSlotsMap[selectedSlot.toLowerCase()]].limit = "Unique-Equipped: Embellished (2)";
                };
    
                return newState;
            });
    
            updateStats();
        } else {
            setNewItem({
                ...item,
                effects: (selectedEmbellishment === "No embellishment" || selectedEmbellishment === "No embellishments available") ? [] : [embellishmentsDataSet[selectedEmbellishment]],
                limit: selectedEmbellishment === "No embellishment" ? null : "Unique-Equipped: Embellished (2)"
            });
        };
    }, [selectedEmbellishment]);

    const toggleDropdown = () => {
        if (embellishmentsAvailable) {
            setDropdownOpen((prevState) => !prevState);
        };
    };

    return <div className="edit-item-embellishments">
        <Dropdown
            dropdownOptions={embellishments}
            selectedOption={`${embellishmentsAvailable ? (selectedEmbellishment === "No embellishment" ? "No embellishment" : `Embellished: ${selectedEmbellishment}`) : "No embellishments available"}`}
            setSelectedOption={setSelectedEmbellishment}
            isOpen={dropdownOpen}
            toggleDropdown={toggleDropdown}
            customClassName={`
                ${embellishments.length > 3 ? "edit-embellishments-dropdown-narrow" : ""} 
                edit-embellishments-dropdown
                ${embellishments.length >= 3 ? `item-rarity-${item.quality.toLowerCase()} item-rarity-${item.quality.toLowerCase()}-border` : ""}
                ${selectedEmbellishment === "No embellishment" ? "" : selectedEmbellishment === "No embellishments available" ? "no-effect-text" : "effect-text"}`
            }
            hideArrow={!embellishmentsAvailable}
        />
    </div>;
};

export default EditItemEmbellishments;
