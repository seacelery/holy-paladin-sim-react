import React, { useState, useContext, useEffect, useRef } from "react";
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
    const equipmentData = characterData.equipment;

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
            const characterName = characterData.characterName;
            const characterRealm = characterData.characterRealm;
            const characterRegion = characterData.characterRegion;

            const customEquipment = encodeURIComponent(JSON.stringify(equipmentData));

            const response = await fetch(`http://127.0.0.1:5000/fetch_updated_data?character_name=${characterName}&realm=${characterRealm}&custom_equipment=${customEquipment}&region=${characterRegion}&version=${version}`, {
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
                <EquipmentDisplay characterData={characterData} equipmentData={equipmentData} selectedItem={selectedItem} setSelectedItem={setSelectedItem} setSelectedSlot={setSelectedSlot} />
            </div>

            <div className="equipment-right">
                <StatsDisplay statsData={statsData} />
                <EditEquipment setCharacterData={setCharacterData} updateStats={updateStats} equipmentData={equipmentData} selectedSlot={selectedSlot} setSelectedSlot={setSelectedSlot} selectedItem={selectedItem} setSelectedItem={setSelectedItem} />
            </div>
        </div>
    );
};

export default Equipment;
