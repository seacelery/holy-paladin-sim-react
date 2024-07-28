import React, { useState, useContext, useEffect } from "react";
import "./EquipmentDisplay.scss";
import ItemPanel from "./ItemPanel/ItemPanel";

const EquipmentDisplay = ({ equipmentData, selectedItem, setSelectedItem }) => {
    const [equippedItemLevel, setEquippedItemLevel] = useState(0);
    const [embellishmentCounter, setEmbellishmentCounter] = useState(0);
    const [tierSetCounters, setTierSetCounters] = useState({});

    const handleItemPanelClick = (item) => {
        setSelectedItem(item);
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
    }, [equipmentData]);

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

            <div className="item-row">
                <ItemPanel
                    itemData={equipmentData.head}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
            </div>

            <div className="item-row">
                <ItemPanel
                    itemData={equipmentData.shoulder}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
                <ItemPanel
                    itemData={equipmentData.neck}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
                <ItemPanel
                    itemData={equipmentData.back}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
            </div>

            <div className="item-row">
                <ItemPanel
                    itemData={equipmentData.hands}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
                <ItemPanel
                    itemData={equipmentData.chest}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
                <ItemPanel
                    itemData={equipmentData.wrist}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
            </div>

            <div className="item-row">
                <ItemPanel
                    itemData={equipmentData.main_hand}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
                <ItemPanel
                    itemData={equipmentData.waist}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
                <ItemPanel
                    itemData={equipmentData.off_hand}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
            </div>

            <div className="item-row">
                <ItemPanel
                    itemData={equipmentData.finger_1}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
                <ItemPanel
                    itemData={equipmentData.legs}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
                <ItemPanel
                    itemData={equipmentData.finger_2}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
            </div>

            <div className="item-row">
                <ItemPanel
                    itemData={equipmentData.trinket_1}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
                <ItemPanel
                    itemData={equipmentData.feet}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
                <ItemPanel
                    itemData={equipmentData.trinket_2}
                    selectedItem={selectedItem}
                    onClick={handleItemPanelClick}
                />
            </div>
        </div>
    );
};

export default EquipmentDisplay;
