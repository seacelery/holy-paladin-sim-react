import { createContext, useState } from "react";

const SimulationParametersContext = createContext();

const SimulationParametersProvider = ({ children }) => {
    const [simulationParameters, setSimulationParameters] = useState({
        iterations: 1,
        encounterLength: 300,
        timeWarp: 0,
        tickRate: 0.05,
        masteryEffectiveness: 95,
        raidHealth: 70,
        lightOfDawnTargets: 5,
        resplendentLightTargets: 5,
        surekiZealotsInsigniaCount: 10,
        dawnlightTargets: 12,
        sunsAvatarTargets: 10,
        lightOfTheMartyrUptime: 80,
        potionBombOfPowerUptime: 30,
        priorityList: [""],
        overhealing: {},
        seasons: {
            "Blessing of Summer": false,
            "Blessing of Autumn": false,
            "Blessing of Winter": false,
            "Blessing of Spring": false,
        },
        statScaling: {
            "haste": false,
            "crit": false,
            "mastery": false,
            "versatility": false,
            "leech": false
        }
    });
    
    return (
        <SimulationParametersContext.Provider value={{simulationParameters, setSimulationParameters}}>
            {children}
        </SimulationParametersContext.Provider>
    );  
};

export { SimulationParametersContext, SimulationParametersProvider };