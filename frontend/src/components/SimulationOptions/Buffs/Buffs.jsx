import React, { useContext, useCallback } from "react";
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
import { CharacterDataContext } from "../../../context/CharacterDataContext";
import Button from "../../Button/Button";

const Buffs = () => {
    const { version } = useContext(VersionContext);
    const { characterData, setCharacterData } = useContext(CharacterDataContext);
    const consumables = characterData.consumables;

    const flasksIcons = version === "live" ? flasks : ptrFlasks;
    const foodItemsIcons = version === "live" ? foodItems : ptrFoodItems;
    const weaponImbuesIcons =
        version === "live" ? weaponImbues : ptrWeaponImbues;
    const augmentRunesIcons =
        version === "live" ? augmentRunes : ptrAugmentRunes;
    const raidBuffsIcons = version === "live" ? raidBuffs : ptrRaidBuffs;
    const potionsIcons = version === "live" ? potions : ptrPotions;

    const handlePresetBuffs = useCallback(() => {
        setCharacterData(prevCharacterData => (
            {
                ...prevCharacterData,
                consumables: {
                    flask: ["Flask of Alchemical Chaos"],
                    food: ["Feast of the Divine Day"],
                    weapon_imbue: ["Algari Mana Oil"],
                    augment_rune: ["Crystallized Augment Rune"],
                    raid_buffs: ["Arcane Intellect", "Mark of the Wild", "Skyfury", "Symbol of Hope"],
                    external_buffs: {"Source of Magic": ["0"]},
                    potion: {}
                }
            }
        ));
    }, [setCharacterData]);

    return (
        <div className="options-tab-content buffs-content">
            <div className="buffs-content-half">
                <div className="buffs-container">
                    <BuffIcons
                        rawIcons={flasksIcons}
                        label="Flask"
                        dataType="flask"
                        showTooltip={true}
                        exclusiveSelection={true}
                        allowDeselection={true}
                        defaultSelectedIcons={consumables["flask"]}
                    />
                </div>

                <div className="buffs-container">
                    <BuffIcons
                        rawIcons={foodItemsIcons}
                        label="Food"
                        dataType="food"
                        showTooltip={true}
                        exclusiveSelection={true}
                        allowDeselection={true}
                        defaultSelectedIcons={consumables["food"]}
                    />
                </div>

                <div className="buffs-container">
                    <BuffIcons
                        rawIcons={weaponImbuesIcons}
                        label="Weapon Imbue"
                        dataType="weapon-imbue"
                        showTooltip={true}
                        exclusiveSelection={true}
                        allowDeselection={true}
                        defaultSelectedIcons={consumables["weapon_imbue"]}
                    />
                </div>

                <div className="buffs-container">
                    <BuffIcons
                        rawIcons={augmentRunesIcons}
                        label="Augment Rune"
                        dataType="augment-rune"
                        showTooltip={true}
                        exclusiveSelection={true}
                        allowDeselection={true}
                        defaultSelectedIcons={consumables["augment_rune"]}
                    />
                </div>
            </div>

            <div className="buffs-content-half">
                <div className="buffs-container">
                    <BuffIcons
                        rawIcons={raidBuffsIcons}
                        label="Raid Buffs"
                        dataType="raid-buff"
                        showTooltip={true}
                        exclusiveSelection={false}
                        allowDeselection={true}
                        defaultSelectedIcons={consumables["raid_buffs"]}
                    />
                </div>

                <div className="buffs-container">
                    <BuffIcons
                        rawIcons={externalBuffs}
                        label="External Buffs"
                        dataType="external-buff"
                        showTooltip={true}
                        exclusiveSelection={false}
                        allowDeselection={true}
                        defaultSelectedIcons={Object.keys(
                            consumables["external_buffs"]
                        )}
                        defaultExternalBuffTimers={
                            consumables["external_buffs"]
                        }
                    />
                </div>
            </div>

            <div className="buffs-preset-button">
                <Button 
                    width="12rem"
                    height="5rem"
                    fontSize="1.7rem"
                    grow={true}
                    onClick={handlePresetBuffs}
                >
                    Preset Buffs
                </Button>
            </div>
        </div>
    );
};

export default Buffs;
