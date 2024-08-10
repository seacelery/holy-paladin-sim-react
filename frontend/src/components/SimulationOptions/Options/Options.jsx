import React, { useContext, useState } from "react";
import "./Options.scss";
import OptionContainer from "./OptionContainer/OptionContainer";
import races from "../../../data/races";
import { seasons } from "../../../data/buffs-consumables-data";
import { CharacterDataContext } from "../../../context/CharacterDataContext";
import { SimulationParametersContext } from "../../../context/SimulationParametersContext";
import OverhealingModal from "./OptionContainer/OverhealingModal/OverhealingModal";

const Options = () => {
    const [overhealingModalOpen, setOverhealingModalOpen] = useState(false);
    const { characterData, setCharacterData } = useContext(CharacterDataContext);
    const { simulationParameters, setSimulationParameters } = useContext(SimulationParametersContext);

    const handleOverhealingButtonClick = () => {
        setOverhealingModalOpen((prevState) => !prevState);
    };

    const isTalentActive = (talent, talentData) => {
        if (!talentData) return false;

        for (const row in talentData) {
            for (const talentName in talentData[row]) {
                if (talent === talentName && talentData[row][talentName].ranks["current rank"] > 0) {
                    return true;
                };
            };
        };
    };

    const updateSimulationParameters = (name, value) => {
        if (name === "seasons") {
            setSimulationParameters((prevState) => ({
                ...prevState,
                seasons: {
                    ...prevState.seasons,
                    [value]: !prevState.seasons[value]
                }
            }));
            return;
        } else {
            setSimulationParameters((prevState) => ({
                ...prevState,
                [name]: value
            }));
        };
    };

    const updateCharacterData = (name, value) => {
        setCharacterData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className="options-tab-content options-content">
            <div className="options-container">
                <OverhealingModal isOpen={overhealingModalOpen} />

                <div className="options-section options-left">
                    <div className="options-header">Encounter</div>
                    <div className="options-divider"></div>

                    <OptionContainer
                        type="slider"
                        props={{
                            sliderType: "integer",
                            name: "Iterations",
                            min: 1,
                            max: 1000,
                            step: 1,
                            defaultValue: simulationParameters.iterations,
                            updateParameter: (value) => updateSimulationParameters("iterations", value)
                        }}
                    />

                    <OptionContainer
                        type="slider"
                        props={{
                            sliderType: "time",
                            name: "Encounter Length",
                            min: 1,
                            max: 600,
                            step: 1,
                            defaultValue: simulationParameters.encounterLength,
                            updateParameter: (value) => updateSimulationParameters("encounterLength", value)
                        }}
                    />

                    <OptionContainer
                        type="slider"
                        props={{
                            sliderType: "time",
                            name: "Time Warp",
                            min: 0,
                            max: 600,
                            step: 1,
                            defaultValue: simulationParameters.timeWarp,
                            updateParameter: (value) => updateSimulationParameters("timeWarp", value)
                        }}
                    />

                    <OptionContainer
                        type="slider"
                        props={{
                            sliderType: "float",
                            name: "Tick Rate",
                            min: 0,
                            max: 0.1,
                            step: 0.01,
                            defaultValue: simulationParameters.tickRate,
                            showInfo: true,
                            tooltipText: "Reducing this will increase HoT accuracy, but it will be much slower.",
                            updateParameter: (value) => updateSimulationParameters("tickRate", value)
                        }}
                    />
                </div>

                <div className="options-section options-center">
                    <div className="options-header">Player</div>
                    <div className="options-divider"></div>

                    <OptionContainer
                        type="icons"
                        props={{
                            icons: races,
                            label: "Race",
                            dataType: "race",
                            showTooltip: true,
                            exclusiveSelection: true,
                            allowDeselection: false,
                            defaultSelectedIcons: [characterData ? characterData.race : ""],
                            updateParameter: (value) => updateCharacterData("race", value)
                        }}
                    />

                    <OptionContainer
                        type="slider"
                        props={{
                            sliderType: "percentage",
                            name: "Mastery Effectiveness",
                            min: 0,
                            max: 100,
                            step: 1,
                            defaultValue: simulationParameters.masteryEffectiveness,
                            updateParameter: (value) => updateSimulationParameters("masteryEffectiveness", value)
                        }}
                    />

                    {characterData && (isTalentActive("Reclamation", characterData.specTalents) || (isTalentActive("Extrication", characterData.specTalents))) && (
                        <OptionContainer
                            type="slider"
                            props={{
                                sliderType: "percentage",
                                name: "Raid Health",
                                min: 0,
                                max: 100,
                                step: 1,
                                defaultValue: simulationParameters.raidHealth,
                                showInfo: true,
                                tooltipText: "This affects Reclamation and Extrication.",
                                updateParameter: (value) => updateSimulationParameters("raidHealth", value)
                            }}
                        />
                    )}                  

                    {characterData && isTalentActive("Light of Dawn", characterData.specTalents) && (
                        <OptionContainer
                            type="slider"
                            props={{
                                sliderType: "integer",
                                name: "Light of Dawn Targets",
                                min: 1,
                                max: 5,
                                step: 1,
                                defaultValue: simulationParameters.lightOfDawnTargets,
                                updateParameter: (value) => updateSimulationParameters("lightOfDawnTargets", value)
                            }}
                        />
                    )}

                    {characterData && isTalentActive("Resplendent Light", characterData.specTalents) && (
                        <OptionContainer
                            type="slider"
                            props={{
                                sliderType: "integer",
                                name: "Resplendent Light Targets",
                                min: 1,
                                max: 5,
                                step: 1,
                                defaultValue: simulationParameters.resplendentLightTargets,
                                updateParameter: (value) => updateSimulationParameters("resplendentLightTargets", value)
                            }}
                        />
                    )}

                    <OptionContainer
                        type="slider"
                        props={{
                            sliderType: "integer",
                            name: "Sureki Zealot's Insignia Count",
                            min: 0,
                            max: 20,
                            step: 1,
                            defaultValue: simulationParameters.surekiZealotsInsigniaCount,
                            updateParameter: (value) => updateSimulationParameters("surekiZealotsInsigniaCount", value)
                        }}
                    />
                </div>

                <div className="options-section options-right">
                    <OptionContainer
                        type="checkbox"
                        props={{
                            label: "Enable Overhealing",
                            buttonEnabled: true,
                            buttonText: "Abilities",
                            buttonClick: handleOverhealingButtonClick
                        }}
                    />

                    {characterData && isTalentActive("Dawnlight", characterData.heraldOfTheSunTalents) && (
                        <OptionContainer
                            type="slider"
                            props={{
                                sliderType: "integer",
                                name: "Dawnlight Targets",
                                min: 1,
                                max: 20,
                                step: 1,
                                defaultValue: simulationParameters.dawnlightTargets,
                                updateParameter: (value) => updateSimulationParameters("dawnlightTargets", value)
                            }}
                        />
                    )}

                    {characterData && isTalentActive("Sun's Avatar", characterData.heraldOfTheSunTalents) && (
                        <OptionContainer
                            type="slider"
                            props={{
                                sliderType: "integer",
                                name: "Sun's Avatar Targets",
                                min: 1,
                                max: 20,
                                step: 1,
                                defaultValue: simulationParameters.sunsAvatarTargets,
                                updateParameter: (value) => updateSimulationParameters("sunsAvatarTargets", value)
                            }}
                        />
                    )}

                    {characterData && isTalentActive("Light of the Martyr", characterData.specTalents) && (
                        <OptionContainer
                            type="slider"
                            props={{
                                sliderType: "percentage",
                                name: "Light of the Martyr Uptime",
                                min: 0,
                                max: 100,
                                step: 1,
                                defaultValue: simulationParameters.lightOfTheMartyrUptime,
                                updateParameter: (value) => updateSimulationParameters("lightOfTheMartyrUptime", value)
                            }}
                        />
                    )}       

                    <OptionContainer
                        type="slider"
                        props={{
                            sliderType: "percentage",
                            name: "Potion Bomb of Power Uptime",
                            min: 0,
                            max: 100,
                            step: 1,
                            defaultValue: simulationParameters.potionBombOfPowerUptime,
                            updateParameter: (value) => updateSimulationParameters("potionBombOfPowerUptime", value)
                        }}
                    />

                    {characterData && isTalentActive("Blessing of Summer", characterData.specTalents) && (
                        <OptionContainer
                            type="icons"
                            props={{
                                icons: seasons,
                                label: "Blessing of the Seasons",
                                dataType: "season",
                                showTooltip: true,
                                exclusiveSelection: false,
                                allowDeselection: true,
                                defaultSelectedIcons: ["Blessing of Winter", "Blessing of Spring", "Blessing of Autumn"],
                                updateParameter: (value) => updateSimulationParameters("seasons", value)
                            }}
                        />   
                    )}
                                  
                </div>
            </div>
        </div>
    );
};

export default Options;
