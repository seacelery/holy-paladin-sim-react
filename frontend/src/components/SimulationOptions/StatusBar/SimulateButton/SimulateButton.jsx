import React, { useState, useContext, useEffect, useRef } from "react";
import "./SimulateButton.css";
import { v4 as uuidv4 } from "uuid";
import Button from "../../../Button/Button";
import ProgressBar from "./ProgressBar/ProgressBar";
import { SimulationParametersContext } from "../../../../context/SimulationParametersContext";
import { CharacterDataContext } from "../../../../context/CharacterDataContext";
import { VersionContext } from "../../../../context/VersionContext";
import { SimulationResultsContext } from "../../../../context/SimulationResultsContext";
import { SocketContext } from "../../../../context/SocketContext";
import { consolidateOverlappingBuffs } from "../../../../data/breakdown-functions";

const SimulateButton = () => {
    const { simulationParameters } = useContext(SimulationParametersContext);
    const { characterData } = useContext(CharacterDataContext);
    const { version } = useContext(VersionContext);
    const { simulationResults, setSimulationResults } = useContext(SimulationResultsContext);
    const { socket } = useContext(SocketContext);

    const buttonRef = useRef(null);

    const [simulating, setSimulating] = useState(false);
    const [simulationProgress, setSimulationProgress] = useState(0);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
    const [showCancelledAnimation, setShowCancelledAnimation] = useState(false);

    useEffect(() => {
        if (socket) {
            socket.on("iteration_update", (data) => {
                if (simulating) {
                    const progressPercentage = Math.round((data.iteration / simulationParameters.iterations) * 100);
                    setSimulationProgress(progressPercentage);
                };
            });
        };

        return () => {
            if (socket) {
                socket.off("iteration_update");
            };
        };
    }, [socket, simulating, simulationParameters.iterations]);

    let abortController;

    const cancelSimulation = () => {
        if (abortController) {
            abortController.abort();
        };
    };
    
    const runSimulation = async () => {
        abortController = new AbortController();
        const { signal } = abortController;
        buttonRef.current.addEventListener("click", cancelSimulation);

        setSimulating(true);
        setSimulationProgress(0);

        const params = new URLSearchParams({
            race: characterData.race,
            character_name: characterData.characterName,
            character_realm: characterData.characterRealm,
            character_region: characterData.characterRegion,
            version: version,
            encounter_length: simulationParameters.encounterLength,
            iterations: simulationParameters.iterations,
            time_warp_time: simulationParameters.timeWarp,
            tick_rate: simulationParameters.tickRate,
            mastery_effectiveness: simulationParameters.masteryEffectiveness,
            raid_health: simulationParameters.raidHealth,
            light_of_dawn_targets: simulationParameters.lightOfDawnTargets,
            resplendent_light_targets: simulationParameters.resplendentLightTargets,
            sureki_zealots_insignia_count: simulationParameters.surekiZealotsInsigniaCount,
            dawnlight_targets: simulationParameters.dawnlightTargets,
            suns_avatar_targets: simulationParameters.sunsAvatarTargets,
            light_of_the_martyr_uptime: simulationParameters.lightOfTheMartyrUptime,
            potion_bomb_of_power_uptime: simulationParameters.potionBombOfPowerUptime,
        });

        params.append("class_talents", JSON.stringify(characterData.classTalents));
        params.append("spec_talents", JSON.stringify(characterData.specTalents));
        params.append("lightsmith_talents", JSON.stringify(characterData.lightsmithTalents));
        params.append("herald_of_the_sun_talents", JSON.stringify(characterData.heraldOfTheSunTalents));
        params.append("consumables", JSON.stringify(characterData.consumables));
        params.append("equipment", JSON.stringify(characterData.equipment));
        params.append("priority_list", JSON.stringify(simulationParameters.priorityList));
        params.append("overhealing", JSON.stringify(simulationParameters.overhealing));
        params.append("seasons", JSON.stringify(simulationParameters.seasons));
        params.append("stat_scaling", JSON.stringify(simulationParameters.statScaling));

        return fetch(`http://127.0.0.1:5000/run_simulation?${params.toString()}`, {
            credentials: "include",
            signal: signal
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            consolidateOverlappingBuffs(data.results.priority_breakdown);

            const newSimulationResult = {
                id: uuidv4(),
                ...data
            };

            buttonRef.current.removeEventListener("click", cancelSimulation);
            setSimulationResults(prevResults => [newSimulationResult, ...prevResults]);
            handleSimulationSuccess();
        })
        .catch(error => {
            if (error.name === "AbortError") {
                console.log("Fetch aborted:", error);
            } else {
                console.error("Error:", error);
            };
            
            buttonRef.current.removeEventListener("click", cancelSimulation);
            handleSimulationCancelled();
        });
    };

    const handleSimulationSuccess = () => {
        setSimulationProgress(100);
        setShowSuccessAnimation(true);

        setTimeout(() => {
            buttonRef.current.scrollIntoView({ behavior: "smooth" });
        }, 100);
        
        setTimeout(() => {
            setSimulating(false);
            setSimulationProgress(0);
            setShowSuccessAnimation(false);
        }, 3000);
    };

    const handleSimulationCancelled = () => {
        setShowCancelledAnimation(true);
        setSimulating(false);

        setTimeout(() => {
            setSimulationProgress(0);
        }, 2850);

        setTimeout(() => {        
            setShowCancelledAnimation(false);
        }, 3000);
    };

    return (
        <div className="simulate-button-container" ref={buttonRef}>
            <input className="simulation-name-text-input" defaultValue="Simulation 1" />
            {(simulating || showSuccessAnimation || showCancelledAnimation)
                ? <ProgressBar simulationProgress={simulationProgress} showSuccessAnimation={showSuccessAnimation} showCancelledAnimation={showCancelledAnimation} />
                : <Button className="simulate-button" grow={false} onClick={runSimulation} disabled={simulating}>Simulate</Button>
            }
        </div>
    );
};

export default SimulateButton;