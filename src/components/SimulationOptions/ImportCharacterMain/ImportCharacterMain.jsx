import React, { useState, useEffect } from "react";
import "./ImportCharacterMain.scss";
import Button from "../../Button/Button";
import Dropdown from "../../Dropdown/Dropdown";
import { realmList } from "../../../data/realm-list";

const ImportCharacterMain = () => {
    const [dropdownOpen, setDropdownOpen] = useState(null);
    const [region, setRegion] = useState("EU");
    const [realm, setRealm] = useState("Aegwynn");

    const realms = Object.keys(realmList);
    const [currentRealmList, setCurrentRealmList] = useState(realmList[region]);

    useEffect(() => {
        setCurrentRealmList(realmList[region]);
        setRealm(realmList[region][0]);
    }, [region]);

    const toggleDropdown = (dropdown) => {
        setDropdownOpen((prevOpenDropdown) => (prevOpenDropdown === dropdown ? null : dropdown));
    };

    return (
        <>
            <div className="import-overlay">
                <div className="import-character-container-main">
                    <div className="import-character-reminder">
                        Import a character
                    </div>

                    <div className="character-input-label-main">Region:</div>
                    <Dropdown
                        dropdownOptions={Object.keys(realmList)}
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
                    ></input>

                    {/* <div id="character-name-error-modal" class="error-modal">
                        <div id="character-name-error-modal-message"></div>
                    </div> */}

                    <Button
                        width="27.5rem"
                        height="5rem"
                        margin="3.5rem 0 4.5rem 0"
                        fontSize="1.6rem"
                        grow={true}
                    >
                        Import
                    </Button>
                </div>
            </div>
        </>
    );
};

export default ImportCharacterMain;
