import React, { useState } from "react";
import "./EditItemGems.scss";
import Gem from "../../../Gem/Gem";
import GemPickerModal from "./GemPickerModal/GemPickerModal";
import { FiPlus } from "react-icons/fi";
import { itemSlotsMap } from "../../../../../../utils/item-slots-map";

const EditItemGems = ({
    setCharacterData,
    updateStats,
    item,
    selectedSlot,
    updateEquipment,
}) => {
    const [modalOpen, setModalOpen] = useState(false);

    const gems = item.gems || [];

    const handleGemClick = (gem) => {
        const newGems = [...gems];
        const gemIndex = newGems.indexOf(gem);
        newGems.splice(gemIndex, 1);

        if (updateEquipment) {
            setCharacterData((prevData) => {
                const newCharacterData = { ...prevData };
                newCharacterData.equipment[itemSlotsMap[selectedSlot.toLowerCase()]].gems = newGems;
                return newCharacterData;
            });
    
            updateStats();
        };  
    };

    return (
        <div className="edit-item-gems">
            <div className="edit-gems-container">
                {gems.map((gem, index) => {
                    return (
                        <Gem
                            key={index}
                            gemName={gem}
                            size="medium"
                            tooltip={true}
                            customClassName="gem-clickable gem-hover-opacity"
                            onClick={() => handleGemClick(gem)}
                        />
                    );
                })}
                <div
                    className="add-gem-container"
                    onClick={(e) => {
                        setModalOpen(prevState => !prevState)
                    }}
                >
                    <FiPlus className="add-gem-icon" />
                </div>
                {modalOpen && (
                    <GemPickerModal onClose={() => setModalOpen(false)} setCharacterData={setCharacterData} updateStats={updateStats} selectedSlot={selectedSlot} item={item} updateEquipment={updateEquipment} />
                )}
        </div>
        </div>
    );
};

export default EditItemGems;
