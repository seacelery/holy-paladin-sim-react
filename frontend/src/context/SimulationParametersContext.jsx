import { createContext, useState } from "react";

const SimulationParametersContext = createContext();

const SimulationParametersProvider = ({ children }) => {
    const [simulationParameters, setSimulationParameters] = useState({
        iterations: 1,
        encounterLength: 300,
        timeWarp: 0,
        tickRate: 0.05,
        masteryEffectiveness: 0.95,
        raidHealth: 0.7,
        lightOfDawnTargets: 5,
        ResplendentLightTargets: 5,
        SurekiZealotsInsigniaCount: 10,
        DawnlightTargets: 12,
        SunsAvatarTargets: 10,
        LightOfTheMartyrUptime: 0.8,
        PotionBombOfPowerUptime: 0.3,
        priorityList: ["Crusader Strike | Holy Power <= 3",
        "Holy Light | Divine Favor active | and | Infusion of Light active",
        "Holy Light | Infusion of Light active | and | Liberation active"]
    });
    
    return (
        <SimulationParametersContext.Provider value={{simulationParameters, setSimulationParameters}}>
            {children}
        </SimulationParametersContext.Provider>
    );  
};

export { SimulationParametersContext, SimulationParametersProvider };