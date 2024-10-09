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
import { CONFIG } from "../../../../config/config";

const SimulateButton = () => {
    const { simulationParameters } = useContext(SimulationParametersContext);
    const { characterData } = useContext(CharacterDataContext);
    const { version } = useContext(VersionContext);
    const { simulationResults, setSimulationResults } = useContext(SimulationResultsContext);
    const { socket } = useContext(SocketContext);

    const buttonRef = useRef(null);
    const successHandledRef = useRef(false);
    const cancelSimulationRef = useRef(null);

    const [simulating, setSimulating] = useState(false);
    const [simulationProgress, setSimulationProgress] = useState(0);
    const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
    const [showCancelledAnimation, setShowCancelledAnimation] = useState(false);
    const [simulationName, setSimulationName] = useState("Simulation 1");
    const [simulationCount, setSimulationCount] = useState(1);
    
    useEffect(() => {
        if (socket) {
            socket.on("iteration_update", (data) => {
                console.log("iteration update")
                if (simulating) {
                    const progressPercentage = Math.round((data.iteration / simulationParameters.iterations) * 100);
                    setSimulationProgress(progressPercentage);
                };
            });

            socket.on("simulation_complete", (data) => {
                console.log("simulation complete")
                console.log(data);
                consolidateOverlappingBuffs(data.results.priority_breakdown);

                setSimulationCount(prevCount => prevCount + 1);
                if (simulationName.includes("Simulation")) {
                    setSimulationName(`Simulation ${simulationCount + 1}`);
                };

                const newSimulationResult = {
                    id: uuidv4(),
                    name: simulationName,
                    ...data
                };

                if (cancelSimulationRef.current) {
                    buttonRef.current.removeEventListener("click", cancelSimulationRef.current);
                };

                setSimulationResults(prevResults => [newSimulationResult, ...prevResults]);
                handleSimulationSuccess();
            });
        };

        return () => {
            if (socket) {
                socket.off("iteration_update");
            };
        };
    }, [socket, simulating, simulationParameters.iterations]);

    const handleSimulationNameChange = (e) => {
        setSimulationName(e.target.value);
    };

    const cancelSimulation = async (taskId) => {
        try {
            const response = await fetch(`${CONFIG.backendUrl}/cancel_simulation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ task_id: taskId })
            });
            
            const data = await response.json();
            handleSimulationCancelled();
        } catch (error) {
            console.error("Error cancelling simulation:", error);
        };
    };
    
    const runSimulation = async () => {
        successHandledRef.current = false;
        setSimulating(true);
        setSimulationProgress(0);

        console.log(characterData)

        const simulationData = {
            race: characterData.race,
            character_name: characterData.characterName,
            character_realm: characterData.characterRealm,
            character_region: characterData.characterRegion,
            class_talents: characterData.classTalents,
            spec_talents: characterData.specTalents,
            consumables: characterData.consumables,
            lightsmith_talents: characterData.lightsmithTalents,
            herald_of_the_sun_talents: characterData.heraldOfTheSunTalents,
            version: version,
            encounter_length: simulationParameters.encounterLength,
            iterations: simulationParameters.iterations,
            time_warp_time: simulationParameters.timeWarp,
            tick_rate: simulationParameters.tickRate,
            raid_health: simulationParameters.raidHealth,
            mastery_effectiveness: simulationParameters.masteryEffectiveness,
            light_of_dawn_targets: simulationParameters.lightOfDawnTargets,
            resplendent_light_targets: simulationParameters.resplendentLightTargets,
            sureki_zealots_insignia_count: simulationParameters.surekiZealotsInsigniaCount,
            dawnlight_targets: simulationParameters.dawnlightTargets,
            suns_avatar_targets: simulationParameters.sunsAvatarTargets,
            light_of_the_martyr_uptime: simulationParameters.lightOfTheMartyrUptime,
            potion_bomb_of_power_uptime: simulationParameters.potionBombOfPowerUptime,
            priority_list: simulationParameters.priorityList,
            custom_equipment: characterData.equipment,
            seasons: simulationParameters.seasons,
            overhealing: simulationParameters.overhealing
        };
    
        try {
            const response = await fetch(`${CONFIG.backendUrl}/start_simulation`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(simulationData)
            });
    
            if (!response.ok) {
                throw new Error('Network response error');
            };
    
            const data = await response.json();
            const taskId = data.task_id;
    
            cancelSimulationRef.current = () => cancelSimulation(taskId);
            buttonRef.current.addEventListener("click", cancelSimulationRef.current);

            pollSimulationStatus(taskId);
        } catch (error) {
            console.error("Error starting simulation:", error);
            setSimulating(false);
        };
    };

    const pollSimulationStatus = async (taskId) => {
        const clearSimulation = () => {
            clearInterval(pollInterval);
            if (cancelSimulationRef.current) {
                buttonRef.current.removeEventListener("click", cancelSimulationRef.current);
            };
        };

        const pollInterval = setInterval(async () => {
            try {
                const response = await fetch(`${CONFIG.backendUrl}/simulation_status/${taskId}`);
                const data = await response.json();
    
                if (data.state === "PROGRESS") {
                    const progressPercentage = Math.round((data.current / data.total) * 100);
                    setSimulationProgress(progressPercentage);                   
                } else if (data.state === "SUCCESS" && !successHandledRef.current && data.status !== "COMPLETED") {
                    clearSimulation();
                    successHandledRef.current = true;
                    setSimulationProgress(100);
                    
                    setTimeout(() => {
                        consolidateOverlappingBuffs(data.result.results.priority_breakdown);

                        setSimulationCount(prevCount => prevCount + 1);
                        if (simulationName.includes("Simulation")) {
                            setSimulationName(`Simulation ${simulationCount + 1}`);
                        };

                        const newSimulationResult = {
                            id: uuidv4(),
                            name: simulationName,
                            ...data.result
                        };

                        setSimulationResults(prevResults => [newSimulationResult, ...prevResults]);
                        handleSimulationSuccess(data.result);
                    }, 1500);
                } else if (data.state === "FAILURE") {
                    clearSimulation();
                } else if (data.state === "REVOKED") {
                    clearSimulation();
                };
            } catch (error) {
                console.error("Error polling simulation status:", error);
                clearInterval(pollInterval);
                setSimulating(false);
            }
        }, 150);
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
            <input className="simulation-name-text-input" value={simulationName} onChange={(e) => setSimulationName(e.target.value)} />
            {(simulating || showSuccessAnimation || showCancelledAnimation)
                ? <ProgressBar simulationProgress={simulationProgress} showSuccessAnimation={showSuccessAnimation} showCancelledAnimation={showCancelledAnimation} />
                : <Button className="simulate-button" grow={false} onClick={runSimulation} disabled={simulating}>Simulate</Button>
            }
        </div>
    );
};

export default SimulateButton;