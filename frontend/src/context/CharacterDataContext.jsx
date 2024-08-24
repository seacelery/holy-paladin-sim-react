import { createContext, useState } from "react";

const CharacterDataContext = createContext();

const CharacterDataProvider = ({ children }) => {
    const [characterData, setCharacterData] = useState({
        characterRegion: "",
        characterRealm: "",
        characterName: "",
        race: "",
        ptr: false,
        classTalents: {},
        specTalents: {},
        heraldOfTheSunTalents: {},
        lightsmithTalents: {},
        equipment: {},
        consumables: {
            flask: [],
            food: [],
            weapon_imbue: [],
            augment_rune: [],
            raid_buffs: [],
            external_buffs: {},
            potion: {}
        },
        stats: {}
    });

    return (
        <CharacterDataContext.Provider value={{characterData, setCharacterData}}>
            {children}
        </CharacterDataContext.Provider>
    );
};

export { CharacterDataContext, CharacterDataProvider };