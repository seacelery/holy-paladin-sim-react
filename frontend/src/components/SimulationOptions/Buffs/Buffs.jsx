import React, { useContext } from "react";
import "./Buffs.scss";
import BuffIcons from "./BuffIcons/BuffIcons";
import {
    flasks,
    ptrFlasks,
    foodItems,
    ptrFoodItems,
    weaponImbues,
    ptrWeaponImbues,
    augmentRunes,
    ptrAugmentRunes,
    raidBuffs,
    ptrRaidBuffs,
    externalBuffs,
    potions,
    ptrPotions,
} from "../../../data/buffs-consumables-data";
import { VersionContext } from "../../../context/VersionContext";

const Buffs = () => {
    const { version } = useContext(VersionContext);

    const flasksIcons = version === "live" ? flasks : ptrFlasks;
    const foodItemsIcons = version === "live" ? foodItems : ptrFoodItems;
    const weaponImbuesIcons = version === "live" ? weaponImbues : ptrWeaponImbues;
    const augmentRunesIcons = version === "live" ? augmentRunes : ptrAugmentRunes;
    const raidBuffsIcons = version === "live" ? raidBuffs : ptrRaidBuffs;
    const potionsIcons = version === "live" ? potions : ptrPotions

    return (
        <div className="options-tab-content buffs-content">
            <div className="buffs-content-half">
                <div className="buffs-container">
                    <BuffIcons rawIcons={flasksIcons} label="Flask" dataType="flask" showTooltip={true} exclusiveSelection={true} allowDeselection={true} />
                </div>

                <div className="buffs-container">
                    <BuffIcons rawIcons={foodItemsIcons} label="Food" dataType="food" showTooltip={true} exclusiveSelection={true} allowDeselection={true} />
                </div>

                <div className="buffs-container">
                    <BuffIcons rawIcons={weaponImbuesIcons} label="Weapon Imbue" dataType="weapon-imbue" showTooltip={true} exclusiveSelection={true} allowDeselection={true} />
                </div>

                <div className="buffs-container">
                    <BuffIcons rawIcons={augmentRunesIcons} label="Augment Rune" dataType="augment-rune" showTooltip={true} exclusiveSelection={true} allowDeselection={true} />
                </div>
            </div>
            
            <div className="buffs-content-half">
                <div className="buffs-container">
                    <BuffIcons rawIcons={raidBuffsIcons} label="Raid Buffs" dataType="raid-buff" showTooltip={true} exclusiveSelection={false} allowDeselection={true} />
                </div>

                <div className="buffs-container">
                    <BuffIcons rawIcons={externalBuffs} label="External Buffs" dataType="external-buff" showTooltip={true} exclusiveSelection={false} allowDeselection={true} />
                </div>
            </div>
        </div>
    );
};

export default Buffs;
