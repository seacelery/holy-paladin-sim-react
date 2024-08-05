import React, { useEffect } from "react";
import "./ItemPanel.scss";
import Gem from "../../Gem/Gem";
import { formatEnchantName, formatEmbellishment } from "../../formatEquipment";

const ItemPanel = ({ characterData, itemData, selectedItem, onClick }) => {
    if (!itemData) return;

    const itemRarityStyle = `var(--rarity-${itemData.quality.toLowerCase()})`;

    const tierSets = {
        "Heartfire Sentinel": "Dragonflight Tier Season 2",
        "Entombed Seraph": "Tier Season 1",
    };

    const getTierSet = (itemName) => {
        for (const tierSet in tierSets) {
            if (itemName.includes(tierSet)) {
                return tierSets[tierSet];
            };
        };

        return null;
    };

    return (
        <div className="item-slot" onClick={() => onClick(itemData)}>
            <div className={`item-slot-hover ${selectedItem === itemData ? "item-slot-selected" : ""}`}></div>

            <div className="item-slot-icon-container">
                <img
                    className="item-slot-icon"
                    src={itemData.item_icon}
                    alt={itemData.name}
                    style={{
                        border: `0.1rem solid ${itemRarityStyle}`,
                    }}
                />
                <div
                    className="item-slot-item-level"
                    style={{
                        borderLeft: `0.1rem solid ${itemRarityStyle}`,
                        borderRight: `0.1rem solid ${itemRarityStyle}`,
                        borderBottom: `0.1rem solid ${itemRarityStyle}`,
                        color: itemRarityStyle,
                    }}
                >
                    {itemData.item_level}
                </div>
            </div>

            <div className="item-slot-info">
                <div className="item-slot-info-container">
                    <div
                        className="item-slot-name"
                        style={{ color: itemRarityStyle }}
                    >
                        {itemData.name}
                    </div>
                    <div className="item-slot-enchants">
                        {itemData.enchantments &&
                        itemData.enchantments.length > 0
                            ? formatEnchantName(itemData.enchantments[0])
                            : null}
                    </div>
                    <div className="item-slot-gems-container">
                        {itemData.gems && itemData.gems.length > 0
                            ? itemData.gems.map((gem, index) => {
                                  return (
                                      <Gem
                                          key={index}
                                          gemName={gem}
                                          size={"small"}
                                      />
                                  );
                              })
                            : null}
                    </div>
                    <div className="item-slot-category">
                        {itemData.limit && itemData.limit.includes("Embellished") && itemData.effects.length > 0
                            ? formatEmbellishment(itemData.effects)
                            : null
                        } 
                        <div className="item-panel-tier-bonus">
                            {getTierSet(itemData.name)}
                        </div>
                    </div>
                    <div className="item-slot-bonuses"></div>
                </div>
            </div>
        </div>
    );
};

export default ItemPanel;
