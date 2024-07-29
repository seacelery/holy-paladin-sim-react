import React from "react";
import "./EditItem.scss";
import { itemSlotToDefaultIcon } from "../../../../../utils/item-slots-map";

const EditItem = ({ selectedItem, selectedSlot }) => {
    const itemIcon = selectedItem ? selectedItem.item_icon : itemSlotToDefaultIcon[selectedSlot];

    if (!selectedItem) {
        return <div className="edit-item">
            <div className="edit-item-icon-container">
                <img className="edit-item-icon" src={itemIcon}></img>
                <div className="edit-item-item-level"></div>
            </div>
            <div className="edit-item-info"></div>
        </div>;
    };

    return <div className="edit-item">
        <div className="edit-item-icon-container">
            <img className="edit-item-icon" src={itemIcon}></img>
            <div className="edit-item-item-level">{selectedItem.item_level}</div>
        </div>
        <div className="edit-item-info"></div>
    </div>;
};

export default EditItem;

// src={selectedItem.item_icon ? selectedItem.item_icon : itemSlotToDefaultIcon[selectedSlot]}
