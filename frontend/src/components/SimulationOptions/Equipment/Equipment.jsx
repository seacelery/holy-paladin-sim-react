import React, { useState, useContext } from "react";
import "./Equipment.scss";
import EquipmentDisplay from "./EquipmentDisplay/EquipmentDisplay";
import StatsDisplay from "./StatsDisplay/StatsDisplay";
import EditEquipment from "./EditEquipment/EditEquipment";
import { CharacterDataContext } from "../../../context/CharacterDataContext";
import { VersionContext } from "../../../context/VersionContext";
import { itemSlotsMap } from "../../../utils/item-slots-map";

const Equipment = () => {
    const { version } = useContext(VersionContext);
    const { characterData, setCharacterData } = useContext(CharacterDataContext);
    const equipmentData = characterData ? characterData.equipment : {};

    if (!equipmentData.off_hand) {
        setCharacterData(prevCharacterData => ({
            ...prevCharacterData,
            equipment: {
                ...prevCharacterData.equipment,
                off_hand: {
                    effects: [],
                    item_icon: "https://wow.zamimg.com/images/wow/icons/large/inventoryslot_offhand.jpg",
                    item_id: 0,
                    item_level: equipmentData.main_hand.item_level,
                    limit: null,
                    name: "Off Hand",
                    quality: "Poor",
                    stats: []
                }
            }
        }));
    };

    const statsData = characterData.stats;

    const [selectedSlot, setSelectedSlot] = useState("Head");
    const [selectedItem, setSelectedItem] = useState(equipmentData.head);

    const updateStats = async () => {
        try {
            const params = new URLSearchParams({
                race: characterData.race,
                character_name: characterData.characterName,
                realm: characterData.characterRealm,
                region: characterData.characterRegion,
                version: version,
            });

            params.append("custom_equipment", JSON.stringify(equipmentData));
            params.append("class_talents", JSON.stringify(characterData.classTalents));
            params.append("spec_talents", JSON.stringify(characterData.specTalents));
            params.append("lightsmith_talents", JSON.stringify(characterData.lightsmithTalents));
            params.append("herald_of_the_sun_talents", JSON.stringify(characterData.heraldOfTheSunTalents));
            params.append("consumables", JSON.stringify(characterData.consumables));

            const response = await fetch(`http://127.0.0.1:5000/fetch_updated_data?${params.toString()}`, {
                credentials: "include"
            });

            const data = await response.json();

            setCharacterData(prevCharacterData => ({
                ...prevCharacterData,
                stats: data.stats
            }));
        } catch (error) {
            console.error("Error:", error);
        };

        setSelectedItem(equipmentData[itemSlotsMap[selectedSlot.toLowerCase()]]);
    };

    return (
        <div className="options-tab-content equipment-content">
            <div className="equipment-left">
                <EquipmentDisplay characterData={characterData} equipmentData={equipmentData} selectedItem={selectedItem} setSelectedItem={setSelectedItem} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} />
            </div>

            <div className="equipment-right">
                <StatsDisplay statsData={statsData} />
                <EditEquipment setCharacterData={setCharacterData} updateStats={updateStats} equipmentData={equipmentData} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            </div>
        </div>
    );
};

export default Equipment;
