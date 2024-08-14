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
        consumables: {},
        stats: {}
    });

    console.log(characterData)

    return (
        <CharacterDataContext.Provider value={{characterData, setCharacterData}}>
            {children}
        </CharacterDataContext.Provider>
    );
};

export { CharacterDataContext, CharacterDataProvider };