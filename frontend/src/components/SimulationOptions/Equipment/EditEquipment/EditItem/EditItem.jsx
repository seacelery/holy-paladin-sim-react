import React, { useState, useEffect } from "react";
import "./EditItem.scss";
import { itemSlotToDefaultIcon } from "../../../../../utils/item-slots-map";
import EditItemStats from "./EditItemStats/EditItemStats";
import EditItemEnchants from "./EditItemEnchants/EditItemEnchants";

const EditItem = ({ setCharacterData, item, selectedSlot, updateEquipment = false, setNewItem = null }) => {
    const itemIcon = item ? item.item_icon : itemSlotToDefaultIcon[selectedSlot];
    console.log(item)

    if (!item) {
        return (
            <div className="edit-item">
                <div className="edit-item-icon-container">
                    <img className="edit-item-icon" src={itemIcon} alt="item icon" />
                    <div className="edit-item-item-level"></div>
                </div>
                <div className="edit-item-info"></div>
            </div>
        );
    };

    const itemRarityStyle = item
        ? `var(--rarity-${item.quality.toLowerCase()})`
        : "var(--rarity-common)";

    return (
        <div
            className="edit-item"
            style={{ border: `0.1rem solid ${itemRarityStyle}` }}
        >
            <div className="edit-item-icon-container">
                <img className="edit-item-icon" src={itemIcon} alt="item icon" />
                <div
                    className="edit-item-item-level"
                    style={{ color: itemRarityStyle }}
                >
                    {item.item_level}
                </div>
            </div>
            <div className="edit-item-info">
                <EditItemStats setCharacterData={setCharacterData} item={item} selectedSlot={selectedSlot} updateEquipment={updateEquipment} />
                <div className="edit-item-info-bonuses">
                    <EditItemEnchants setCharacterData={setCharacterData} item={item} selectedSlot={selectedSlot} updateEquipment={updateEquipment} />
                </div>
            </div>
        </div>
    );
};

export default EditItem;
