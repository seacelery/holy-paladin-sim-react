import React, { useContext } from "react";
import "./EquipmentDisplay.scss";
import ItemPanel from "./ItemPanel/ItemPanel";
import { CharacterDataContext } from "../../../../context/CharacterDataContext";

const EquipmentDisplay = ({ selectedItem, setSelectedItem }) => {
    const { characterData } = useContext(CharacterDataContext);
    const equipmentData = characterData.equipment;

    const handleItemPanelClick = (item) => {
        setSelectedItem(item);
    };

    return <div className="equipment-display">
        <div className="item-row">
            <ItemPanel itemData={equipmentData.head} selectedItem={selectedItem} onClick={handleItemPanelClick} />
        </div>

        <div className="item-row">
            <ItemPanel itemData={equipmentData.shoulder} selectedItem={selectedItem} onClick={handleItemPanelClick} />
            <ItemPanel itemData={equipmentData.neck} selectedItem={selectedItem} onClick={handleItemPanelClick} />
            <ItemPanel itemData={equipmentData.back} selectedItem={selectedItem} onClick={handleItemPanelClick} />
        </div>

        <div className="item-row">
            <ItemPanel itemData={equipmentData.hands} selectedItem={selectedItem} onClick={handleItemPanelClick} />
            <ItemPanel itemData={equipmentData.chest} selectedItem={selectedItem} onClick={handleItemPanelClick} />
            <ItemPanel itemData={equipmentData.wrist} selectedItem={selectedItem} onClick={handleItemPanelClick} />           
        </div>

        <div className="item-row">
            <ItemPanel itemData={equipmentData.main_hand} selectedItem={selectedItem} onClick={handleItemPanelClick} />
            <ItemPanel itemData={equipmentData.waist} selectedItem={selectedItem} onClick={handleItemPanelClick} />
            <ItemPanel itemData={equipmentData.off_hand} selectedItem={selectedItem} onClick={handleItemPanelClick} />
        </div>

        <div className="item-row">
            <ItemPanel itemData={equipmentData.finger_1} selectedItem={selectedItem} onClick={handleItemPanelClick} />
            <ItemPanel itemData={equipmentData.legs} selectedItem={selectedItem} onClick={handleItemPanelClick} />         
            <ItemPanel itemData={equipmentData.finger_2} selectedItem={selectedItem} onClick={handleItemPanelClick} />
        </div>

        <div className="item-row">
            <ItemPanel itemData={equipmentData.trinket_1} selectedItem={selectedItem} onClick={handleItemPanelClick} />
            <ItemPanel itemData={equipmentData.feet} selectedItem={selectedItem} onClick={handleItemPanelClick} />
            <ItemPanel itemData={equipmentData.trinket_2} selectedItem={selectedItem} onClick={handleItemPanelClick} />
        </div>
    </div>;
};

export default EquipmentDisplay;
