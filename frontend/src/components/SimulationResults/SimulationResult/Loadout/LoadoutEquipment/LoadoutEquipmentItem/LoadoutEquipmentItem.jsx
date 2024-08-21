import React, { useState, useEffect, useRef } from "react";
import "./LoadoutEquipmentItem.scss";
import Tooltip from "../../../../../Tooltip/Tooltip";
import { itemsToIconsMap } from "../../../../../../utils/items-to-icons-map";

const LoadoutEquipmentItem = ({ itemData }) => {
    const [hoverElement, setHoverElement] = useState(null);
    const itemRef = useRef(null);
    useEffect(() => {
        setHoverElement(itemRef.current);
    }, []);

    const sortStats = (stats) => {
        const statsOrder = ["intellect", "haste", "crit", "mastery", "versatility", "leech"];
        const excludedStats = ["combat_rating_avoidance", "stamina"];
        let statsArray = Object.entries(itemData["stats"]).filter((stat) => !excludedStats.includes(stat[0]));

        let sortedStats = statsArray.sort((a, b) => {
            const A = statsOrder.indexOf(a[0]);
            const B = statsOrder.indexOf(b[0]);
            return A - B;
        });

        sortedStats = sortedStats.reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});

        return sortedStats;
    };

    const qualityStyle = `var(--rarity-${itemData.quality.toLowerCase()})`;
    const sortedStats = sortStats(itemData.stats);
    

    return (
        <>
            <div className="loadout-equipment-item" ref={itemRef}>
                <img src={itemData.item_icon} alt={itemData.name} className="loadout-equipment-item-icon" style={{ border: `0.1rem solid ${qualityStyle}` }}/>
                <div className="loadout-equipment-item-name" style={{ color: qualityStyle }}>{itemData.name}</div>
                <div className="loadout-equipment-item-level" style={{ color: qualityStyle }}>{itemData.item_level}</div>
            </div>
            <Tooltip hoverElement={hoverElement} customClassName="loadout-equipment-tooltip">
                <div className="loadout-equipment-tooltip-name-container" style={{ color: qualityStyle }}>
                    <span className="loadout-equipment-tooltip-name">{itemData.name}</span>
                    <span>{itemData.item_level}</span>
                </div>

                <div>
                    {Object.entries(sortedStats).map(([stat, value]) => {
                        const statName = stat.charAt(0).toUpperCase() + stat.slice(1);
                        return <div key={stat} style={{ color: `var(--stat-${stat})` }}>+{value} {statName}</div>
                    })}
                </div>

                {itemData.enchantments && itemData.enchantments.length > 0 && (
                    <div style={{ color: "var(--rarity-uncommon)" }}>{itemData["enchantments"][0].split(" |")[0]}</div>
                )}

                {itemData.gems && (
                    <div className="loadout-equipment-tooltip-gems">
                        {itemData.gems.map((gem, index) => {
                            return <img key={index} src={itemsToIconsMap[gem]} alt={gem} className="loadout-equipment-tooltip-gem" />
                        })}
                    </div>
                    
                )}

                {itemData.effects && itemData.effects.length > 0 && (
                    <div style={{ color: "var(--mana)" }}>{itemData.effects[0].description.replaceAll("<br>", " ").replaceAll("*", "")}</div>
                )}
            </Tooltip>
        </>
    );
};

export default LoadoutEquipmentItem;
