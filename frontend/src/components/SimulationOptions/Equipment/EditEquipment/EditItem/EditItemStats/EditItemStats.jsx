import React, { useState, useEffect, useContext } from "react";
import "./EditItemStats.scss";
import { itemSlotsMap } from "../../../../../../utils/item-slots-map";
import { VersionContext } from "../../../../../../context/VersionContext";

const EditItemStats = ({ setCharacterData, itemStats, setItemStats, updateStats, item, updateEquipment, selectedSlot }) => {
    const { version } = useContext(VersionContext);
    const [displayedStats, setDisplayedStats] = useState([]);
    const [inputValues, setInputValues] = useState([]);
    const excludedStats = ["combat_rating_avoidance", "stamina"];

    useEffect(() => {
        if (updateEquipment) {
            updateStats();
        };
    }, [version]);

    useEffect(() => {
        if (updateEquipment) {
            setCharacterData((prevState) => {
                const newCharacterData = { ...prevState };
                newCharacterData.equipment[itemSlotsMap[selectedSlot.toLowerCase()]].stats = itemStats;
                return newCharacterData;
            });

            updateStats();
        };
    }, [displayedStats]);

    useEffect(() => {
        if (item?.stats) {
            setItemStats(item.stats);
        };
    }, [item]);

    useEffect(() => {
        if (itemStats) {
            let newDisplayedStats = Object.entries(itemStats)
                .sort((a, b) => b[1] - a[1])
                .filter((stat) => !excludedStats.includes(stat[0]))
                .map((stat) => ({ stat: stat[0], value: stat[1] }));

            const leechIndex = newDisplayedStats.findIndex((s) => s.stat === "leech");
            if (leechIndex !== -1) {
                const [leechStat] = newDisplayedStats.splice(leechIndex, 1);
                newDisplayedStats.push(leechStat);
            };

            if (newDisplayedStats.length < 4) {
                for (let i = newDisplayedStats.length; i < 4; i++) {
                    newDisplayedStats.push({ stat: "", value: "" });
                };
            };

            setDisplayedStats(newDisplayedStats);
            setInputValues(newDisplayedStats.map((stat) => `${stat.value ? "+" : ""}${stat.value} ${stat.stat.charAt(0).toUpperCase() + stat.stat.slice(1)}`));
        }
    }, [itemStats]);

    const handleBlur = (e, index) => {
        const input = e.target.value.trim();
        const valueMatch = input.match(/\d+/g);
        const newDisplayedStats = [...displayedStats];

        if (valueMatch) {
            const value = valueMatch[0];
            newDisplayedStats[index] = { stat: "leech", value: parseInt(value) };
            setDisplayedStats(newDisplayedStats);
            setInputValues(newDisplayedStats.map((stat) => `${stat.value ? "+" : ""}${stat.value} ${stat.stat.charAt(0).toUpperCase() + stat.stat.slice(1)}`));
            setItemStats((prevState) => {
                const newStats = { ...prevState };
                newStats.leech = parseInt(value);
                return newStats;
            });
            e.target.value = `+${value} Leech`;
        } else if (input === "") {
            newDisplayedStats[index] = { stat: "", value: "" };
            setDisplayedStats(newDisplayedStats);
            setInputValues(newDisplayedStats.map((stat) => `${stat.value ? "+" : ""}${stat.value} ${stat.stat.charAt(0).toUpperCase() + stat.stat.slice(1)}`));
            setItemStats((prevState) => {
                const newStats = { ...prevState };
                delete newStats.leech;
                return newStats;
            });
            e.target.value = "";
        } else {
            e.target.value = `${displayedStats[index].stat ? "+" : ""}${displayedStats[index].value} ${displayedStats[index].stat.charAt(0).toUpperCase() + displayedStats[index].stat.slice(1)}`;
        };
    };

    return <div className="edit-item-info-stats">
        {displayedStats.map((statInfo, index) => (
            <div
                key={index}
                className="edit-item-stat-field"
                style={{ color: `var(--stat-${statInfo.stat})` }}
            >
                <input
                    className="edit-item-stat-input"
                    type="text"
                    value={inputValues[index]}
                    onBlur={(e) => handleBlur(e, index)}
                    onKeyDown={(e) => e.key === "Enter" && e.target.blur()}
                    disabled={!(statInfo.stat === "" || statInfo.stat === "leech")}
                    style={{ color: `var(--stat-${statInfo.stat})` }}
                    onChange={(e) => {
                        const newInputValues = [...inputValues];
                        newInputValues[index] = e.target.value;
                        setInputValues(newInputValues);
                    }}
                />
            </div>
        ))}
    </div>
};

export default EditItemStats;
