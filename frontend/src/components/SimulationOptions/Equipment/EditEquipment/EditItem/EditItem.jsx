import React, { useState, useEffect } from "react";
import "./EditItem.scss";
import { itemSlotToDefaultIcon, itemSlotsMap } from "../../../../../utils/item-slots-map";
import EditItemStats from "./EditItemStats/EditItemStats";
import EditItemEnchants from "./EditItemEnchants/EditItemEnchants";
import EditItemGems from "./EditItemGems/EditItemGems";
import EditItemEmbellishments from "./EditItemEmbellishments/EditItemEmbellishments";
import EditItemTrinkets from "./EditItemTrinkets/EditItemTrinkets";
import { generateItemStats } from "../../../../../utils/item-level-calculations/generate-item-stats";
import { generateItemEffects } from "../../../../../utils/item-level-calculations/generate-item-effect";

const EditItem = ({ setCharacterData, updateStats, item, equipmentData, selectedSlot, updateEquipment = false, setNewItem = null, trinketOptions = false }) => {
    const itemIcon = item ? item.item_icon : itemSlotToDefaultIcon[selectedSlot];

    const [itemStats, setItemStats] = useState(item ? item.stats : {});
    const [itemLevel, setItemLevel] = useState(item ? item.item_level : 0);
    const [originalItemLevel, setOriginalItemLevel] = useState(item ? item.item_level : 0);

    useEffect(() => {
        setItemLevel(item ? item.item_level : 0);
        setOriginalItemLevel(item ? item.item_level : 0);
    }, [item]);

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

    const handleItemLevelChange = (input) => {
        setItemLevel(input);
    };

    const handleBlur = () => {
        let itemLevelForCalculation = itemLevel;

        if (itemLevel === "" || itemLevel < "300" || String(itemLevel).match(/[a-z]/i)) {
            itemLevelForCalculation = originalItemLevel;
        };

        const newStats = generateItemStats(item.stats, itemSlotsMap[selectedSlot.toLowerCase()], parseInt(itemLevelForCalculation));
        const newEffects = generateItemEffects(item.effects, itemSlotsMap[selectedSlot.toLowerCase()], parseInt(itemLevelForCalculation));
        
        if (updateEquipment) {
            setCharacterData((prevState) => {
                const newState = { ...prevState };
                newState.equipment[itemSlotsMap[selectedSlot.toLowerCase()]].stats = newStats;
                setItemStats(newStats);
                newState.equipment[itemSlotsMap[selectedSlot.toLowerCase()]].effects = newEffects;
                newState.equipment[itemSlotsMap[selectedSlot.toLowerCase()]].item_level = parseInt(itemLevelForCalculation);
                return newState;
            });
            updateStats();
        } else {
            const newItem = { ...item };
            newItem.stats = newStats;
            newItem.effects = newEffects;
            newItem.item_level = parseInt(itemLevelForCalculation);
            delete newItem.base_item_level;
            delete newItem.item_slot;

            setNewItem(newItem);
        };
        
        setItemLevel(itemLevelForCalculation);
        setOriginalItemLevel(itemLevelForCalculation);
    };

    const itemRarityStyle = item
        ? `var(--rarity-${item.quality.toLowerCase()})`
        : "var(--rarity-common)";

    return (
        <div
            className="edit-item"
            style={{ border: `0.1rem solid ${itemRarityStyle}`, backgroundColor: `var(--rarity-${item.quality.toLowerCase()}-dark)` }}
        >
            <div className="edit-item-icon-container">
                <img className="edit-item-icon" src={itemIcon} alt="item icon" />
                <input
                    type="text"
                    className="edit-item-item-level"
                    style={{ color: itemRarityStyle }}
                    value={itemLevel}
                    onChange={(e) => handleItemLevelChange(e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
                    maxLength={3}
                />
            </div>
            <div className="edit-item-info">
                <EditItemStats setCharacterData={setCharacterData} itemStats={itemStats} setItemStats={setItemStats} updateStats={updateStats} item={item} selectedSlot={selectedSlot} updateEquipment={updateEquipment} setNewItem={setNewItem} />
                <div className="edit-item-info-bonuses">
                    {selectedSlot !== "Trinket 1" && selectedSlot !== "Trinket 2" && (
                        <>
                            <EditItemEnchants setCharacterData={setCharacterData} updateStats={updateStats} item={item} selectedSlot={selectedSlot} updateEquipment={updateEquipment} setNewItem={setNewItem} />
                            <EditItemGems setCharacterData={setCharacterData} updateStats={updateStats} item={item} selectedSlot={selectedSlot} updateEquipment={updateEquipment} setNewItem={setNewItem} />
                            <EditItemEmbellishments setCharacterData={setCharacterData} updateStats={updateStats} item={item} selectedSlot={selectedSlot} updateEquipment={updateEquipment} setNewItem={setNewItem} />
                        </>
                    )}
                    {(selectedSlot === "Trinket 1" || selectedSlot === "Trinket 2") && (
                        <EditItemTrinkets setCharacterData={setCharacterData} selectedSlot={selectedSlot} updateEquipment={updateEquipment} setNewItem={setNewItem} item={item} trinketOptions={trinketOptions} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default EditItem;
