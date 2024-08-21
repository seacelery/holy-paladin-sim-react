import React from "react";
import "./Cooldown.scss";
import { formatThousandsWithShorthand, formatTime } from "../../../../../data/breakdown-functions";
import { spellToIconsMap } from "../../../../../utils/spell-to-icons-map";
import { buffsToIconsMap } from "../../../../../utils/buffs-to-icons-map";

const Cooldown = ({ cooldown, cooldownData }) => {
    const getCooldownIcon = (cooldown) => {
        return spellToIconsMap[cooldown]
            ? spellToIconsMap[cooldown]
            : buffsToIconsMap[cooldown]
            ? buffsToIconsMap[cooldown]
            : "https://wow.zamimg.com/images/wow/icons/large/inv_misc_questionmark.jpg";
    };

    return (
        <div className="cooldown-breakdown-container">
            <div className="cooldown-breakdown-icon-container">
                <img
                    className="cooldown-breakdown-icon"
                    src={getCooldownIcon(cooldown)}
                ></img>
            </div>

            <div className="cooldown-breakdown-details">
                <div className="cooldown-breakdown-details-name">
                    {cooldown}
                </div>

                {Object.keys(cooldownData).map((instance, index) => {
                    const instanceData = cooldownData[instance];

                    return (
                        <div
                            key={index}
                            className="cooldown-breakdown-instance"
                        >
                            <div className="cooldown-breakdown-instance-count">
                                {instance}
                            </div>
                            <div className="cooldown-breakdown-instance-time">
                                <span>Time</span>
                                <br />
                                <span>
                                    {formatTime(Math.round(instanceData.start_time))}-
                                    {formatTime(Math.round(instanceData.end_time))}
                                </span>
                            </div>
                            <div className="cooldown-breakdown-instance-hps">
                                <span>HPS</span>
                                <br />
                                <span style={{ color: "var(--healing-font)" }}>
                                    {formatThousandsWithShorthand(
                                        Math.round(instanceData.hps)
                                    )}
                                </span>
                            </div>
                            <div className="cooldown-breakdown-instance-duration">
                                <span>Duration</span>
                                <br />
                                <span>
                                    {instanceData.total_duration.toFixed(1)}s
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Cooldown;
