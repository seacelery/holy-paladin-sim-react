import React from "react";
import "./Options.scss";
import OptionContainer from "./OptionContainer/OptionContainer";
import races from "../../../data/races";

const Options = () => {
    return (
        <div className="options-tab-content options-content">
            <div className="options-container">
                <div className="overhealing-abilities-modal"></div>

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
                            defaultValue: 1,
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
                            defaultValue: 300,
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
                            defaultValue: 0,
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
                            defaultValue: 0.05,
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
                            dataType: "race"
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
                            defaultValue: 95,
                        }}
                    />
                    <OptionContainer
                        type="slider"
                        props={{
                            sliderType: "percentage",
                            name: "Raid Health",
                            min: 0,
                            max: 100,
                            step: 1,
                            defaultValue: 70,
                        }}
                    />
                    <OptionContainer
                        type="slider"
                        props={{
                            sliderType: "integer",
                            name: "Light of Dawn Targets",
                            min: 1,
                            max: 5,
                            step: 1,
                            defaultValue: 5,
                        }}
                    />
                    <OptionContainer
                        type="slider"
                        props={{
                            sliderType: "integer",
                            name: "Resplendent Light Targets",
                            min: 1,
                            max: 5,
                            step: 1,
                            defaultValue: 5,
                        }}
                    />
                    <OptionContainer
                        type="slider"
                        props={{
                            sliderType: "integer",
                            name: "Sureki Zealot's Insignia Count",
                            min: 0,
                            max: 20,
                            step: 1,
                            defaultValue: 10,
                        }}
                    />
                </div>

                <div className="options-section options-right"></div>
            </div>
        </div>
    );
};

export default Options;
