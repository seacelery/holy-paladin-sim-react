import React, { useState, useContext, useEffect } from "react";
import "./EquipmentDisplay.scss";
import ItemPanel from "./ItemPanel/ItemPanel";
import { itemSlotsMap } from "../../../../utils/item-slots-map";

const EquipmentDisplay = ({ characterData, equipmentData, selectedItem, setSelectedItem, setSelectedSlot }) => {
    const [equippedItemLevel, setEquippedItemLevel] = useState(0);
    const [embellishmentCounter, setEmbellishmentCounter] = useState(0);
    const [tierSetCounters, setTierSetCounters] = useState({});

    const reversedItemSlotsMap = {};
    for (const [key, value] of Object.entries(itemSlotsMap)) {
        reversedItemSlotsMap[value] = key;
    };

    const handleItemPanelClick = (itemData, slot) => {
        setSelectedItem(itemData);
        const formattedSlot = reversedItemSlotsMap[slot].split(" ")
                                                        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                                                        .join(" ")
        setSelectedSlot(formattedSlot);
    };

    const countEmbellishments = (equipmentData) => {
        let counter = 0;

        for (const slot in equipmentData) {
            if (equipmentData[slot].limit && equipmentData[slot].limit.includes("Embellished")) {
                counter++;
            };
        };

        setEmbellishmentCounter(counter);
    };

    const countTierSets = (equipmentData) => {
        let counters = {};

        for (const slot in equipmentData) {
            const itemName = equipmentData[slot].name;

            switch(true) {
                case itemName.includes("Heartfire Sentinel"):
                    counters["DF Tier Season 2"] = (counters["DF Tier Season 2"] ?? 0) + 1;
                    break;
                case itemName.includes("Entombed Seraph"):
                    counters["Tier Season 1"] = (counters["Tier Season 1"] ?? 0) + 1;
                    break;
                default:
                    break;
            };
        };

        setTierSetCounters(counters);
    };

    const calculateItemLevel = (equipmentData) => {
        let totalItemLevel = 0;

        for (const slot in equipmentData) {
            if (equipmentData[slot]) {
                totalItemLevel += equipmentData[slot].item_level;
            };
        };

        return (totalItemLevel / 16).toFixed(1);
    };

    useEffect(() => {
        setEquippedItemLevel(calculateItemLevel(equipmentData));
        countEmbellishments(equipmentData);
        countTierSets(equipmentData);
    }, [characterData]);

    const slotOrder = [
        ["head"],
        ["shoulder", "neck", "back"],
        ["hands", "chest", "wrist"],
        ["main_hand", "waist", "off_hand"],
        ["finger_1", "legs", "finger_2"],
        ["trinket_1", "feet", "trinket_2"],
    ];

    return (
        <div className="equipment-display">
            <div className="equipment-item-level-display">
                <div className="equipped-item-level-text">Item Level</div>
                <div className="equipped-item-level-value">
                    {equippedItemLevel}
                </div>
            </div>
            <div className="equipment-summary-display">
                <div className="embellishment-counter">
                    Embellishments{" "}
                    <span
                        style={{
                            color: `${
                                embellishmentCounter === 2
                                    ? "var(--sorting-arrow-colour)"
                                    : "var(--red-font)"
                            }`,
                        }}
                    >
                        {embellishmentCounter}/2
                    </span>
                </div>
                <div className="tier-sets-counter-container">
                    {Object.keys(tierSetCounters).map((tierSet, index) => {
                        return (
                            <div key={index} className="tier-set-counter">
                                {tierSet}{" "}
                                <span
                                    style={{
                                        color: `${
                                            tierSetCounters[tierSet] >= 4
                                                ? "var(--sorting-arrow-colour)"
                                                : "var(--red-font)"
                                        }`,
                                    }}
                                >
                                    {tierSetCounters[tierSet]}/5
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {slotOrder.map((row, rowIndex) => (
                <div key={rowIndex} className="item-row">
                    {row.map((slot) => (
                        <ItemPanel
                            key={slot}
                            characterData={characterData}
                            itemData={equipmentData[slot]}
                            selectedItem={selectedItem}
                            onClick={() => handleItemPanelClick(equipmentData[slot], slot)}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
};

export default EquipmentDisplay;
