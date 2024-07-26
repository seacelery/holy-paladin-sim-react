import React, { useContext, useState, useEffect } from "react";
import "./ImportCharacter.css";
import Button from "../../../Button/Button";
import Dropdown from "../../../Dropdown/Dropdown";
import { CharacterDataContext } from "../../../../context/CharacterDataContext";
import { realmList } from "../../../../data/realm-list";

const ImportCharacter = () => {
    const { characterData, setCharacterData } = useContext(CharacterDataContext);

    const [region, setRegion] = useState("");
    const [realm, setRealm] = useState("");
    const [characterName, setCharacterName] = useState("");

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

        setRegion(characterData.characterRegion.toUpperCase());
        setRealm(characterData.characterRealm.replaceAll("-", " ").split(" ").map((word) => word[0].toUpperCase() + word.slice(1)).join(" "));
        setCharacterName(characterData.characterName[0].toUpperCase() + characterData.characterName.slice(1));
    }, [characterData]);

    return (
        <div className="import-character-container">
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
                <Button width="7.5rem" height="2.7rem" grow={false} className="import-button">
                    Import
                </Button>
            </div>
        </div>
    );
};

export default ImportCharacter;
