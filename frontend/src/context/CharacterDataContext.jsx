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
        equipment: {},
        consumables: {},
        stats: {}
    });

    return (
        <CharacterDataContext.Provider value={{characterData, setCharacterData}}>
            {children}
        </CharacterDataContext.Provider>
    );
};

export { CharacterDataContext, CharacterDataProvider };