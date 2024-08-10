import React, { useState, useContext } from "react";
import "./SimulateButton.css";
import Button from "../../../Button/Button";
import { SimulationParametersContext } from "../../../../context/SimulationParametersContext";
import { CharacterDataContext } from "../../../../context/CharacterDataContext";

const SimulateButton = () => {
    const { simulationParameters } = useContext(SimulationParametersContext);
    const { characterData } = useContext(CharacterDataContext);

    const [simulating, setSimulating] = useState(false);
    const [simulationProgress, setSimulationProgress] = useState(null);

    let abortController;
    
    const runSimulation = async () => {
        abortController = new AbortController();
        const { signal } = abortController;

        setSimulating(true);

        const characterRegion = characterData.characterRegion;
        const characterRealm = characterData.characterRealm;
        const characterName = characterData.characterName;
        const version = characterData.ptr;

        const race = characterData.race;
        const classTalents = encodeURIComponent(JSON.stringify(characterData.classTalents));
        const specTalents = encodeURIComponent(JSON.stringify(characterData.specTalents));
        const lightsmithTalents = encodeURIComponent(JSON.stringify(characterData.lightsmithTalents));
        const heraldOfTheSunTalents = encodeURIComponent(JSON.stringify(characterData.heraldOfTheSunTalents));
        const consumables = encodeURIComponent(JSON.stringify(characterData.consumables));
        const equipment = encodeURIComponent(JSON.stringify(characterData.equipment));

        const encounterLength = simulationParameters.encounterLength;
        const iterations = simulationParameters.iterations;
        const timeWarpTime = simulationParameters.timeWarp;
        const tickRate = simulationParameters.tickRate;
        const masteryEffectiveness = simulationParameters.masteryEffectiveness;
        const raidHealth = simulationParameters.raidHealth;
        const lightOfDawnTargets = simulationParameters.lightOfDawnTargets;
        const resplendentLightTargets = simulationParameters.resplendentLightTargets;
        const surekiZealotsInsigniaCount = simulationParameters.surekiZealotsInsigniaCount;
        const dawnlightTargets = simulationParameters.dawnlightTargets;
        const sunsAvatarTargets = simulationParameters.sunsAvatarTargets;
        const lightOfTheMartyrUptime = simulationParameters.lightOfTheMartyrUptime;
        const potionBombOfPowerUptime = simulationParameters.potionBombOfPowerUptime;
        const priorityList = encodeURIComponent(JSON.stringify(simulationParameters.priorityList));
        const overhealing = encodeURIComponent(JSON.stringify(simulationParameters.overhealing));

        let seasons = {
            "Blessing of Summer": true,
            "Blessing of Autumn": true,
            "Blessing of Winter": true,
            "Blessing of Spring": true,
        };
        seasons = encodeURIComponent(JSON.stringify(seasons));

        let statScaling = {
            "haste": false,
            "crit": false,
            "mastery": false,
            "versatility": false,
            "leech": false
        };
        statScaling = encodeURIComponent(JSON.stringify(statScaling));

        return fetch(`http://127.0.0.1:5000/run_simulation?race=${race}&character_name=${characterName}&character_realm=${characterRealm}&character_region=${characterRegion}&version=${version}&encounter_length=${encounterLength}&iterations=${iterations}&time_warp_time=${timeWarpTime}&priority_list=${priorityList}&tick_rate=${tickRate}&raid_health=${raidHealth}&mastery_effectiveness=${masteryEffectiveness}&light_of_dawn_targets=${lightOfDawnTargets}&resplendent_light_targets=${resplendentLightTargets}&dawnlight_targets=${dawnlightTargets}&suns_avatar_targets=${sunsAvatarTargets}&sureki_zealots_insignia_count=${surekiZealotsInsigniaCount}&light_of_the_martyr_uptime=${lightOfTheMartyrUptime}&potion_bomb_of_power_uptime=${potionBombOfPowerUptime}&stat_scaling=${statScaling}&seasons=${seasons}&overhealing=${overhealing}&class_talents=${classTalents}&spec_talents=${specTalents}&lightsmith_talents=${lightsmithTalents}&herald_of_the_sun_talents=${heraldOfTheSunTalents}&consumables=${consumables}&equipment=${equipment}`, {
            credentials: "include",
            signal: signal
        })
        .then(response => response.json())
        .then(data => {
            let simulationData = data;     
            console.log(simulationData)
            
            // simulationProgressBarText.textContent = "";
            // if (simulationData) {
            //     createSimulationResults(simulationData);
            //     playCheckmarkAnimation();
            // };
            
            setSimulating(false);
            // simulationProgressBarContainer.removeEventListener("click", handleSimulationCancel);
        })
        .catch(error => {
            if (error.name === "AbortError") {
                console.log("Fetch aborted:", error);
            } else {
                console.error("Error:", error);
            };
            
            setSimulating(false);
            // simulationProgressBarContainer.removeEventListener("click", handleSimulationCancel);
        });
    };

    return <div className="simulate-button-container" onClick={runSimulation}>
        <input className="simulation-name-text-input" defaultValue="Simulation 1"></input>
        <Button className="simulate-button" grow={false}>Simulate</Button>
    </div>;
};

export default SimulateButton;
