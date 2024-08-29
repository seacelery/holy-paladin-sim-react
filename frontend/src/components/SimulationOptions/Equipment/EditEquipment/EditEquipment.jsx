import React, { useState, useEffect } from "react";
import "./EditEquipment.scss";
import Dropdown from "../../../Dropdown/Dropdown";
import EditItem from "./EditItem/EditItem";
import Searchbar from "../../../Searchbar/Searchbar";
import Button from "../../../Button/Button";
import {
    slots,
    itemSlotsMap,
    selectedSlotToItemDataSlot
} from "../../../../utils/item-slots-map";
import itemData from "../../../../data/item-data.js";

const EditEquipment = ({
    setCharacterData,
    updateStats,
    equipmentData,
    selectedSlot,
    setSelectedSlot,
    selectedItem,
    setSelectedItem,
}) => {
    const filterItemDataBySlot = () => {
        return itemData.filter((item) => {
            return item.item_slot.toLowerCase() === selectedSlotToItemDataSlot[selectedSlot.toLowerCase()];
        });
    };

    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [newItem, setNewItem] = useState(null);
    const [slotItemData, setSlotItemData] = useState(filterItemDataBySlot());

    const selectedItemRarityStyle = selectedItem
        ? `var(--rarity-${selectedItem.quality.toLowerCase()})`
        : "var(--border-colour-3)";
    const newItemRarityStyle = newItem
        ? `var(--rarity-${newItem.quality.toLowerCase()})`
        : "var(--border-colour-3)";

    const toggleDropdown = () => {
        setDropdownOpen((prevState) => !prevState);
    };

    useEffect(() => {
        if (selectedSlot) {
            setSelectedItem(
                equipmentData[itemSlotsMap[selectedSlot.toLowerCase()]]
            );

            setSlotItemData(
                filterItemDataBySlot()
            );

            setNewItem(null);
        };
    }, [selectedSlot]);

    const replaceItem = (newItem) => {
        if (!newItem) return;

        setCharacterData((prevState) => {
            const newState = { ...prevState };
            delete newItem.icon;
            delete newItem.base_item_level;
            newItem.item_id = newItem.id;
            delete newItem.id;
            delete newItem.item_slot;
            delete newItem.gems;
            
            newState.equipment[itemSlotsMap[selectedSlot.toLowerCase()]] = newItem;
            return newState;
        });

        updateStats();
        setNewItem(null);
    };

    return (
        <div className="edit-equipment-container">
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
                    <div
                        className="edit-item-header"
                        style={{
                            borderLeft: `0.1rem solid ${selectedItemRarityStyle}`,
                            borderRight: `0.1rem solid ${selectedItemRarityStyle}`,
                            borderTop: `0.1rem solid ${selectedItemRarityStyle}`,
                            backgroundColor: `var(--rarity-${selectedItem?.quality.toLowerCase()}-dark)`,
                            paddingLeft: "0.5rem"
                        }}
                    >
                        Currently equipped:
                        <span
                            style={{
                                color: selectedItemRarityStyle,
                                paddingLeft: "0.3rem",
                            }}
                        >
                            {selectedItem.name}
                        </span>
                    </div>
                    <EditItem
                        setCharacterData={setCharacterData}
                        updateStats={updateStats}
                        item={selectedItem}
                        selectedSlot={selectedSlot}
                        updateEquipment={true}
                        trinketOptions={true}
                    />
                </div>

                <div className="edit-item-container">
                    <div
                        className="edit-item-header"
                        style={{
                            color: newItemRarityStyle,
                            borderLeft: `0.1rem solid ${newItemRarityStyle}`,
                            borderRight: `0.1rem solid ${newItemRarityStyle}`,
                            borderTop: `0.1rem solid ${newItemRarityStyle}`,
                            backgroundColor: newItem
                                ? `var(--rarity-${newItem?.quality.toLowerCase()}-dark)`
                                : "var(--panel-colour-2)",
                        }}
                    >
                        <Searchbar data={slotItemData} width="82%" fontSize="1.4rem" newItem={newItem} setNewItem={setNewItem} replaceItem={replaceItem} />
                        <Button width="18%" height="2.6rem" grow={false} customClassName="replace-item-button" onClick={() => replaceItem(newItem)}>Replace</Button>
                    </div>
                    <EditItem
                        item={newItem}
                        setNewItem={setNewItem}
                        equipmentData={equipmentData}
                        selectedSlot={selectedSlot}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditEquipment;
