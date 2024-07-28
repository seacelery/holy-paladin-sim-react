import React, { useContext } from "react";
import "./Gem.scss";
import { groupedGems, ptrGroupedGems } from "../../../../utils/items-to-icons-map";
import { VersionContext } from "../../../../context/VersionContext";

const Gem = ({ gemName, size = "small" }) => {
    const { version } = useContext(VersionContext);
    const gemSet = version === "live" ? groupedGems : ptrGroupedGems;
    
    const findGem = (gemName) => {
        for (const gemType in gemSet) {
            for (const gemInfo of gemSet[gemType].gems) {
                if (gemName === gemInfo[0]) {
                    return gemInfo;
                };
            };
        };

        return [null, null];
    };

    const [gem, gemIconSrc] = findGem(gemName);

    return <div className="item-gem-container">
        <img className={`item-gem-icon ${size === "small" ? "item-gem-icon-small" : "item-gem-icon-large"}`} src={gemIconSrc} />
    </div>;
};

export default Gem;
