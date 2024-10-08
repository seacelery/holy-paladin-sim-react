import React, { useContext, useState, useEffect } from "react";
import "./ImportCharacter.css";
import Button from "../../../Button/Button";
import Dropdown from "../../../Dropdown/Dropdown";
import Notification from "../../../Notification/Notification";
import { CharacterDataContext } from "../../../../context/CharacterDataContext";
import { realmList } from "../../../../data/realm-list";
import { VersionContext } from "../../../../context/VersionContext";
import { baseLightsmithTalents, baseHeraldOfTheSunTalents } from "../../../../utils/base-talents";
import { updateEquipmentWithEffectValues } from "../../../../utils/misc-functions";
import { CONFIG } from "../../../../config/config";

const ImportCharacter = ({ setActiveTab, setImporting }) => {
    const { characterData, setCharacterData } = useContext(CharacterDataContext);
    const { version } = useContext(VersionContext);

    const [region, setRegion] = useState("");
    const [realm, setRealm] = useState("");
    const [characterName, setCharacterName] = useState("");

    const [notificationVisible, setNotificationVisible] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const toggleDropdown = (dropdown) => {
        setDropdownOpen((prevOpenDropdown) => (prevOpenDropdown === dropdown ? null : dropdown));
    };

    const realms = Object.keys(realmList);
    const [currentRealmList, setCurrentRealmList] = useState([]);

    useEffect(() => {
        if (!region) return;

        setCurrentRealmList(realmList[region]);
    }, [region]);

    useEffect(() => {
        if (!characterData) return;

        setRegion(characterData.characterRegion ? characterData.characterRegion.toUpperCase() : "");
        setRealm(characterData.characterRealm ? characterData.characterRealm.replaceAll("-", " ").split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" ") : "");
        setCharacterName(characterData.characterName ? characterData.characterName[0].toUpperCase() + characterData.characterName.slice(1) : "");
    }, [characterData]);

    const importCharacter = async () => {
        if (!characterName || !region || !realm) {
            if (!characterName) {
                setErrorModalOpen(true);
            };
            return;
        };

        setCharacterData(prevCharacterData => {
            const newCharacterRegion = region.toLowerCase();
            const newCharacterRealm = realm.toLowerCase().replaceAll(" ", "-");
            const newCharacterName = characterName.toLowerCase();

            setActiveTab("Options");
            setImporting(true);

            fetch(`${CONFIG.backendUrl}/import_character?character_name=${newCharacterName}&realm=${newCharacterRealm}&region=${newCharacterRegion}&version=${version}`, {
                credentials: "same-origin"
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)

                setCharacterData({
                    ...prevCharacterData,
                    characterRegion: data.character_region,
                    characterRealm: data.character_realm,
                    characterName: data.character_name,
                    race: data.race,
                    ptr: data.ptr,
                    classTalents: data.class_talents,
                    specTalents: data.spec_talents,
                    lightsmithTalents: data.lightsmith_talents,
                    heraldOfTheSunTalents: data.herald_of_the_sun_talents,
                    equipment: updateEquipmentWithEffectValues(data.equipment),
                    stats: data.stats
                });

                setImporting(false);
            })
            .catch(error => { 
                console.error("Error:", error);
                setNotificationVisible(true);
                setTimeout(() => {
                    setNotificationVisible(false);
                }, 3000);
                setImporting(false);
            });
        });
    };

    return (
        <div className="import-character-container">
            <Notification notificationVisible={notificationVisible} notificationMessage="Character not found" width="18rem" fontSize="1.4rem"></Notification>

            <div className="import-character-options-container">
                <Dropdown
                    dropdownOptions={realms}
                    selectedOption={region}
                    setSelectedOption={setRegion}
                    isOpen={dropdownOpen === "region"}
                    toggleDropdown={() => toggleDropdown("region")}
                    customClassName={"region-dropdown"}
                ></Dropdown>
                <Dropdown
                    dropdownOptions={currentRealmList}
                    selectedOption={realm}
                    setSelectedOption={setRealm}
                    isOpen={dropdownOpen === "realm"}
                    toggleDropdown={() => toggleDropdown("realm")}
                    customClassName={"realm-dropdown"}
                ></Dropdown>
                <input
                    type="text"
                    className="character-input-field character-name-input"
                    value={characterName}
                    onChange={(e) => setCharacterName(e.target.value)}
                ></input>
                <Button width="7.5rem" height="2.7rem" grow={false} className="import-button" onClick={importCharacter}>
                    Import
                </Button>
            </div>
        </div>
    );
};

export default ImportCharacter;
