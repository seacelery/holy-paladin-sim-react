import React, { useContext, useRef, useEffect } from "react";
import Gem from "../../../../Gem/Gem";
import "./GemPickerModal.scss";
import {
    groupedGems,
    ptrGroupedGems,
} from "../../../../../../../utils/items-to-icons-map";
import { VersionContext } from "../../../../../../../context/VersionContext";
import { itemSlotsMap } from "../../../../../../../utils/item-slots-map";

const GemPickerModal = ({ onClose, setCharacterData, updateStats, selectedSlot, item, updateEquipment, setNewItem }) => {
    const { version } = useContext(VersionContext);
    const gemSet = version === "live" ? groupedGems : ptrGroupedGems;
    const gems = item.gems || [];

    const modalRef = useRef(null);

    const handleClickOutside = (e) => {
        if (
            modalRef.current &&
            !modalRef.current.contains(e.target) &&
            !e.target.closest(".add-gem-container")
        ) {
            onClose();
        };
    };

    useEffect(() => {
        if (onClose) {
            document.addEventListener("mousedown", handleClickOutside);
        };

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    const handleGemClick = (gem) => {
        const newGems = [...gems];
        newGems.push(gem);

        if (updateEquipment) {
            setCharacterData((prevData) => {
                const newCharacterData = { ...prevData };
                newCharacterData.equipment[
                    itemSlotsMap[selectedSlot.toLowerCase()]
                ].gems = newGems;
                return newCharacterData;
            });
            updateStats();
        } else {
            setNewItem((prevItem) => {
                const newItem = { ...prevItem };
                newItem.gems = newGems;
                return newItem;
            });
        } ;
    };

    return (
        <div className="gem-picker-modal" ref={modalRef} style={{ backgroundColor: `var(--rarity-${item.quality.toLowerCase()}-dark)`}}>
            <div className="gem-picker-grid-container">
                <div className="gem-picker-stat-column">
                    <div
                        className="stat-column-label"
                        style={{ color: "var(--stat-haste)" }}
                    >
                        Haste
                    </div>
                    <div
                        className="stat-column-label"
                        style={{ color: "var(--stat-crit)" }}
                    >
                        Crit
                    </div>
                    <div
                        className="stat-column-label"
                        style={{ color: "var(--stat-mastery)" }}
                    >
                        Mastery
                    </div>
                    <div
                        className="stat-column-label"
                        style={{ color: "var(--stat-versatility)" }}
                    >
                        Versatility
                    </div>
                </div>

                <div className="gem-picker-grid">
                    <div
                        className="stat-row-label"
                        style={{ color: "var(--stat-haste)" }}
                    >
                        Haste
                    </div>
                    <div
                        className="stat-row-label"
                        style={{ color: "var(--stat-crit)" }}
                    >
                        Crit
                    </div>
                    <div
                        className="stat-row-label"
                        style={{ color: "var(--stat-mastery)" }}
                    >
                        Mast
                    </div>
                    <div
                        className="stat-row-label"
                        style={{ color: "var(--stat-versatility)" }}
                    >
                        Vers
                    </div>
                    <div
                        className="stat-row-label"
                        style={{ color: "var(--stat-intellect)" }}
                    >
                        Int
                    </div>

                    {Object.keys(gemSet).map((gemType) => {
                        return gemSet[gemType].gems.map((gem, index) => {
                            const stat = gem[2]
                                .match(
                                    /[haste]?[mastery]?[crit]?[versatility]?[intellect]?/gi
                                )
                                .join("")
                                .toLowerCase();
                            return (
                                <Gem
                                    key={index}
                                    gemName={gem[0]}
                                    size="large"
                                    tooltip={true}
                                    customClassName={`gem-border-${stat}`}
                                    onClick={() => handleGemClick(gem[0])}
                                />
                            );
                        });
                    })}
                </div>
            </div>
        </div>
    );
};

export default GemPickerModal;
