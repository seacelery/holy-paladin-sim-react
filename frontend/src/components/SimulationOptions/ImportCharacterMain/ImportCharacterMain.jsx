import React, { useState, useEffect, useContext } from "react";
import "./ImportCharacterMain.scss";
import Button from "../../Button/Button";
import Dropdown from "../../Dropdown/Dropdown";
import Loader from "../../Loader/Loader";
import ErrorModal from "../../ErrorModal/ErrorModal";
import Notification from "../../Notification/Notification";
import { realmList } from "../../../data/realm-list";
import { CharacterDataContext } from "../../../context/CharacterDataContext";
import { VersionContext } from "../../../context/VersionContext";
import { baseLightsmithTalents, baseHeraldOfTheSunTalents } from "../../../utils/base-talents";

const ImportCharacterMain = ({ setCharacterImported }) => {
    const { characterData, setCharacterData } = useContext(CharacterDataContext);
    const { version } = useContext(VersionContext);

    const [loading, setLoading] = useState(false);
    const [errorModalOpen, setErrorModalOpen] = useState(false);
    const [notificationVisible, setNotificationVisible] = useState(false);

    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [region, setRegion] = useState("EU");
    const [realm, setRealm] = useState("Aegwynn");
    const [characterName, setCharacterName] = useState("");
    const realms = Object.keys(realmList);
    const [currentRealmList, setCurrentRealmList] = useState(realmList[region]);

    useEffect(() => {
        setCurrentRealmList(realmList[region]);
        setRealm(realmList[region][0]);
    }, [region]);

    const toggleDropdown = (dropdown) => {
        setDropdownOpen((prevOpenDropdown) => (prevOpenDropdown === dropdown ? null : dropdown));
    };

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

            setLoading(true);

            fetch(`http://localhost:5000/import_character?character_name=${newCharacterName}&realm=${newCharacterRealm}&region=${newCharacterRegion}&version=${version}`, {
                credentials: "include"
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                // updateEquipmentWithEffectValues(data);
                // updateUIAfterImport(data, isFirstImport);
                // initialiseEquipment();

                setCharacterData({
                    ...prevCharacterData,
                    characterRegion: data.character_region,
                    characterRealm: data.character_realm,
                    characterName: data.character_name,
                    race: data.race,
                    ptr: data.ptr,
                    classTalents: data.class_talents,
                    specTalents: data.spec_talents,
                    lightsmithTalents: { ...baseLightsmithTalents },
                    heraldOfTheSunTalents: { ...baseHeraldOfTheSunTalents },
                    equipment: data.equipment,
                    consumables: data.consumable,
                    stats: data.stats
                });

                setCharacterImported(true);
            })
            .catch(error => { 
                console.error("Error:", error);
                setNotificationVisible(true);
                setTimeout(() => {
                    setNotificationVisible(false);
                }, 3000);
                setLoading(false);
            });
        });
    };

    return (
        <>
            <Notification notificationVisible={notificationVisible} notificationMessage="Character not found" width="18rem" fontSize="1.4rem"></Notification>

            <div className="import-overlay">
                <div className="import-character-container-main">
                    <div className="import-character-reminder">
                        Import a character
                    </div>

                    <div className="character-input-label-main">Region:</div>
                    <Dropdown
                        dropdownOptions={realms}
                        selectedOption={region}
                        setSelectedOption={setRegion}
                        isOpen={dropdownOpen === "region"}
                        toggleDropdown={() => toggleDropdown("region")}
                    ></Dropdown>

                    <div className="character-input-label-main">Realm:</div>
                    <Dropdown
                        dropdownOptions={currentRealmList}
                        selectedOption={realm}
                        setSelectedOption={setRealm}
                        isOpen={dropdownOpen === "realm"}
                        toggleDropdown={() => toggleDropdown("realm")}
                    ></Dropdown>

                    <label
                        htmlFor="character-name-input-main"
                        className="character-input-label-main"
                    >
                        Character Name:
                    </label>
                    <input
                        type="text"
                        className="character-input-field-main"
                        id="character-name-input-main"
                        value={characterName}
                        onChange={(e) => setCharacterName(e.target.value)}
                    ></input>
                    {errorModalOpen && (
                        <ErrorModal
                            errorMessage={"Character name missing"}
                            width="20rem"
                            height="5rem"
                            modalPosition={{ positionX: "34.3rem", positionY: "28.2rem" }}
                            arrowPosition={{ beforeBottom: "1.9rem", beforeLeft: "-1.7rem" }}
                            onClose={() => setErrorModalOpen(false)}
                        ></ErrorModal>
                    )}
                    
                    <Button
                        width="27.5rem"
                        height="5rem"
                        margin="3.5rem 0 4.5rem 0"
                        fontSize="1.6rem"
                        grow={!loading}
                        onClick={importCharacter}
                        className={`button ${loading ? "button-loading" : ""}`}
                    >
                        {loading ? <Loader loading={loading} /> : "Import"}
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ImportCharacterMain;
